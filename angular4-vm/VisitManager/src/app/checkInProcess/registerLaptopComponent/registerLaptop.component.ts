import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {CheckInProcessService} from '../services/checkInProcess.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';

@Component({
	moduleId: module.id,
	templateUrl: './registerLaptop.component.html',
	//styleUrls: ['./checkIn.component.scss']
})

export class RegisterLaptopComponent implements OnInit{
	public title: string;
  public visitorAssetDetails: any;

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private checkInService: CheckInProcessService,
    private selectVisit: SelectVisitServices){}

	ngOnInit(){

      this.checkInService.getVisitorAssetDetails(this.selectVisit.selectedVisitObj.VisitID)
          .subscribe((assetDetails) => {
              this.visitorAssetDetails = assetDetails;
          });
  }

}
