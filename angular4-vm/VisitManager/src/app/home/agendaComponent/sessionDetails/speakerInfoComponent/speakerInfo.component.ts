import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AjaxService } from '../../../../core/services/AjaxService.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { VisitsAgendaService } from '../../../services/visits-agenda.service';
import * as _ from 'lodash';
import { SelectVisitServices } from '../../../../selectVisit/services/selectVisit.service';
import { UtilityServices } from '../../../../core/services/utility.service';
import { ErrorConfig } from '../../../../core/error-handler/errorConfig.service';

@Component({
  moduleId: module.id,
	templateUrl:'./speakerInfo.component.html',
  styleUrls:['./speakerInfo.scss']
})
export class SpeakerInfoComponent implements OnInit{

  public agendaId;
    private routesubscribe;
    public displayAgendaDetails = null;
    public displayAddContacts = true;

    constructor(
		private ajaxService: AjaxService,
		private _router:Router,
		private _translate:TranslateService,
		private route: ActivatedRoute,
    private visitService: VisitsAgendaService,
    private utilityService: UtilityServices,
    private selectVisit: SelectVisitServices,
    private errorConfig: ErrorConfig,) {}

    ngOnInit(){
      this.routesubscribe = this.route
    			.params
    			.subscribe(params => {
    				// Defaults to 0 if no query param provided.
    				if(params['id']){
                this.agendaId = parseInt(params['id'], 10);
                this.fetchAgendaDetails();
    				}
    			});
	  }

    private fetchAgendaDetails(){
          this.visitService.getAgendaDetailsById(this.agendaId)
          .subscribe((detail) => {
              this.displayAgendaDetails = detail;
              console.log(this.displayAgendaDetails);
          });
    }

    openMailer(emailAddress: string){
      this.selectVisit.displayNativeEmailApp(emailAddress);
    }

    openPhoneDialer(phoneNumber: string){
        this.utilityService.openPhoneDialer(phoneNumber);
    }

    saveToMobileContact(speakerData: any){
      let Obj = {
        firstName: speakerData.FirstName,
        lastName: speakerData.LastName,
        contactNumber: speakerData.ContactNo,
        emailID: speakerData.EmailID
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
