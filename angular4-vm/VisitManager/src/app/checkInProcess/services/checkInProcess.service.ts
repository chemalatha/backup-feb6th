import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import { VisitorInformationModel } from './visitorInformation.model';
import { VisitorScanBarcodeModel } from './visitorScanBarcode.model';
import { VisitorAssetDetailsModel } from './visitorAssetDetails.model';
import {UtilityServices} from '../../core/services/utility.service';
import {DefaultBase64Image} from '../../core/services/defaultBase64Image';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CheckInProcessService {
    public visitorDetails = null;
    public IsCheckedIn = false;

    private checkInCompleteEvent = new Subject<boolean>(); // Source
    public checkInCompleteEventObservable = this.checkInCompleteEvent.asObservable(); // Stream

    constructor(
        private ajaxservice: AjaxService,
        private utilityservice: UtilityServices,
        private base64service: DefaultBase64Image) {}

    getVisitorDetails(visitId: string, ignorePhoto: boolean = true): Observable<any> {
      let sessionContentCacheKey = 'GetVisitorInformation';
      let requestId = (!ignorePhoto) ? 'GetVisitorInformationWithoutPhoto': 'GetVisitorInformation';
      return this.ajaxservice.getAPICacheData(requestId, `visitId=${visitId}`, sessionContentCacheKey)
            .map((response: VisitorInformationModel) => {
                if (response && response.ResponseStatus === "Success") {
                    this.visitorDetails = response;
                    if(response.VisitorPhoto){
                        response.VisitorPhoto = "data:image/jpeg;base64," + response.VisitorPhoto;
                        response.isDefault = false;
                    }else{
                        response.VisitorPhoto = "data:image/jpeg;base64," + this.base64service.defaultSpeakerAvatarImage;
                        response.isDefault = true;
                    }
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    getVisitorScanBarcode(visitId: string): Observable<any> {
      let sessionContentCacheKey = 'GetVisitConfirmationBarCode';
      return this.ajaxservice.getAPICacheData('GetVisitConfirmationBarCode', `visitId=${visitId}`, sessionContentCacheKey)
            .map((dataresponse: VisitorScanBarcodeModel) => {
                let response = this.utilityservice.getClonedObject(dataresponse);
                if (response && response.ResponseStatus === "Success") {
                    if(response.ConfirmationNumberImage){
                        response.ConfirmationNumberImage = "data:image/png;base64," + response.ConfirmationNumberImage;
                    }
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    getVisitorAssetDetails(visitId: string): Observable<any> {
      let sessionContentCacheKey = 'GetVisitorAssetDetails';
      return this.ajaxservice.getAPICacheData('GetVisitorAssetDetails', `visitId=${visitId}`, sessionContentCacheKey)
            .map((response: VisitorAssetDetailsModel) => {
                if (response && response.ResponseStatus === "Success") {
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    triggerCheckInCompleteEvent(){
        this.checkInCompleteEvent.next(true);
    }

}
