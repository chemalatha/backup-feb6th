import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {HeaderComponent} from '../../shared/headerComponent/header.component';

@Component({
	moduleId: module.id,
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.scss']
})
//this.settingHeaderCompRef.resetAppDataState();

export class SettingsComponent implements OnInit, OnDestroy{
	public title: string;
  private routeSubscribe;
  private changePasswordLogoutSubscribe;
  @ViewChild('settingHeaderCompRef') settingHeaderCompRef: HeaderComponent;

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService){}

	ngOnInit(){
		  this.title = this._translate.instant("settingsTitle");
      this.changePasswordLogoutSubscribe = this.headerService.changePasswordLogoutEventObservable.subscribe(data => {
    			  if(data){
                this.settingHeaderCompRef.resetAppDataState();
            }
    	});
	}

	goBack(title){
		  this._router.navigate(['/settings']);
	}

	goHome(title){
		  this._router.navigate(['/home']);
	}

  ngOnDestroy(){
    if(this.routeSubscribe){
        this.routeSubscribe.unsubscribe();
    }
    if(this.changePasswordLogoutSubscribe){
        this.changePasswordLogoutSubscribe.unsubscribe();
    }
  }
}
