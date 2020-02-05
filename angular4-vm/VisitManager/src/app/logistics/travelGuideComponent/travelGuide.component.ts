import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {LogisticsServices} from '../services/logistics.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';

@Component({
	moduleId: module.id,
	templateUrl: './travelGuide.component.html',
	styleUrls: ['./travelGuide.scss']
})

export class TravelGuideComponent implements OnInit{
  public displayTravelGuide: any;

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private logisticsservice: LogisticsServices,
    private selectVisit: SelectVisitServices){}

	ngOnInit(){

      this.logisticsservice.getTravelGuideDetails(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(travelGuideInfo => {
            if(travelGuideInfo.length){
                this.displayTravelGuide = travelGuideInfo[0];
            }
        });
  }

}
