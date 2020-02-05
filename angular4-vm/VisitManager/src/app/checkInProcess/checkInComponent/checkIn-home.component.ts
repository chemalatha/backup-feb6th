import { Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {CheckInProcessService} from '../services/checkInProcess.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VisitorInformationModel } from '../services/visitorInformation.model';
import { ILocalForageItem, LocalDatabaseService} from '../../core/database/local-database.service';
import { UtilityServices } from '../../core/services/utility.service';
import { APP_CONFIG } from '../../app.config';
import * as moment from 'moment';

declare var window: any;

@Component({
	moduleId: module.id,
	templateUrl: './checkIn-home.component.html',
	styleUrls: ['./checkIn.component.scss']
})

export class CheckInHomeComponent implements OnInit{
	public title: string;
  public visitorDisplayDetails: any=null;
  public inputDisabled: boolean=false;
  public editConfirm: boolean=false;

  @ViewChild('photoselectpopup') photoselectElementRef;

  private  cameraoptions: CameraOptions = {
      quality: APP_CONFIG.checkInProcessCamera.quality,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: APP_CONFIG.checkInProcessCamera.width,
      targetHeight: APP_CONFIG.checkInProcessCamera.height,
      cameraDirection: APP_CONFIG.checkInProcessCamera.direction,
      sourceType: 1  //camera
  };

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private checkInService: CheckInProcessService,
    private selectVisit: SelectVisitServices,
    private ajaxService: AjaxService,
    private camera: Camera,
    private localDB: LocalDatabaseService,
    private utilityService: UtilityServices){}

	ngOnInit(){
          //need to define with empty values to avoid form ngmodel undefined
          this.visitorDisplayDetails = {
              VisitorFirstName: '',
              VisitorLastName: '',
              VisitorContactNumber: '',
              VisitorCompanyName: '',
              VisitorDesignation: '',
              VisitorEmailID: '',
              VisitorPhoto: '',
              VisitFormatDate: ''
          };
          this.checkInService.getVisitorDetails(this.selectVisit.selectedVisitObj.VisitID)
          .subscribe((visitorDetails) => {
              this.visitorDisplayDetails = visitorDetails;
              if(this.visitorDisplayDetails.VisitDate){
                  this.visitorDisplayDetails.VisitFormatDate = moment(this.visitorDisplayDetails.VisitDate).format('DD MMM YYYY');
              }
          });
  };

  onSaveBtnTap(checkInForm){
      this.inputDisabled = true;
      this.editConfirm = true;
  };

  onResetBtnTap(){
        this.visitorDisplayDetails.VisitorFirstName = '';
        this.visitorDisplayDetails.VisitorLastName = '';
        this.visitorDisplayDetails.VisitorDesignation = '';
  };

  onEditBtnTap(){
      this.inputDisabled = false;
      this.editConfirm = false;
  };

   onConfirmBtnTap(){
       this.confirmVisitorDetails();
  };

  photoSelectAction(actionText){
      if(actionText === 'takephoto'){
          this.cameraoptions.sourceType = 1;
      }else if(actionText === 'choosephoto'){
          this.cameraoptions.sourceType = 2;
      }
      this.showNativeCamera();
  }

  takePicture(){
      this.photoselectElementRef.openPopup();
  };

  private showNativeCamera(){
      let me = this;
      if(window.cordova){
          this.camera.getPicture(this.cameraoptions).then((imageData) => {
               // If it's base64:
               me.visitorDisplayDetails.VisitorPhoto = 'data:image/jpeg;base64,' + imageData;
               me.visitorDisplayDetails.isDefault = false;
          }, (err) => {
               // Handle error
          });
      }
  }

  saveVisitorDetails(){
      //save those details in local DB
      if(this.visitorDisplayDetails){
          let saveVisitorContent = this.utilityService.getClonedObject(this.visitorDisplayDetails);
          if(saveVisitorContent.VisitorPhoto){
              saveVisitorContent.VisitorPhoto = saveVisitorContent.VisitorPhoto.split(',')[1];
          }
          let saveItem:ILocalForageItem = {
              key: 'getVisitorDetails',
              value: saveVisitorContent
          };
          this.localDB.setItem(saveItem);
      }
  };

  confirmVisitorDetails(){
      let saveVisitorContent = this.utilityService.getClonedObject(this.visitorDisplayDetails);
      if(saveVisitorContent.VisitorPhoto){
          saveVisitorContent.VisitorPhoto = saveVisitorContent.VisitorPhoto.split(',')[1];
      }
      let data = {
          VisitorFirstName: saveVisitorContent.VisitorFirstName,
          VisitorLastName: saveVisitorContent.VisitorLastName,
          VisitorCompanyName: saveVisitorContent.VisitorCompanyName,
          VisitorDesignation: saveVisitorContent.VisitorDesignation,
          VisitorPhoto: (typeof this.visitorDisplayDetails.isDefault === 'undefined' || this.visitorDisplayDetails.isDefault) ? '' : saveVisitorContent.VisitorPhoto,
          VisitId: this.selectVisit.selectedVisitObj.VisitID
      };
      let authdata = JSON.stringify(data);

      this.ajaxService.makeJSONRequest("SubmitVisitorDetails", authdata)
        .subscribe(response => this.submitVisitorSuccess(response),
        error => this.submitVisitorFailure(error) );
  };

  private submitVisitorSuccess(response){
      if(response && response.ResponseStatus === 'Success: Data saved successfully'){
          this.checkInService.triggerCheckInCompleteEvent();
          this._router.navigate(["/checkin/scanbarcode"]);
      }
  };

  private submitVisitorFailure(err){
       //display alert
  };

}
