import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash';
import {UtilityServices} from '../../core/services/utility.service';
import {PointOfContactModel} from './pointOfContact.model';
import {DefaultBase64Image} from '../../core/services/defaultBase64Image';
import {PointOfContactPhotoModel} from './pointOfContactPhoto.model';
import { MeetPresentorModel } from './meetPresentor.model';
import {MeetPresentorPhotoModel} from './meetPresentorPhoto.model';
import {WifiInformationModel} from './wifiInformation.model';
import {NewsAndEventsModel} from './newsAndEvents.model';

@Injectable()
export class VisitContactServices {

   constructor(
        private ajaxservice: AjaxService,
        private utilityservice: UtilityServices,
        private base64service: DefaultBase64Image) {}


    getPointOfContactDetails(visitId: string): Observable<any> {
        let me = this;
        let sessionContentCacheKey = `GetPointOfContactDetails-${visitId}`;
        return this.ajaxservice.getAPICacheData('GetPointOfContactDetails', `visitId=${visitId}`, sessionContentCacheKey)
              .map((response: PointOfContactModel) => {
                  if (response && response.ResponseStatus === "Success" && response.POCDetails) {
                      let POCDetailsArr = this.utilityservice.getClonedObject(response.POCDetails);
                      _.forEach(POCDetailsArr, function(pocObject, key){
                          if(!pocObject.Photo){
                              pocObject.Photo = "data:image/jpeg;base64," + me.base64service.defaultSpeakerAvatarImage;
                          }
                      });
                      return POCDetailsArr;
                  } else {
                      return null;
                  }
              },
              (error) => { return null; });
    };

    getPointOfContactPhotoDetails(visitId, POCDetailsArr): Observable<any>{
        let me = this;
        let observableBatch = [];

        _.forEach(POCDetailsArr, function(POCDetailsObj, key){
              if(POCDetailsObj){
                  observableBatch.push(me.getPointOfContactPhoto(visitId, POCDetailsObj.POCID)
                  .map(photoResponse => {
                      if(photoResponse){
                          POCDetailsObj.Photo = photoResponse;
                      }
                      return POCDetailsObj;
                  }));
              }
        });

        return Observable.forkJoin(observableBatch);
    };

    private getPointOfContactPhoto(visitId: string, pocID: string): Observable<any>{
        let data = {
            VisitID: visitId,
            POCID: pocID
        };
        return this.ajaxservice.getAPICacheData("GetPOCDetailsPhoto", data, `GetPOCDetailsPhoto-${visitId}-${pocID}`)
            .map((response: PointOfContactPhotoModel) => {
                if (response && response.ResponseStatus === "Success" && response.Photo) {
                    return "data:image/jpeg;base64," + response.Photo;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    getMeetPresentorDetails(visitId: string): Observable<any> {
      let me = this;
      let meetPresentorCacheKey = `getMeetPresentorDetails-${visitId}`;
      return this.ajaxservice.getAPICacheData('GetVisitTeamToMeet', `visitId=${visitId}`, meetPresentorCacheKey)
        .map((response: MeetPresentorModel) => {
          if (response && response.ResponseStatus === "Success" && response.VisitContacts) {
            let meetPresentorArr = this.utilityservice.getClonedObject(response.VisitContacts);
            _.forEach(meetPresentorArr, function(meetPresentorObject, key) {
              if (!meetPresentorObject.Photo) {
                meetPresentorObject.Photo = "data:image/jpeg;base64," + me.base64service.defaultSpeakerAvatarImage;
              }
            });
            return meetPresentorArr;
          } else {
            return null;
          }
        },
        (error) => { return null; });
    };

    getMeetPresentorPhotoDetails(visitId, meetPresentorArr): Observable<any>{
        let me = this;
        let observableBatch = [];

        _.forEach(meetPresentorArr, function(meetPresentorObj, key){
              if(meetPresentorObj){
                  observableBatch.push(me.getMeetPresentorPhoto(visitId, meetPresentorObj.ContactDetailID)
                  .map(photoResponse =>{
                      if(photoResponse){
                          meetPresentorObj.Photo = photoResponse;
                      }
                      return meetPresentorObj;
                  }));
              }
        });

        return Observable.forkJoin(observableBatch);
    };

    private getMeetPresentorPhoto(visitId: string, contactDetailID: number): Observable<any>{
        let data = {
            VisitID: visitId,
            ContactDetailId: contactDetailID
        };
        return this.ajaxservice.getAPICacheData("GetVisitTeamToMeetPhoto", data, `GetVisitTeamToMeetPhoto-${visitId}-${contactDetailID}`)
            .map((response: PointOfContactPhotoModel) => {
                if (response && response.ResponseStatus === "Success" && response.Photo) {
                    return "data:image/jpeg;base64," + response.Photo;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    public getWifiDetails(visitId: string){
        let me = this;
        let wifiInformationCacheKey = `getWifiDetails-${visitId}`;
        return this.ajaxservice.getAPICacheData('GetWifiInformation', `visitId=${visitId}`, wifiInformationCacheKey)
          .map((response: WifiInformationModel) => {
            if (response && response.ResponseStatus === "Success" && response.WifiInformation) {
                let wifiDetails = this.utilityservice.getClonedObject(response.WifiInformation);
                let wifiInfo=[];
                wifiDetails = _.groupBy(wifiDetails, 'CityName');
                _.forEach(wifiDetails, function(value, key){
                    let obj={
                      city:key,
                      wifiInformation:value
                    };
                    wifiInfo.push(obj)
                })
                return wifiInfo;
            } else {
                return null;
            }
          },
          (error) => { return null; });
    };

    public getNewsAndEvents(visitId: string){
        let me = this;
        let sessionCacheKey = `getNewsAndEvents`;
        return this.ajaxservice.getAPICacheData('GetNewsAndEvents', `visitId=${visitId}`, sessionCacheKey)
          .map((response: NewsAndEventsModel) => {
            if (response && response.ResponseStatus === "Success" && response.News) {
                return response.News;
            } else {
                return null;
            }
          },
          (error) => { return null; });

    }

}
