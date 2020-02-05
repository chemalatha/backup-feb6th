import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {VisitAgendaSessionContentModel} from './visitAgendaSessionContent.model';
import {UtilityServices} from '../../core/services/utility.service';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ILocalForageItem, LocalDatabaseService} from '../../core/database/local-database.service';
import { APP_CONFIG } from '../../app.config';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { VisitAgendaPreReadDocumentModel } from './visitAgendaPreReadDocument.model';
import { VisitPreReadDocumentDetailModel } from './visitPreReadDocumentDetail.model';
import * as _ from 'lodash';
import 'rxjs/add/observable/forkJoin';
import {Subject} from 'rxjs/Subject';

declare var window: any;

@Injectable()
export class VisitsAgendaDownloadService {

  private visitId = null;
  private fileDirectory;
  private preReadDcoumentList = null;

  private downloadSideMenuEvent = new Subject<any>();
  public downloadSideMenuEventObservable  = this.downloadSideMenuEvent.asObservable();

  private downloadDisplaySideMenuEvent = new Subject<any>();
  public downloadDisplaySideMenuEventObservable  = this.downloadDisplaySideMenuEvent.asObservable();

  constructor(
        private ajaxservice: AjaxService,
        private selectVisit: SelectVisitServices,
        private utilityservice: UtilityServices,
        private file: File,
        private fileOpener: FileOpener,
        private localDB: LocalDatabaseService,
        private iab: InAppBrowser) {}

  public getAgendaSessionContent(visitId: string, agendaId: number): Observable<any>{
      let me = this;
      this.visitId = visitId;
      let sessionContentCacheKey = `GetAgendaSessionContent-${visitId}-${agendaId}`, sessionFileName: string;

      return this.ajaxservice.getAPICacheData("GetAgendaSessionContent", `visitId=${visitId}&AgendaID=${agendaId}`, sessionContentCacheKey)
            .map((response: VisitAgendaSessionContentModel) => {
                if (response && response.ResponseStatus === "Success") {
                    return response;
                }
                return null;
            })
             .mergeMap(responsedata => {
                    if(!responsedata){
                        return Observable.of(null);
                    }else if(responsedata.isDownloaded && responsedata.fileSavePath){
                        //don't download, if it's already downloaded
                         return Observable.of(responsedata);
                    }
                    //download the file and save to file system
                    //update the local DB
                    sessionFileName = APP_CONFIG.storage_types.session + ' ' + responsedata.SessionTitle+'.pdf';
                    return me.saveContentToFileSystem(responsedata.SessionContent, sessionFileName)
                      .map(downloadStatus => {
                          //update the save file system details into response
                          responsedata.isDownloaded = false;
                          responsedata.fileSavePath = '';
                          responsedata.contentType = '';
                          responsedata.AgendaID = agendaId;
                          if(downloadStatus){
                              responsedata.isDownloaded = true;
                              responsedata.fileSavePath = downloadStatus;
                              responsedata.contentType = 'application/pdf';
                          }
                          responsedata.SessionContent = '';  //reset for performance
                          //save those details in local DB
                          this.saveToLocalDB(sessionContentCacheKey, responsedata);
                          return responsedata;
                      });
                });
  };

  private getSessionContentDirectoryPath(){
      let fileDirectory;
      if(this.utilityservice.isIos()){
          fileDirectory = this.file.documentsDirectory;
      }else{
          fileDirectory = this.file.externalRootDirectory;
      }

      fileDirectory +=  APP_CONFIG.appName + '/' + this.visitId;
      return fileDirectory;
  };

  public createContentDirectory(visitId: string): Promise<any>{
      let fileDirectory: string, directoryName: string;
      if(window.cordova){
          if(this.utilityservice.isIos()){
              fileDirectory = this.file.documentsDirectory;
          }else{
              fileDirectory = this.file.externalRootDirectory;
          }
          directoryName =  APP_CONFIG.appName + '/' + visitId;

          return  new Promise((resolve, reject) => {
            this.file.checkDir(fileDirectory, directoryName)
              .then(() => {
                  resolve(true);
              })
              .catch(err => {
                  this.file.createDir(fileDirectory, APP_CONFIG.appName, true)
                  .then(() => {
                      this.file.createDir(fileDirectory, directoryName, true)
                          .then(() => {
                              resolve(true);
                          })
                          .catch(err => {
                              resolve(false);
                          });
                  })
                  .catch(err => {
                      resolve(false);
                  });
              });
          });
      }else{
          return new Promise((resolve, reject) => {
              resolve(true);
          });
      }
  };

  saveContentToFileSystem(base64content: string, filename: string, contentType: string = 'application/pdf'): Observable<any>{
      let me = this;
      if(window.cordova){
          if(!base64content){
              return Observable.of(false);
          }
            let blobData = this.utilityservice.convertBase64ToBlob(base64content, contentType);
            this.fileDirectory = this.getSessionContentDirectoryPath();

            return Observable.fromPromise(this.file.writeFile( //save PDF
                this.fileDirectory,
                filename,
                blobData,
                {replace:true}
            ).then(() =>{
                return this.fileDirectory+'/'+filename;
            }).catch(e => {
                console.log('Save error',e);
                return false;
            }));
      }else{
          return Observable.of(true);
      }
  };

  private openPDFViewer(filesavepath: string, contentType: string){
      if(this.utilityservice.isIos()){  //for IOS, display using window.open
          let fileUrl = URL.createObjectURL(filesavepath);
          let browser = this.iab.create(fileUrl,
						'_blank',
						'location=no,' +
						'toolbar=yes,' +
						'enableViewportScale=yes,' +
						'closebuttoncaption=Cerrar PDF,' +
						'hardwareback=no'
					);
          browser.show();
          return new Promise((resolve, reject)=> {
              resolve(true);
          });
      }else{  //open in native PDF
          return this.fileOpener.open(
            filesavepath,
            contentType
          );
      }
  }

  openContentFromFileSystem(filesavepath: string, contentType: string = 'application/pdf'): Observable<any>{

      if(window.cordova){
          return Observable.fromPromise(
            this.openPDFViewer(filesavepath, contentType).then(() => {
              console.log('pdf is opened');
              return true;
            }).catch(e => {
                console.log('Open error', e);
                return false;
            })
          );
      }else{
          return Observable.of(true);
      }
  };

  getVisitPreReadDocumentList(visitId: string){
      let me = this;
      let sessionContentCacheKey = `GetVisitPreReadDocument-${visitId}`;
      return this.ajaxservice.getAPICacheData("GetVisitPreReadDocument", `visitId=${visitId}`, sessionContentCacheKey)
            .map((response: VisitAgendaPreReadDocumentModel) => {
                if (response && response.ResponseStatus === "Success" && response.VisitPreReadDocument) {
                    //update thumbnail with content type
                    _.forEach(response.VisitPreReadDocument, function(preReadObject) {
                        if(preReadObject.ThumbnailImage && !me.utilityservice.isContentTypeBase64Exist(preReadObject.ThumbnailImage)){
                            preReadObject.ThumbnailImage = "data:image/png;base64," + preReadObject.ThumbnailImage;
                        }
                    });
                    this.preReadDcoumentList = response;
                    return response.VisitPreReadDocument;
                }else{
                    return null;
                }
            },
            (error) => { return null; });
  };

  getPreReadDocumentDetails(visitId: string, documentId: number, documentTitle: string, isDownloadAll: boolean = false): Observable<any>{
      let me = this;
      this.visitId = visitId;
      let sessionContentCacheKey = `GetPreReadDocument-${visitId}-${documentId}`, sessionFileName: string;

      return this.ajaxservice.getAPICacheData("GetPreReadDocument", `visitId=${visitId}&DocumentId=${documentId}`, sessionContentCacheKey)
            .map((response: VisitPreReadDocumentDetailModel) => {
                if (response && response.ResponseStatus === "Success") {
                    return response;
                }
                return null;
            })
             .mergeMap(responsedata => {
                    if(!responsedata){
                        return Observable.of(null);
                    }else if(responsedata.isDownloaded && responsedata.fileSavePath){
                        //don't download, if it's already downloaded
                         return Observable.of(responsedata);
                    }
                    //download the file and save to file system
                    //update the local DB
                    sessionFileName = APP_CONFIG.storage_types.preread + ' ' + documentTitle+'.pdf';
                    return me.saveContentToFileSystem(responsedata.PreReadDocument, sessionFileName)
                      .map(downloadStatus => {
                          //update the save file system details into response
                          responsedata.isDownloaded = false;
                          responsedata.fileSavePath = '';
                          responsedata.contentType = '';
                          responsedata.DocumentID = documentId;
                          if(downloadStatus){
                              responsedata.isDownloaded = true;
                              responsedata.fileSavePath = downloadStatus;
                              responsedata.contentType = 'application/pdf';
                          }
                          responsedata.PreReadDocument = '';  //reset for performance
                          //save those details in local DB
                          this.saveToLocalDB(sessionContentCacheKey, responsedata);
                          /*if(!isDownloadAll){
                              this.updatePreReadAllDocumentStatus(documentId, responsedata.isDownloaded);
                          }*/
                          return responsedata;
                      });
                });
  };

  private updatePreReadAllDocumentStatus = function(documentId: number, isDownloaded: boolean){
        let matchFound = false;
        if(this.preReadDcoumentList.VisitPreReadDocument){
          _.forEach(this.preReadDcoumentList.VisitPreReadDocument, function(preReadObj){
              if(preReadObj.DocumentID === documentId){
                  preReadObj.isDownloaded = isDownloaded;
                  matchFound = true;
              }
          });
        }
        if(matchFound){
            let sessionContentCacheKey = `GetVisitPreReadDocument-${this.visitId}`;
            this.saveToLocalDB(sessionContentCacheKey, this.preReadDcoumentList);
        }
  };

  private saveToLocalDB(sessionContentCacheKey: string, responsedata: any){
      //save those details in local DB
      let saveItem:ILocalForageItem = {
          key: sessionContentCacheKey,
          value: responsedata
      };
      this.localDB.setItem(saveItem);
  };

  public downloadAllPreReadDocuments(visitId: string){
      if(this.preReadDcoumentList.VisitPreReadDocument && this.preReadDcoumentList.VisitPreReadDocument.length){
          return Observable.fromPromise(this.createContentDirectory(visitId)
                .then(()=>{
                    return this.fetchAllPreReadDocuments(visitId);
                })
          );
      }
  };

  private fetchAllPreReadDocuments(visitId):  Observable<any>{
        let me = this;
        let observableBatch = [];

        if(!this.preReadDcoumentList.VisitPreReadDocument|| !this.preReadDcoumentList.VisitPreReadDocument.length){
            return Observable.of(false);
        }
        //return Observable.forkJoin(
        _.forEach(this.preReadDcoumentList.VisitPreReadDocument, function(preReadObject, key){
                if(!preReadObject.isDownloaded && preReadObject.DocumentID){
                      return me.getPreReadDocumentDetails(visitId, preReadObject.DocumentID, preReadObject.PreReadDocumentTitle, true).map(anchorResponse => {
                          observableBatch.push(anchorResponse);
                          if(key === me.preReadDcoumentList.VisitPreReadDocument.length - 1){
                              me.updatePreReadDocumentList(observableBatch, visitId);
                              return Observable.of(true);
                          }
                          return anchorResponse;
                      });
                }else{
                    //return Observable.of(preReadObject);
                }
        });/*)
        .map((dataArray: any[]) => {
            return me.updatePreReadDocumentList(dataArray, visitId);
        })*/
  };

  private updatePreReadDocumentList(observableBatch, visitId): Boolean {
      let me = this, matchFound = false;
      _.forEach(observableBatch, function(updatedRecord, key){
          if(me.preReadDcoumentList.VisitPreReadDocument){
              _.forEach(me.preReadDcoumentList.VisitPreReadDocument, function(preReadObj){
                  if(preReadObj.DocumentID === updatedRecord.DocumentID){
                      preReadObj.isDownloaded = updatedRecord.isDownloaded;
                      matchFound = true;
                  }
              });
          }
      });
      if(matchFound){
          let sessionContentCacheKey = `GetVisitPreReadDocument-${visitId}`;
          me.saveToLocalDB(sessionContentCacheKey, me.preReadDcoumentList);
          return true;
      }else{
          return false;
      }
  };

  public getAllDownloadSessionContent(visitId): Observable<any>{
      let me = this;
      let sessionkey = `GetAgendaSessionContent-${visitId}`;
      let mappedKeys = [];
      let observableBatch = [];
      return this.localDB.keys()
        .map(storekeys => {
            _.forEach(storekeys, function(itemKey){
                if (itemKey.indexOf(sessionkey) !== -1) {
                    mappedKeys.push(itemKey);
                }
            });
            return mappedKeys;
        })
        .mergeMap(sessionkeys => {
            if(!sessionkeys.length){
                 return Observable.of(null);
            }
            _.forEach(sessionkeys, function(sessionkey){
                  observableBatch.push(me.localDB.getItem(sessionkey));
            });
            return Observable.forkJoin(observableBatch);
        });
  };

  private deleteVisitAgendaDocumentByKey(sessionKey) : Observable<any>{
      let me = this;
      if(!sessionKey){
        return Observable.of(null);
      }
      return this.localDB.getItem(sessionKey)
              .map((localDBData) => {
                  if(localDBData && localDBData.isDownloaded && localDBData.fileSavePath){
                      return localDBData;
                  }else{
                      return null;
                  }
              })
              .mergeMap(_localDBData => {
                  if(!_localDBData){
                      return Observable.of(false);
                  }
                  let fileDir =  _localDBData.fileSavePath.split('/').slice(0, -1).join('/');
                  let fileName = _localDBData.fileSavePath.split('/').slice(-1).join('/');
                  return Observable.fromPromise(me.file.removeFile(fileDir, fileName)
                    .then(function (result) {
                        me.localDB.removeItem(sessionKey);
                        return true;
                    }, function (err) {
                        return false;
                    }));
              });
  };

  public deleteAllVisitAgendaDocuments(visitId: string, type: string): Observable<any> {
      let me = this, sessionkey = '', mappedKeys = [], observableBatch = [], fileDirectory;
      if(type === 'visitcontent'){
           sessionkey  = `GetPreReadDocument-${visitId}`;
      }else if(type === 'sessioncontent'){
           sessionkey  = `GetAgendaSessionContent-${visitId}`;
      }

      if(sessionkey){
           return this.localDB.keys()
              .map(storekeys => {
                  _.forEach(storekeys, function(itemKey){
                      if (itemKey.indexOf(sessionkey) !== -1) {
                          mappedKeys.push(itemKey);
                      }
                  });
                  return mappedKeys;
              })
              .mergeMap(sessionkeys => {
                  if(!sessionkeys.length){
                       return Observable.of(null);
                  }
                  _.forEach(sessionkeys, function(sessionkey){
                      observableBatch.push(me.deleteVisitAgendaDocumentByKey(sessionkey));
                  });
                  return Observable.forkJoin(observableBatch);
              });
      }else{
          return Observable.of(null);
      }
  };

  public viewSessionContent(visitId: string, agendaId: number): Observable<any>{
      let sessionContentCacheKey = `GetAgendaSessionContent-${visitId}-${agendaId}`;
      return this.localDB.getItem(sessionContentCacheKey)
          .map((sessioncontent) => {
                if(sessioncontent){
                    return this.openContentFromFileSystem(sessioncontent.fileSavePath, sessioncontent.contentType);
                }
          });
  };

  public getLocalSessionContent(visitId: string, agendaId: number): Observable<any>{
      let sessionContentCacheKey = `GetAgendaSessionContent-${visitId}-${agendaId}`;
      return this.localDB.getItem(sessionContentCacheKey);
  };

  public getLocalPreReadContent(visitId: string, documentId: number): Observable<any>{
      let sessionContentCacheKey = `GetPreReadDocument-${visitId}-${documentId}`;
      return this.localDB.getItem(sessionContentCacheKey);
  };

  public deleteSessionContent(visitId: string, agendaId: number): Observable<any>{
      let sessionContentCacheKey = `GetAgendaSessionContent-${visitId}-${agendaId}`;
      return this.deleteVisitAgendaDocumentByKey(sessionContentCacheKey);
  };

  public viewPreReadDocumentContent(visitId: string, documentId: number): Observable<any>{
      let sessionContentCacheKey = `GetPreReadDocument-${visitId}-${documentId}`;
      return this.localDB.getItem(sessionContentCacheKey)
          .map((sessioncontent) => {
                if(sessioncontent){
                    return this.openContentFromFileSystem(sessioncontent.fileSavePath, sessioncontent.contentType);
                }
          });
  };

  public deletePreReadDocumentContent(visitId: string, documentId: number): Observable<any>{
      let sessionContentCacheKey = `GetPreReadDocument-${visitId}-${documentId}`;
      return this.deleteVisitAgendaDocumentByKey(sessionContentCacheKey)/*
              .map(removesuccess => {
                  if(removesuccess){
                    this.updatePreReadAllDocumentStatus(documentId, false);
                  }
                  return removesuccess;
              })*/;
  };

  public emitDownloadUserActionEvent(actionText: string){
      if(this.downloadSideMenuEvent){
          this.downloadSideMenuEvent.next(actionText);
      }
  };

  public emitDownloadDisplaySideMenuEvent(actionText: string){
      if(this.downloadDisplaySideMenuEvent){
          this.downloadDisplaySideMenuEvent.next(actionText);
      }
  }
}
