import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash';
import {UtilityServices} from '../../core/services/utility.service';
import {TravelGuideModel} from './travel-guide.model';
import { VisitorGuideModel } from './visitor-guide.model';
import {FoodPreferenceDetailsModel} from './foodPreferenceDetails.model';
import {CabBookingDetailsModel} from './cabBookingDetails.model';
import {VisitFloorPlanModel} from './visitFloorPlan.model';
import {SafetyOverviewModel} from './safetyOverview.model';
import { ILocalForageItem, LocalDatabaseService} from '../../core/database/local-database.service';
import {VisitFloorPlanImageModel} from './visitFloorPlanImage.model';

@Injectable()
export class LogisticsServices {

   constructor(
        private ajaxservice: AjaxService,
        private utilityservice: UtilityServices,
        private localDB: LocalDatabaseService) {}


    getTravelGuideDetails(visitId: string): Observable<any> {
      let sessionContentCacheKey = `GetTravelGuideDetails`;
      return this.ajaxservice.getAPICacheData('GetTravelGuideDetails', `visitId=${visitId}`, sessionContentCacheKey)
            .map((response: TravelGuideModel) => {
                if (response && response.ResponseStatus === "Success" && response.ImmigrationInfo) {
                    return response.ImmigrationInfo;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    getVisitorGuidelinesDetails(visitId: string): Observable<any> {
        let visitorGuidelinesCacheKey = `GetVisitorGuideDetails`;
        return this.ajaxservice.getAPICacheData('GetVisitorGuideline', `visitID=${visitId}`, visitorGuidelinesCacheKey)
            .map((response: VisitorGuideModel) => {
                if (response && response.ResponseStatus === "Success" && response.GuidelineDescription) {
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };


    getFoodPreferenceDetails(visitId: string): Observable<any> {
          let sessionContentCacheKey = 'getFoodPreferenceDetails';
          return this.ajaxservice.getAPICacheData('GetFoodPreference', `visitId=${visitId}`, sessionContentCacheKey)
                .map((response: FoodPreferenceDetailsModel) => {
                    if (response && response.ResponseStatus === "Success") {
                        return response;
                    } else {
                        return null;
                    }
                },
                (error) => { return null; });
    };

    saveFoodPreferenceDetails(saveFoodContent: any, visitId: string): Observable<any> {

        let data = {
          FoodPreferenceId: saveFoodContent.FoodPreferenceType,
          Allergice: saveFoodContent.Allergice,
          FoodID: (saveFoodContent.FoodID) ? saveFoodContent.FoodID: '0',
          visitID: visitId
        };
        let authdata = JSON.stringify(data);

        return this.ajaxservice.makeJSONRequest("AddFoodPreference", authdata)
          .map((response) => {
              if (response && response.ResponseStatus === 'Success') {
                  return response;
              } else {
                  return null;
              }
          },
          (error) => { return null; });
      };

      getCabBookingDetails(visitId: string): Observable<any> {
          let sessionContentCacheKey = 'getCabBookingDetails';
          return this.ajaxservice.getAPICacheData('GetCabBookingDetails', `visitId=${visitId}`, sessionContentCacheKey)
                .map((response: CabBookingDetailsModel) => {
                    if (response && response.ResponseStatus === "Success" && response.CabBooking) {
                        return response.CabBooking;
                    } else {
                        return null;
                    }
                },
                (error) => { return null; });
    };

    requestForCab(cabRequestId: number, cityId: number, visitId: string): Observable<any> {

        let data = {
          CabRequestID: cabRequestId,
          CityId: cityId,
          VisitId: visitId
        };
        let authdata = JSON.stringify(data);

        return this.ajaxservice.makeJSONRequest("RequestCab", authdata)
          .map((response) => {
              if (response && response.ResponseStatus === 'Success: Data saved successfully') {
                  return response;
              } else {
                  return null;
              }
          },
          (error) => { return null; });
      };

      cancelCabRequest(cabRequestId: number, visitId: string): Observable<any> {

        let data = `CabRequestID=${cabRequestId}&VisitId=${visitId}`;

        return this.ajaxservice.makeJSONRequest("CancelCabRequest", data)
          .map((response) => {
              if (response && response.ResponseStatus === 'Success: Data saved successfully') {
                  return response;
              } else {
                  return null;
              }
          },
          (error) => { return null; });
      };

      getVisitFloorPlan(visitId: string): Observable<any>{
          let sessionContentCacheKey = 'getVisitFloorPlan';
          return this.ajaxservice.getAPICacheData('GetVisitFloorPlan', `visitId=${visitId}`, sessionContentCacheKey)
                .map((response: VisitFloorPlanModel) => {
                    if (response && response.ResponseStatus === "Success" && response.FloorPlan) {
                        return response.FloorPlan;
                    } else {
                        return null;
                    }
                },
                (error) => { return null; });
      };

      getAllFloorPlanImages(visitId: string, floorPlanList: any[]): Observable<any>{
          let me = this;
          let observableBatch = [];

          _.forEach(floorPlanList, function(floorPlanObject, index){
              if(floorPlanObject.FloorID){
                  observableBatch.push(me.fetchFloorPlanLocalImage(visitId, floorPlanObject.FloorID));
              }
          });

           return Observable.forkJoin(observableBatch);

      };

      fetchFloorPlanLocalImage(visitId: string, floorId: number){
          let sessionContentCacheKey = `getVisitFloorPlanImage-${visitId}-${floorId}`;
          return this.localDB.getItem(sessionContentCacheKey)
                .map((localData) => {
                        if(localData){
                            localData.FloorPlanImage = "data:image/png;base64,"+localData.FloorPlanImage;
                            return localData.FloorPlanImage;
                        }else{
                            return null;
                        }
                    })
                    .mergeMap(responsedata => {
                        if(!responsedata){
                            return this.fetchFloorPlanImageById(visitId, floorId);
                        }
                        return Observable.of(responsedata);
                    });
      };

      fetchFloorPlanImageById(visitId: string, floorId: number){
          let sessionContentCacheKey = `getVisitFloorPlanImage-${visitId}-${floorId}`;
           return this.ajaxservice.getAPICacheData('GetFloorMapImage', `visitId=${visitId}&FloorId=${floorId}`, sessionContentCacheKey)
                .map((response: VisitFloorPlanImageModel) => {
                    if (response && response.ResponseStatus === "Success" && response.FloorPlanImage) {
                        response = this.utilityservice.getClonedObject(response);
                        response.FloorPlanImage = "data:image/png;base64,"+response.FloorPlanImage;
                        return response.FloorPlanImage;
                    } else {
                        return null;
                    }
                },
                (error) => { return null; });
      };

      getSafetyOverview(visitId: string): Observable<any>{
          let sessionContentCacheKey = 'getSafetyOverview';
          return this.ajaxservice.getAPICacheData('GetSafetyOverview', `visitId=${visitId}`, sessionContentCacheKey)
                .map((response: SafetyOverviewModel) => {
                    if (response && response.ResponseStatus === "Success" && response.SafetyOverview) {
                        return response.SafetyOverview;
                    } else {
                        return null;
                    }
                },
                (error) => { return null; });
      }

}
