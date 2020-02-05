import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import { AjaxService } from '../../core/services/AjaxService.service';
import {Router } from '@angular/router';
import {ContactUsModel} from './contactus.model';
import { UtilityServices } from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import { APP_CONFIG } from '../../app.config';
import {TranslateService} from 'ng2-translate/ng2-translate';

declare var window:any;
@Component({
	templateUrl:'./contactus.component.html',
	styleUrls:['./contactus.scss']
})
export class ContactUsComponent implements OnInit{

  public comment;
	constructor(
		private headerService: HeaderService,
		private selectvisit: SelectVisitServices,
		private ajaxService: AjaxService,
		private _router:Router,
    private utilityService: UtilityServices,
    private errorConfig: ErrorConfig,
     private _translate: TranslateService){}

	ngOnInit(){
		let obj = {
			title:this._translate.instant("contactUsTitle"),
			isHomeBtn: false,
			isBackBtn: true,
			isMenuBtn: true
		};
		this.headerService.setHeaderObject(obj);
	};

	onSubmitBtnTap(){

		if (this.comment) {
			let data = {
				visitID: this.selectvisit.selectedVisitObj.VisitID
			};
			this.ajaxService.makeJSONRequest("GetContactUsEmail", data)
				.subscribe(response => this.contactUsEmailSuccess(response),
				error => this.contactUsEmailError(error) );
			
		}
	};

	contactUsEmailSuccess(response: ContactUsModel){
    let me = this;
		if (response && response.ResponseStatus === "Success" && response.EmailID) {
        this.selectvisit.displayNativeEmailApp(response.EmailID, APP_CONFIG.contactUSEmailSubject, me.comment);
		}else{
        //display alert message
        this.errorConfig.showMessage("4");
    }
	}
                                
    contactUsEmailError(error){}

}