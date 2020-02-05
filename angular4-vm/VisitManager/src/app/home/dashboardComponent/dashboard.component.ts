import { Component, OnInit } from '@angular/core';
import { VisitsAgendaService } from '../services/visits-agenda.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import * as _ from 'lodash';
import { AgendaDashboardServices } from "../services/dashboard.service";


@Component({
	templateUrl:'./dashboard.component.html',
	styleUrls:['./dashboard.scss']
})
export class DashboardComponent implements OnInit{

	private isCollapsed:true;
	private currentsession=null;
	public dashboardDateWiseGroup: Array<any> = [];
  	public sessionDates: any[] = [];
	public sessionArray =[];
	public activeSessionDate: string;
	public commentsInfo =null;
	public commentsArray:Array<any> = [];
	

  constructor( private visitagenda: VisitsAgendaService,
			   private selectvisit: SelectVisitServices,
			   private dashboardServices:AgendaDashboardServices){}

	ngOnInit(){
		this.dashboardServices.getAgendaDashboardInfo()
          .subscribe(response => {
          	if(response){

          		this.dashboardDateWiseGroup = response;
                this.getSessionDateDisplay();
                this.getDashboardInfoBasedOnSessionDate(this.sessionDates[0]);
          	}
          });
		
		
		
		console.log("check sessionInfo ", this.sessionArray);

	}
	private getSessionDateDisplay(){
	    let me = this;
	    me.activeSessionDate = '';
	    _.forEach(this.dashboardDateWiseGroup, function(session, key){
	    	
	        if(!me.activeSessionDate){
	            me.activeSessionDate = session.date;
	        }
				me.sessionDates.push(session.date);
			}
		);

  	}
  private displaySessionInfoDate(sessionDate){
  	this.activeSessionDate = sessionDate;
  	this.getDashboardInfoBasedOnSessionDate(this.activeSessionDate);
      
  }
  private getDashboardInfoBasedOnSessionDate(selectedDate){
  	let me =this;
  	_.forEach(this.dashboardDateWiseGroup, function(session,key){
  		if(session.date == selectedDate){
  			me.sessionArray = session.VisitAgendaDashboard;
  		}
  	})
  	_.forEach(this.sessionArray, function(sessionInfo, key){
  		sessionInfo.collapsible=true;
			_.forEach(sessionInfo.AgendaActionItemDashboard, function(item, key1){
				
				if(item.ActionItemDashboardStatus == "Completed"){
					item.iconCls = "icon-statuscomplete";
				}else if(item.ActionItemDashboardStatus == "InProgress"){
					item.iconCls = "icon-statusongoing";
				}else{
					item.iconCls = "icon-statusnotstarted";
				}
			});

		});



  }
  toggleComments(agentId){
  	let me=this;
  	_.forEach(this.sessionArray, function(sessionInfo, key){
  		if(sessionInfo.AgendaID == agentId){
  			if(sessionInfo.collapsible){
  				sessionInfo.collapsible=false;
  				me.getComments(sessionInfo.AgendaID);
  			}else{
  				sessionInfo.collapsible=true;
  			}
  			
  		}
  	});
  }
  getComments(agentId){
  	this.dashboardServices.getVisitorCommentsForDate(agentId)
          .subscribe(response => {
          	if(response){
          		this.commentsInfo =response;
          		this.commentsInfo.addCommentsTextField = false;
          		this.commentsArray = this.commentsInfo.FeedbackDashboard;
          		_.forEach(this.commentsArray, function(comment,index){
          			let name = comment.VisitorName.split(" ");
          			 comment.firstName = name[0];
          			 comment.lastName = name[1];

          		});  
          	}
          });

  }
  
  addComments(e){

  	console.log(e.target.parentElement.parentElement.children[1].children[2]);
  	if(e.target.parentElement.children[0].parentElement.parentElement.children[1].classList.contains("commentsCollapse")){
  		e.target.parentElement.children[0].click();
  	}	
  	e.target.parentElement.nextElementSibling.children[2].classList.remove('display-none');
  	//console.log("textarea ",e.target.parentElement.nextElementSibling.children[2].children[1]);
  	e.target.parentElement.nextElementSibling.children[2].children[0].focus();
  }
  submitComment(e, agendaId){
  	console.log(e.target.previousElementSibling.value);
  	let visitorComment =  e.target.previousElementSibling.value;
  	this.dashboardServices.SubmitDashboardComments(agendaId,visitorComment)
  	.subscribe(response => {
          	if(response){

          		//display none for text area
          	}
          });
  }

}