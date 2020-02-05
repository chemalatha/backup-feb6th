import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitsAgendaDownloadService } from '../../../services/visits-agenda-download.service';
import { VisitsAgendaService } from '../../../services/visits-agenda.service';
import {SelectVisitServices} from '../../../../selectVisit/services/selectVisit.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {VisitAgendaSessionContentModel} from '../../../services/visitAgendaSessionContent.model';
import {UtilityServices} from '../../../../core/services/utility.service';
import { ErrorConfig } from '../../../../core/error-handler/errorConfig.service';

@Component({
    moduleId: module.id,
	  templateUrl:'./download.component.html',
    styleUrls:['./download.scss']
})
export class SessionDetailDownloadComponent implements OnInit, OnDestroy{

    public sessionTitle: string;
    public agendaSessionDetails:VisitAgendaSessionContentModel;
    private routesubscribe;
    private agendaId: number;
    private modalEventCallbackSubscribe;
    public sessionContentAvailable;

    constructor(
        private selectVisit: SelectVisitServices,
        private agendaSession: VisitsAgendaDownloadService,
        private _router:Router,
		    private _translate:TranslateService,
		    private route: ActivatedRoute,
        private visitAgenda: VisitsAgendaService,
        private utilityservice: UtilityServices,
        private errorConfig: ErrorConfig
    ){

    }

    ngOnInit(){
        this.sessionTitle = this.visitAgenda.agendaActiveSessionTitle;
        this.agendaId = 0;
        this.sessionContentAvailable = false;

        this.routesubscribe = this.route
    			.params
    			.subscribe(params => {
    				// Defaults to 0 if no query param provided.
    				if(params['id']){
                this.agendaId = parseInt(params['id'], 10);
                let selectedAgendaDetails = this.visitAgenda.getAgendaDetailsDataById(this.agendaId);
                this.sessionContentAvailable = (selectedAgendaDetails.IsSessionContentAvailable) ? selectedAgendaDetails.IsSessionContentAvailable: false;
                this.fetchLocalSessionContent();
    				}
    			});
    };

    private fetchLocalSessionContent(){
        this.agendaSession.getLocalSessionContent(this.selectVisit.selectedVisitObj.VisitID, this.agendaId)
            .subscribe(sessioncontent => {
                if(sessioncontent){
                    this.agendaSessionDetails = sessioncontent;
                }else{
                    this.agendaSessionDetails = null;
                }
            });
    }

    public downloadSessionContent(){
        if(this.agendaId){
            this.agendaSession.createContentDirectory(this.selectVisit.selectedVisitObj.VisitID)
              .then(()=>{
                  this.fetchAgendaSessionContent();
              });
        }
    };

    public viewSessionContent(){
        this.agendaSession.viewSessionContent(this.selectVisit.selectedVisitObj.VisitID, this.agendaId)
            .subscribe((sessioncontent) => {
                console.log('file opened');
            });
    };

    public removeSessionContent(){
        this.errorConfig.showMessage("49");
        //added safe check to avoid triggering multiple times
        if(this.modalEventCallbackSubscribe){
            this.modalEventCallbackSubscribe.unsubscribe();
        }
        this.modalEventCallbackSubscribe = this.utilityservice.modelEventCallbackObservable.subscribe(data => {
      			if(data.type=== 'warning'){
                if(data.result==='yes'){
                    this.proceedRemoveSessionContent();
          			}else{
          				//no delete
          			}
            }
		    });
    };

    private proceedRemoveSessionContent(){
        this.utilityservice.loadSpinner(true);
        this.agendaSession.deleteSessionContent(this.selectVisit.selectedVisitObj.VisitID, this.agendaId)
            .subscribe((removeSuccess) => {
                console.log('file removed');
                if(removeSuccess){
                    this.fetchLocalSessionContent();
                }
                this.utilityservice.loadSpinner(false);
            });
    };

    private fetchAgendaSessionContent(){

        this.agendaSession.getAgendaSessionContent(this.selectVisit.selectedVisitObj.VisitID, this.agendaId)
            .subscribe((sessioncontent) => {
                if(sessioncontent){
                    this.agendaSessionDetails = sessioncontent;
                    /*this.agendaSession.openContentFromFileSystem(sessioncontent.fileSavePath, sessioncontent.contentType)
                      .subscribe(()=> console.log('file opened'));*/
                }

            });
    };

    public sendSessionContentEmail(){
        this.agendaSession.getLocalSessionContent(this.selectVisit.selectedVisitObj.VisitID, this.agendaId)
            .subscribe(sessioncontent => {
                if(sessioncontent){
                    this.selectVisit.displayNativeEmailApp('', '', '', sessioncontent.fileSavePath);
                }
            });
    }

    ngOnDestroy(){
        if(this.modalEventCallbackSubscribe){
    			  this.modalEventCallbackSubscribe.unsubscribe();
    		}
    }
}
