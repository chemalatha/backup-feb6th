import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitsAgendaDownloadService } from '../services/visits-agenda-download.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {UtilityServices} from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';

@Component({
  moduleId: module.id,
	templateUrl:'./download-sessioncontent.component.html',
    styleUrls:['./download-sessioncontent.scss']
})
export class DownloadSessionContentComponent implements OnInit, OnDestroy{

    public downloadSessionContent:any = [];
    private modalEventCallbackSubscribe;
    private downloadSideMenuEventObservable;

    constructor(
        private selectVisit: SelectVisitServices,
        private agendaSession: VisitsAgendaDownloadService,
        private _router:Router,
		    private _translate:TranslateService,
		    private route: ActivatedRoute,
        private utilityservice: UtilityServices,
        private errorConfig: ErrorConfig
    ){

    }

    ngOnInit(){
        //decide displaying the sidemenu option based on user access
        this.agendaSession.emitDownloadDisplaySideMenuEvent('sessioncontent');
        this.fetchLocalSessionContent();
        this.downloadSideMenuEventObservable = this.agendaSession.downloadSideMenuEventObservable
            .subscribe(actionText => {
                if(actionText === 'deleteall'){
                    this.deleteAllVisitAgendaDocuments('sessioncontent');
                }
            });
    }

    private fetchLocalSessionContent(){
      this.agendaSession.getAllDownloadSessionContent(this.selectVisit.selectedVisitObj.VisitID)
          .subscribe(response => {
                if(response){
                    this.downloadSessionContent = response;
                }else{
                    this.downloadSessionContent = [];
                }
            });
    }

    public viewSessionContent(agendaId){
        this.agendaSession.viewSessionContent(this.selectVisit.selectedVisitObj.VisitID, agendaId)
            .subscribe((sessioncontent) => {
                console.log('file opened');
            });
    };

    public removeSessionContent(agendaId){
        this.errorConfig.showMessage("49");
        //added safe check to avoid triggering multiple times
        if(this.modalEventCallbackSubscribe){
            this.modalEventCallbackSubscribe.unsubscribe();
        }
        this.modalEventCallbackSubscribe = this.utilityservice.modelEventCallbackObservable.subscribe(data => {
      			if(data.type=== 'warning'){
                if(data.result==='yes'){
                    this.proceedRemoveSessionContent(agendaId);
          			}else{
          				//no delete
          			}
            }
		    });
    };

    private proceedRemoveSessionContent(agendaId){
        this.utilityservice.loadSpinner(true);
        this.agendaSession.deleteSessionContent(this.selectVisit.selectedVisitObj.VisitID, agendaId)
            .subscribe((removesuccess) => {
                console.log('file removed');
                if(removesuccess){
                    this.fetchLocalSessionContent();
                }
                this.utilityservice.loadSpinner(false);
            });
    };

    public sendSessionContentEmail(agendaId){
        this.agendaSession.getLocalSessionContent(this.selectVisit.selectedVisitObj.VisitID, agendaId)
            .subscribe(sessioncontent => {
                if(sessioncontent){
                    this.selectVisit.displayNativeEmailApp('', '', '', sessioncontent.fileSavePath);
                }
            });
    }

    public deleteAllVisitAgendaDocuments(type: string){
        this.utilityservice.loadSpinner(true);
        this.agendaSession.deleteAllVisitAgendaDocuments(this.selectVisit.selectedVisitObj.VisitID, type)
            .subscribe(response => {
                console.log(response);
                this.utilityservice.loadSpinner(false);
                this.fetchLocalSessionContent();
                //this._router.navigate(['/home/downloads/sessioncontent']);
            });
    }

    ngOnDestroy(){
        if(this.modalEventCallbackSubscribe){
    			  this.modalEventCallbackSubscribe.unsubscribe();
    		}
        if(this.downloadSideMenuEventObservable){
            this.downloadSideMenuEventObservable.unsubscribe();
        }
    }
};
