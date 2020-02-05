import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {HeaderService} from '../../shared/headerComponent/header.services';

@Component({
	moduleId: module.id,
	templateUrl: './settings-home.component.html',
	styleUrls: ['./settings.scss']
})

export class SettingsHomeComponent implements OnInit {

  private routesubscribe;
	public settingsContent = [
		//{title:this._translate.instant('enableTouchId'),route:'/settings/visitdetails'}, 
		{title:this._translate.instant('change_password_first_time'), route:'/settings/changePassword'},
		{title: this._translate.instant('contactUsTitle'), route:'/settings/contactus'}
	];

	constructor(
		private _router: Router ,
		private _translate:TranslateService,
		private route: ActivatedRoute,
		private headerService: HeaderService){}

	ngOnInit(){
    let obj = {
        title:this._translate.instant("settingsTitle"),
        isHomeBtn: false,
        isBackBtn: false,
        isMenuBtn: true
    };
    if(this.headerService.isSideMenuClick){
        obj.isHomeBtn = true;
    }
    this.headerService.setHeaderObject(obj);

	}
}