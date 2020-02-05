import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import { LogisticsServices } from '../services/logistics.service';
import { SelectVisitServices } from '../../selectVisit/services/selectVisit.service';

@Component({
	moduleId: module.id,
	templateUrl: './visitorGuide.component.html',
	styleUrls: ['./visitorGuide.scss']
})

export class VisitorGuideComponent implements OnInit{
	public displayVisitorGuide: any;
	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
		private logisticsservice: LogisticsServices,
		private selectVisit: SelectVisitServices) { }

	ngOnInit(){
		this.logisticsservice.getVisitorGuidelinesDetails(this.selectVisit.selectedVisitObj.VisitID)
			.subscribe(visitGuideInfo => {
				if (visitGuideInfo) {
					this.displayVisitorGuide = visitGuideInfo.GuidelineDescription;
				}
			});
  }

}
