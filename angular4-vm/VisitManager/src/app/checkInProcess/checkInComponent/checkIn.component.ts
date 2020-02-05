import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router} from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import { APP_CONFIG } from '../../app.config';
import { CheckInProcessService } from '../services/checkInProcess.service';
import {UtilityServices} from '../../core/services/utility.service';

@Component({
	moduleId: module.id,
	templateUrl: './checkIn.component.html',
	styleUrls: ['./checkIn.component.scss']
})

export class CheckInComponent implements OnInit, OnDestroy{
	public title: string;
	public checkinItems = null;
  private checkInEventsubscribe;

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private checkInProcess: CheckInProcessService,
    private utilityservice: UtilityServices){}

	ngOnInit(){
		this.title = this._translate.instant('checkInProcessText');
		this.checkinItems = this.utilityservice.getClonedObject(APP_CONFIG.checkInItems);

    if(!this.checkInProcess.IsCheckedIn){
        this.checkinItems[0].isActive = true;
    }else{
        this.checkinItems[1].isActive = true;
        this.checkinItems[2].isActive = true;
    }

    this.checkInEventsubscribe = this.checkInProcess.checkInCompleteEventObservable
        .subscribe(checkindone => {
              if(checkindone){
                  this.checkinItems[0].isActive = false;
                  this.checkinItems[1].isActive = true;
                  this.checkinItems[2].isActive = true;
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
      if(this.checkInEventsubscribe){
          this.checkInEventsubscribe.unsubscribe();
      }
  }
}
