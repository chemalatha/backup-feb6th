import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {CheckInProcessService} from '../services/checkInProcess.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';

@Component({
  moduleId: module.id,
  templateUrl: './scanBarcode.component.html',
  styleUrls: ['./scanBarcode.component.scss']
})

export class ScanBarcodeComponent implements OnInit{
  public title: string;
  public visitorBarcodeDetails: any;
  public FirstLastName: string;
  public dateOfVisit: string;

  constructor(
    private _translate: TranslateService,
    private _router:Router,
    private headerService: HeaderService,
    private checkInService: CheckInProcessService,
    private selectVisit: SelectVisitServices){

  }

  ngOnInit(){
    
    this.visitorBarcodeDetails = "";

      if(this.checkInService.visitorDetails){
         
          this.FirstLastName = this.checkInService.visitorDetails.VisitorFirstName + ' ' + this.checkInService.visitorDetails.VisitorLastName;
          this.dateOfVisit = this.checkInService.visitorDetails.VisitDate;
      }

      this.checkInService.getVisitorScanBarcode(this.selectVisit.selectedVisitObj.VisitID)
          .subscribe((barcodeDetails) => {
              this.visitorBarcodeDetails = barcodeDetails;
          });
  }

}
