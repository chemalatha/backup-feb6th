import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AjaxService } from '../../../../core/services/AjaxService.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { VisitsAgendaService } from '../../../services/visits-agenda.service';
import { SelectVisitServices } from '../../../../selectVisit/services/selectVisit.service';
import * as _ from 'lodash';
import { ILocalForageItem, LocalDatabaseService } from '../../../../core/database/local-database.service';
import { ErrorConfig } from '../../../../core/error-handler/errorConfig.service';
import { UtilityServices } from '../../../../core/services/utility.service';
@Component({
  moduleId: module.id,
	templateUrl:'./home.component.html',
 	 styleUrls:['./home.component.scss'],
})
export class SessionDetailHomeComponent implements OnInit, OnDestroy{

    public agendaId;
    private routesubscribe;
    public displayAgendaDetails = null;
  public modalEventCallbackSubscribe = null;
     constructor(
		private ajaxService: AjaxService,
		private _router:Router,
		private _translate:TranslateService,
		private route: ActivatedRoute,
    private visitService: VisitsAgendaService,
    private selectVisit: SelectVisitServices,
  private localDB: LocalDatabaseService,
  private errorConfig: ErrorConfig,
  private utilityservice: UtilityServices) { }

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

    ngOnDestroy(){
        if(this.routesubscribe){
            this.routesubscribe.unsubscribe();
        }
    }

    addNotes(){
      this.visitService.submitVisitRemarks(this.selectVisit.selectedVisitObj.VisitID, this.agendaId, this.displayAgendaDetails.VisitorRemark)
      .subscribe((response)=>{
        if (response){
          this.updateOfflineData(this.agendaId);
        }
      });
    }

    updateOfflineData(agendaId) {
    let offlineAgendaData, currentAgendaIndex, visitId = this.selectVisit.selectedVisitObj.VisitID;

      this.visitService.getLocalVisitAgendaDatewise(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe((offlineAgendaDateWise)=>{
      offlineAgendaData = offlineAgendaDateWise;
    currentAgendaIndex = _.findIndex(offlineAgendaData.VisitAgenda, function(item) { return item.AgendaID === agendaId; });
  offlineAgendaData.VisitAgenda[currentAgendaIndex].VisitorRemark = this.displayAgendaDetails.VisitorRemark;
  let saveItem: ILocalForageItem = {
    key: `GetVisitAgendaDatewise-${visitId}`,
    value: offlineAgendaData
  };
  this.localDB.setItem(saveItem);
               });
    
    }

  emailNotes(){
    this.errorConfig.showMessage("53");

  if(this.modalEventCallbackSubscribe) {
    this.modalEventCallbackSubscribe.unsubscribe();
  }
        this.modalEventCallbackSubscribe = this.utilityservice.modelEventCallbackObservable.subscribe(data => {
      if (data.type === 'warningOkCancel') {
      if (data.result === 'ok') {
    this.selectVisit.displayNativeEmailApp('', '', this.displayAgendaDetails.VisitorRemark);
    } else {
      //no delete
    }
  }
});
  }
}
