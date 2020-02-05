import { Component, OnInit } from '@angular/core';
import { SelectVisitServices } from '../services/selectVisit.service';
import { WelcomeVisitModel} from '../services/welcomeVisit.model';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import { UtilityServices } from '../../core/services/utility.service';

@Component({
  templateUrl: './welcomeVisit.component.html',
  styleUrls: ['./welcomeVisit.component.scss']
})
export class WelcomeVisitComponent implements OnInit {

  public welcomeVisitDetails:any = null;
  public displayFooterSection = true;
  public displayAddContacts = true;

  constructor(
    private selectVisit: SelectVisitServices,
    private _translate:TranslateService,
    private _router:Router,
    private headerService: HeaderService,
    private errorConfig: ErrorConfig,
    private utilityService: UtilityServices
  ) { }

  ngOnInit() {
      let obj = {
				title:this._translate.instant('welcomeScreenTitle'),
				isHomeBtn: false,
				isBackBtn: true,
				isMenuBtn: true
			};

      if(this.headerService.isSideMenuClick){
          obj.isHomeBtn = true;
          obj.isBackBtn = false;
          this.displayFooterSection = false;
      }
			this.headerService.setHeaderObject(obj);

      this.selectVisit.getWelcomeDetails(this.selectVisit.selectedVisitObj.VisitID)
          .subscribe(response => {
              this.welcomeVisitDetails = response;
              //this.checkContactExist(response);
          });
  }

  private checkContactExist(response){
      let displayName = response.VisitorLastName + ' ' + response.VisitorFirstName;
      this.selectVisit.findSavedContact(displayName)
          .subscribe(contactExist => {
              this.displayAddContacts = !contactExist;
          });
  }

  navigateToHomeView(){
      this.headerService.displayVisitHamburgerMenu();
      this._router.navigate(['/home/agenda']);
  }

  openMailer(emailAddress: string){
      this.selectVisit.displayNativeEmailApp(emailAddress);
  }

  openPhoneDialer(phoneNumber: string){
      this.utilityService.openPhoneDialer(phoneNumber);
  }

  saveToMobileContact(welcomeData: any){
      let Obj = {
        firstName: 'indumathi',
        lastName: 'v',
        contactNumber: '+91 9464658433',
        emailID: 'v.indumathi@accenture.com'
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
