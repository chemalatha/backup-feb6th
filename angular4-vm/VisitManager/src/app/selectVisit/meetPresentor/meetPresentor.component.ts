import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {VisitContactServices} from '../services/visitContact.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import { UtilityServices } from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';

@Component({
	moduleId: module.id,
  templateUrl: './meetPresentor.component.html',
	styleUrls: ['./meetPresentor.scss']
})

export class MeetPresentorComponent implements OnInit{
  public meetPresentorList: any = [];
	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private visitContact: VisitContactServices,
    private utilityservice: UtilityServices,
    private selectVisit: SelectVisitServices,
    private errorConfig: ErrorConfig) { }

	ngOnInit(){

    let obj = {
      title: this._translate.instant('peopleTitle'),
      isHomeBtn: true,
      isBackBtn: false,
      isMenuBtn: true
    };

    this.headerService.setHeaderObject(obj);

    this.visitContact.getMeetPresentorDetails(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(meetPresentorInfo => {
            if(meetPresentorInfo){
              this.meetPresentorList = meetPresentorInfo;
              this.getMeetPresentorPhotoDetails(this.meetPresentorList);
            }
        });
  }
getMeetPresentorPhotoDetails(meetPresentorList: any[]) {
     this.visitContact.getMeetPresentorPhotoDetails(this.selectVisit.selectedVisitObj.VisitID, meetPresentorList)
       .subscribe(response => {
         console.log(response);
       });
   }

  openMailer(emailAddress: string) {
    this.selectVisit.displayNativeEmailApp(emailAddress);
  }

  openPhoneDialer(phoneNumber: string) {
    this.utilityservice.openPhoneDialer(phoneNumber);
  }

  saveToMobileContact(visitorDetails: any){
      let Obj = {
        firstName: visitorDetails.FirstName,
        lastName: visitorDetails.LastName,
        contactNumber: visitorDetails.ContactNo,
        emailID: visitorDetails.Email
      };
      this.selectVisit.saveContactToDevice(Obj)
        .subscribe(status => {
            if(status){
                this.errorConfig.showMessage("141");
                //this.displayAddContacts = false;
            }else{
                this.errorConfig.showMessage("142");
            }
        });
  }

}
