
import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {UtilityServices} from '../../core/services/utility.service';
import * as _ from 'lodash';

@Injectable()
export class AgendaDashboardServices{
	public visitAgendaDashboard:any[]=[];
	constructor(private selectVisit:SelectVisitServices, 
				private ajaxService:AjaxService,
				private utilityservice:UtilityServices){}
	getAgendaDashboardInfo(){
		 return this.ajaxService.getAPICacheData("GetAgendaDashboardInfo", `visitId=${this.selectVisit.selectedVisitObj.VisitID}`)
            .map((response) => {
                if (response && response.ResponseStatus === "Success" && response.VisitAgendaDashboard) {
                    
                    let agendaDashboard = this.utilityservice.getClonedObject(response.VisitAgendaDashboard);
	                let dashboardInfo=[];
	                agendaDashboard = _.groupBy(agendaDashboard, 'StartDate');
	                _.forEach(agendaDashboard, function(value, key){
	                    let obj={
	                      date:key,
	                      VisitAgendaDashboard:value
	                    };
	                    dashboardInfo.push(obj)
	                });
	                console.log("dashboardInfo ",dashboardInfo);
                return dashboardInfo;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
	}
	getVisitorCommentsForDate(AgendaId){
		return this.ajaxService.getAPICacheData("GetDashboardCommentsVisitor", `visitId=${this.selectVisit.selectedVisitObj.VisitID}&agendaId=${AgendaId}`)
            .map((response) => {
                if (response && response.ResponseStatus === "Success" && response.FeedbackDashboard) {
               	 	return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
	}
	SubmitDashboardComments(agendaId,comment){
		let data = {
			VisitID:this.selectVisit.selectedVisitObj.VisitID,
			AgendaID:agendaId,
			VisitorComment:comment
		}
		return this.ajaxService.getAPICacheData("AddDashboardComments",data )
            .map((response) => {
                if (response && response.ResponseStatus === "Success" ) {
               	 	return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
	}

}