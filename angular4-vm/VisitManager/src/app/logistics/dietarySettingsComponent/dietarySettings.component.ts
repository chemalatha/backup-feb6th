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
	templateUrl: './dietarySettings.component.html',
	styleUrls: ['./dietarySettings.scss']
})

export class DietarySettingsComponent implements OnInit{

  public displayFoodPreferences: any = [];

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private logisticsservice: LogisticsServices,
    private selectVisit: SelectVisitServices,
    private utilityService: UtilityServices,
    private errorConfig: ErrorConfig){}

	ngOnInit(){
      this.logisticsservice.getFoodPreferenceDetails(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(foodPreferenceInfo => {
            if(foodPreferenceInfo){
                this.displayFoodPreferences = foodPreferenceInfo;
            }
        });

  }

  saveFoodPreferenceDetails(){
      let saveFoodContent = this.utilityService.getClonedObject(this.displayFoodPreferences);
      this.logisticsservice.saveFoodPreferenceDetails(saveFoodContent, this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(saveSuccess => {
            if(saveSuccess){
                this.errorConfig.showMessage("35");
            }
        });

  };

}
