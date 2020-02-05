import { Component, OnInit } from '@angular/core';
import { SelectVisitServices } from '../services/selectVisit.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import { UtilityServices } from '../../core/services/utility.service';
import {VisitContactServices} from '../services/visitContact.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  templateUrl: './wifiInformation.component.html',
  styleUrls: ['./wifiInformation.component.scss']
})
export class WifiInformationComponent implements OnInit {

  public wifiDownloadDetails:any = null;
  public accordionCollapse:true;


  constructor(
    private selectVisit: SelectVisitServices,
    private _translate:TranslateService,
    private _router:Router,
    private headerService: HeaderService,
    private errorConfig: ErrorConfig,
    private utilityService: UtilityServices,
    private visitContact: VisitContactServices
  ) { }

  ngOnInit() {
    this.wifiDownloadDetails = [];
      let obj = {
				title:this._translate.instant('wifiTitle'),
				isHomeBtn: true,
				isBackBtn: false,
				isMenuBtn: true
			};
      this.headerService.setHeaderObject(obj);

      this.visitContact.getWifiDetails(this.selectVisit.selectedVisitObj.VisitID)
          .subscribe(response => {
              this.wifiDownloadDetails = response;
              _.forEach(this.wifiDownloadDetails, function(obj,index){
                obj.collapsible = false;

              });
               console.log("response ",this.wifiDownloadDetails)
          });
         
  }
  beforeChange(e: NgbPanelChangeEvent) {
     let panelId = parseInt(e.panelId.split("ngb-panel-")[1]);
      if (e.nextState === false) {
        this.wifiDownloadDetails[panelId].collapsible=false;
      }else{      
         this.wifiDownloadDetails[panelId].collapsible=true;        
      }
  }
}
