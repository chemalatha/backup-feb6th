import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitsAgendaDownloadService } from '../services/visits-agenda-download.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {UtilityServices} from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
	templateUrl:'./download-visitcontent.component.html',
    styleUrls: ['./download-visitcontent.scss']
})
export class DownloadVisitContentComponent implements OnInit, OnDestroy{

    public preReadDocumentList:any = [];
    private modalEventCallbackSubscribe;
    private downloadSideMenuEventObservable;

    constructor(
        private selectVisit: SelectVisitServices,
        private agendaSession: VisitsAgendaDownloadService,
        private _router:Router,
		    private _translate:TranslateService,
		    private route: ActivatedRoute,
        private utilityservice: UtilityServices,
        private errorConfig: ErrorConfig
    ){

    }

    ngOnInit(){
        //decide displaying the sidemenu option based on user access
        this.agendaSession.emitDownloadDisplaySideMenuEvent('visitcontent');
        this.fetchLocalVisitPreReadDocs();
        this.downloadSideMenuEventObservable = this.agendaSession.downloadSideMenuEventObservable
            .subscribe(actionText => {
                if(actionText === 'downloadall'){
                    this.downloadAllPreReadDocuments();
                }else if(actionText === 'deleteall'){
                    this.deleteAllVisitAgendaDocuments('visitcontent');
                }
            });
    }

    private fetchLocalVisitPreReadDocs(){
        let me = this;
        this.agendaSession.getVisitPreReadDocumentList(this.selectVisit.selectedVisitObj.VisitID)
            .subscribe(preloadDocument => {
                if(preloadDocument){

                    this.preReadDocumentList = preloadDocument;
                    _.forEach(preloadDocument, function(preloadItem, index){
                        // update the isDownloaded status if we already downloaded
                        me.agendaSession.getLocalPreReadContent(me.selectVisit.selectedVisitObj.VisitID, preloadItem.DocumentID).subscribe(preReadData =>{
                            me.preReadDocumentList[index].isDownloaded = (preReadData) ? true : false;
                        });
                    });

                }else{
                    this.preReadDocumentList = [];
                }
            });
    }

    downloadPreReadDocument(documentId: number, documentTitle: string){
        if(documentId && documentTitle){
            this.agendaSession.createContentDirectory(this.selectVisit.selectedVisitObj.VisitID)
                .then(()=>{
                    this.fetchPreReadDocumentDetails(documentId, documentTitle);
                });
        }
    }

    private fetchPreReadDocumentDetails(documentId: number, documentTitle: string){
        this.agendaSession.getPreReadDocumentDetails(this.selectVisit.selectedVisitObj.VisitID, documentId, documentTitle)
            .subscribe((sessioncontent) => {
                if(sessioncontent){
                    let matchIndex = _.findIndex(this.preReadDocumentList, {'DocumentID': documentId});
                    if(matchIndex !== -1){
                        this.preReadDocumentList[matchIndex].isDownloaded = true;
                    }
                    /*this.agendaSession.openContentFromFileSystem(sessioncontent.fileSavePath, sessioncontent.contentType)
                      .subscribe(()=> console.log('file opened'));*/
                }

            });
    };

    //@TODO, need to fix download all feature
    public downloadAllPreReadDocuments(){
        this.utilityservice.loadSpinner(true);
        this.agendaSession.downloadAllPreReadDocuments(this.selectVisit.selectedVisitObj.VisitID)
            .subscribe(response => {
                console.log(response);
                this.utilityservice.loadSpinner(false);
                this.fetchLocalVisitPreReadDocs();
                //this._router.navigate(['/home/downloads/visitcontent']);
            });
    };

    public deleteAllVisitAgendaDocuments(type: string){
        this.utilityservice.loadSpinner(true);
        this.agendaSession.deleteAllVisitAgendaDocuments(this.selectVisit.selectedVisitObj.VisitID, type)
            .subscribe(response => {
                console.log(response);
                this.utilityservice.loadSpinner(false);
                this.fetchLocalVisitPreReadDocs();
                //this._router.navigate(['/home/downloads/visitcontent']);
            });
    }

    public viewPreReadDocumentContent(documentId){
        this.agendaSession.viewPreReadDocumentContent(this.selectVisit.selectedVisitObj.VisitID, documentId)
            .subscribe((sessioncontent) => {
                console.log('file opened');
            });
    };

    public removePreReadDocumentContent(documentId){
        this.errorConfig.showMessage("49");
        //added safe check to avoid triggering multiple times
        if(this.modalEventCallbackSubscribe){
            this.modalEventCallbackSubscribe.unsubscribe();
        }
        this.modalEventCallbackSubscribe = this.utilityservice.modelEventCallbackObservable.subscribe(data => {
      			if(data.type=== 'warning'){
                if(data.result==='yes'){
                    this.proceedRemovePreReadDocumentContent(documentId);
          			}else{
          				//no delete
          			}
            }
		    });
    };

    private proceedRemovePreReadDocumentContent(documentId){
        this.utilityservice.loadSpinner(true);
        this.agendaSession.deletePreReadDocumentContent(this.selectVisit.selectedVisitObj.VisitID, documentId)
            .subscribe((removesuccess) => {
                console.log('file removed');
                this.utilityservice.loadSpinner(false);
                //this._router.navigate(['/home/downloads']);
                if(removesuccess){
                    let matchIndex = _.findIndex(this.preReadDocumentList, {'DocumentID': documentId});
                    if(matchIndex !== -1){
                        this.preReadDocumentList[matchIndex].isDownloaded = false;
                    }
                }
            });
    };

    public sendVisitContentEmail(documentId){
        this.agendaSession.getLocalPreReadContent(this.selectVisit.selectedVisitObj.VisitID, documentId)
            .subscribe(visitcontent => {
                if(visitcontent){
                    this.selectVisit.displayNativeEmailApp('', '', '', visitcontent.fileSavePath);
                }
            });
    }

    ngOnDestroy(){
        if(this.modalEventCallbackSubscribe){
    			  this.modalEventCallbackSubscribe.unsubscribe();
    		}
        if(this.downloadSideMenuEventObservable){
            this.downloadSideMenuEventObservable.unsubscribe();
        }
    }
};
