import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {VisitContactServices} from '../services/visitContact.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {UtilityServices} from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';

@Component({
	moduleId: module.id,
	templateUrl: './pointOfContact.component.html',
	styleUrls: ['./pointOfContact.scss']
})

export class PointOfContactComponent implements OnInit{
  public pointOfContactList: any = [];
  public displayAddContacts = true;

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private visitContact: VisitContactServices,
    private selectVisit: SelectVisitServices,
    private utilityservice: UtilityServices,
    private errorConfig: ErrorConfig){}

	ngOnInit(){
      let obj = {
				title:this._translate.instant('pointOfContact'),
				isHomeBtn: true,
				isBackBtn: false,
				isMenuBtn: true
			};
			this.headerService.setHeaderObject(obj);

      this.visitContact.getPointOfContactDetails(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(pointOfContactInfo => {
            if(pointOfContactInfo){
                this.pointOfContactList = pointOfContactInfo;
                this.getPointOfContactPhotoDetails(this.pointOfContactList);
            }
        });
  }

  getPointOfContactPhotoDetails(pointOfContactList: any[]){
      this.visitContact.getPointOfContactPhotoDetails(this.selectVisit.selectedVisitObj.VisitID, pointOfContactList)
          .subscribe(response=>{
              console.log(response);
          });
  }

  openMailer(emailAddress: string){
      this.selectVisit.displayNativeEmailApp(emailAddress);
  }

  openPhoneDialer(phoneNumber: string){
      this.utilityservice.openPhoneDialer(phoneNumber);
  }

  saveToMobileContact(POCDetails: any){
      let Obj = {
        firstName: POCDetails.FirstName,
        lastName: POCDetails.LastName,
        contactNumber: POCDetails.ContactNo,
        emailID: POCDetails.Email
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
