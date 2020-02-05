import {Component, Input, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {UtilityServices} from '../../services/utility.service';
import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app-alert-component',
  templateUrl: "./modal.alert.component.html",
  styleUrls: ['./modal.alert.scss']
})
export class ModalAlertComponent implements OnInit, OnDestroy{

    @ViewChild('alertCompRef') alertCompref: ElementRef;

    private modaloption: NgbModalOptions = {
        backdrop:"static",
        windowClass: "alert-modal-popup"
    };

    public modalAlertRef;
    private modalAlertsubscribe;
    public title;
    public message;
    public displayButtonInfos;

    constructor(
        private utilityService: UtilityServices,
        private modalinstance: NgbModal,
        private _translate: TranslateService) {
    }

    ngOnInit() {
        this.modalAlertsubscribe = this.utilityService.modelAlertEventObservable.subscribe((resObj: any) => {
            this.title = resObj.title;
            this.message = resObj.message;
            this.displayButtonInfos = this.getButtonsToDisplay(resObj.type);

            this.modalAlertRef = this.modalinstance.open(this.alertCompref, this.modaloption);

            this.modalAlertRef.result.then((result) => {
              if (resObj.type === 'logout' || resObj.type === 'warning' || resObj.type === 'warningOkCancel' || resObj.type === 'changepassword_firsttime_warning' || resObj.type === 'session_expire') {
                     this.utilityService.modelEventCallback.next({
                         type: resObj.type,
                         result: result
                     });
                 }
             }, (reason) => {
                console.log(reason);
           });
        });
    }

    ngOnDestroy(){
        if(this.modalAlertsubscribe){
            this.modalAlertsubscribe.unsubscribe();
        }
    }


    private getButtonsToDisplay(type): Array<any>{
        if(type === "failure" || type === "error" || type === "success"){
          type = "okText";
        }
        let buttonInfo :any;
        switch(type){
          case 'okText':
              buttonInfo = [{text:this._translate.instant("okErrMessage"), class:"doneCls btn-primary", callbackText:"ok"}];
              break;
          case 'logout':
              buttonInfo = [{text:this._translate.instant("cancelErrMsg"), class:"cancelCls btn-secondary", callbackText:"no"}, {text:this._translate.instant("logoutErrMsg"), class:"doneCls btn-primary", callbackText:"yes"}];
              break;
          case 'update':
              buttonInfo = [{text:this._translate.instant("error_generic_update"), class:"doneCls btn-primary", callbackText:"ok"}];
              break;
          case 'warning':
              buttonInfo = [{text:this._translate.instant("yesErrmsg"), class:"doneCls btn-primary", callbackText:"yes"}, {text:this._translate.instant("noErrMsg"), class:"cancelCls btn-secondary", callbackText:"no"}];
              break;
          case 'changepassword_firsttime_warning':
              buttonInfo = [{text:this._translate.instant("yesErrmsg"), class:"doneCls btn-primary", callbackText:"yes"}, {text:this._translate.instant("noErrMsg"), class:"cancelCls btn-secondary", callbackText:"no"}];
              break;
          case 'warningOkCancel':
            buttonInfo = [{ text: this._translate.instant("cancelErrMsg"), class: "cancelCls btn-secondary", callbackText: "no" }, { text: this._translate.instant("okErrMessage"), class: "doneCls btn-primary", callbackText: "ok" }];
            break;
          case 'feedback':
              buttonInfo = [{text:this._translate.instant("feedbackRemindLaterBtn"), class:"doneCls btn-primary", callbackText:"yes"}, {text:this._translate.instant("feedbackNotIntrested"), class:"cancelCls btn-secondary", callbackText:"no"}];
              break;
          case 'session_expire':
               buttonInfo = [{text:this._translate.instant("logoutErrMsg"), class:"doneCls btn-primary", callbackText:"yes"}, {text:this._translate.instant("continueText"), class:"cancelCls btn-secondary", callbackText:"no"}];
               break;

         }
         return buttonInfo;
    }
}
