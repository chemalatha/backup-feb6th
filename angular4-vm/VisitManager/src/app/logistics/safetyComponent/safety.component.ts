import { Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {LogisticsServices} from '../services/logistics.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import { UtilityServices } from '../../core/services/utility.service';
import { APP_CONFIG } from '../../app.config';
import * as _ from 'lodash';
import {NgbModal, NgbActiveModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
	moduleId: module.id,
	templateUrl: './safety.component.html',
	styleUrls: ['./safetyOverview.scss']
})
export class SafetyComponent implements OnInit{

  public safetyOverviewDetails;
  public visitFloorPlanDetails;
  public visitFloorPlanDropdown;
  public visitFloorPlanList;
  private floorPlanGrouped;
  private modalAlertRef;
  public floorPlanImages;

  @ViewChild('safetypopup') safetypopupComp: any;
  private modaloption: NgbModalOptions = {
    backdrop:"static",
    windowClass: "safetyOverviewpopup",
    size:"lg"
  };



	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private logisticsservice: LogisticsServices,
    private selectVisit: SelectVisitServices,
    private utilityService: UtilityServices,
  private modalinstance: NgbModal){}

	ngOnInit(){

      this.logisticsservice.getSafetyOverview(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(safetyOverviewInfo => {
            if(safetyOverviewInfo){
                this.safetyOverviewDetails = safetyOverviewInfo;
            }
        });

      this.logisticsservice.getVisitFloorPlan(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(visitFloorPlanInfo => {
            if(visitFloorPlanInfo){
                this.visitFloorPlanDetails = visitFloorPlanInfo;
                this.displayFloorPlanList();
            }
        });
  }

  private displayFloorPlanList(){
      this.floorPlanGrouped = _.groupBy(this.visitFloorPlanDetails, function(locationObj: any){
				  return locationObj.CityName;
		  });

      this.visitFloorPlanDropdown = _.keys(this.floorPlanGrouped);
      this.visitFloorPlanList = this.floorPlanGrouped[this.visitFloorPlanDropdown[0]];
  }

  public floorPlanCitySelect(cityName: string){
      this.visitFloorPlanList = this.floorPlanGrouped[cityName];
  }

   private opensafetyview(){
    this.modalAlertRef = this.modalinstance.open(this.safetypopupComp, this.modaloption);
     //console.log(CityName);
     //console.log(FloorID);
     //this.viewVisitFloorPlan(CityName, FloorID);
  }

  public viewVisitFloorPlan(cityName: string, floorId: number){
      let floorPlanList = this.floorPlanGrouped[cityName];
      this.logisticsservice.getAllFloorPlanImages(this.selectVisit.selectedVisitObj.VisitID, floorPlanList)
          .subscribe(floorPlanImages => {
              console.log(floorPlanImages);
              this.floorPlanImages = floorPlanImages;
              this.opensafetyview();
          });
  }


}
