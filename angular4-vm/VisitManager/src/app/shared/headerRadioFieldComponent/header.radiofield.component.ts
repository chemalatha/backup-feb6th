import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { APP_CONFIG } from '../../app.config';
// import {HeaderService} from './header.services';
import { Router } from '@angular/router';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import { UtilityServices } from '../../core/services/utility.service';
import * as _ from 'lodash';
import { LoginService } from '../../login/loginComponent/login.service';
import { VisitsAgendaDownloadService } from '../../home/services/visits-agenda-download.service';

@Component({
	moduleId: module.id,
	selector: 'cvm-header-radiofield',
	templateUrl: './header.radiofield.component.html',
	styleUrls: ['./header.radiofield.scss']
})
export class HeaderRadioFieldComponent implements OnInit, OnDestroy{

	@Input() items: string;
	@Input() showShortcutMenu: boolean;
  	@Output() sidemenuCallbackEvent: EventEmitter<string> = new EventEmitter();

	public showMenuItem: boolean = false;
	public menuItems:any = [];
  	private displaySideMenuEventSubscribe;

	constructor(
      		private utilityservice: UtilityServices,
      		private agendasession: VisitsAgendaDownloadService
  ) { }

	ngOnInit() {

	      this.displaySideMenuEventSubscribe = this.agendasession.downloadDisplaySideMenuEventObservable
	          .subscribe(actionText=>{
	            if(actionText === 'visitcontent'){
                  this.showMenuItem = false;
	                this.menuItems = this.utilityservice.getClonedObject(APP_CONFIG.downloadSideMenuItems);
	            }else if(actionText === 'sessioncontent'){
	                this.menuItems = [];
                  this.showMenuItem = false;
	                this.menuItems.push(this.utilityservice.getClonedObject(APP_CONFIG.downloadSideMenuItems[1]));
	            }
	      });
	}


	ngOnDestroy() {
      		if(this.displaySideMenuEventSubscribe){
    			this.displaySideMenuEventSubscribe.unsubscribe();
    		}
	}

	menuItemTap(){
		  this.showMenuItem = !this.showMenuItem;
	}

  performDownloadSideMenu(callback){
      this.sidemenuCallbackEvent.emit(callback);
      this.showMenuItem = false;
  }

}
