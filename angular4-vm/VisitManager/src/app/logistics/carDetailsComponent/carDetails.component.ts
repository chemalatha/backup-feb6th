import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {LogisticsServices} from '../services/logistics.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import { UtilityServices } from '../../core/services/utility.service';
import { APP_CONFIG } from '../../app.config';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';

@Component({
	moduleId: module.id,
	templateUrl: './carDetails.component.html',
	styleUrls: ['./carDetails.scss']
})

export class CarDetailsComponent implements OnInit{

  public cabBookingDetails: any = [];

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private logisticsservice: LogisticsServices,
    private selectVisit: SelectVisitServices,
    private utilityService: UtilityServices,
    private errorConfig: ErrorConfig){}

	ngOnInit(){
      this.logisticsservice.getCabBookingDetails(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(cabBookingInfo => {
            if(cabBookingInfo){
                this.cabBookingDetails = cabBookingInfo;
            }
        });
  }

  requestForCab(cabRequestId: number, cityId: number){
      this.logisticsservice.requestForCab(cabRequestId, cityId, this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(saveSuccess => {
            if(saveSuccess){
                this.errorConfig.showMessage("35");
            }
        });

  };

  cancelCabRequest(cabRequestId: number){
      this.logisticsservice.cancelCabRequest(cabRequestId, this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(saveSuccess => {
            if(saveSuccess){
                this.errorConfig.showMessage("35");
            }
        });

  };

}
