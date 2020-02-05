import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { VisitsAgendaService } from '../services/visits-agenda.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  templateUrl:"./agenda.component.html",
  styleUrls:['./agenda.scss']
})
export class AgendaComponent implements OnInit, OnDestroy{

  public userSelectedAgenda = null;
  public visitThemeImage: string = null;
  public agendaDateWiseGroup: Array<any> = [];
  public visitAgendaDates: any[] = [];
  public activeVisitAgendaDate: string;

  constructor(
    private _router:Router, 
    private visitagenda: VisitsAgendaService,
    private selectvisit: SelectVisitServices,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

      this.visitagenda.getVisitAgendaDatewise(this.selectvisit.selectedVisitObj.VisitID)
          .subscribe(agendaResponse => {
              if(agendaResponse){
                  this.agendaDateWiseGroup = this.visitagenda.groupAgendaToDisplayDate(agendaResponse);
                  this.getVisitAgendaDateDisplay();
                  this.userSelectedAgenda = this.visitagenda.getSelectedVisitAgendaByDate(this.agendaDateWiseGroup);
                  if(this.userSelectedAgenda && this.userSelectedAgenda.length){
                      this.getVisitTheme();
                      this.getAgendaAnchorDetails();
                  }
              }
          });
  };

  public displayVisitAgendaDate(visitDate){
      this.activeVisitAgendaDate = visitDate;
      this.userSelectedAgenda = this.visitagenda.getSelectedVisitAgendaByDate(this.agendaDateWiseGroup, visitDate);
      if(this.userSelectedAgenda && this.userSelectedAgenda.length){
          this.getVisitTheme();
          this.getAgendaAnchorDetails();
      }
  }

  private getVisitAgendaDateDisplay(){
    let me = this;
    me.activeVisitAgendaDate = '';
    _.forEach(this.agendaDateWiseGroup, function(agenda, key){
        if(!me.activeVisitAgendaDate){
            me.activeVisitAgendaDate = key;
        }
				me.visitAgendaDates.push(key);
		});
  }

  ngOnDestroy(): void{
    
  }

  private getVisitTheme(){

    this.visitagenda.getVisitTheme(this.selectvisit.selectedVisitObj.VisitID, this.userSelectedAgenda[0].Date)
      .subscribe(visitTheme => {
        this.visitThemeImage = visitTheme;
      });
  };

  private getAgendaAnchorDetails(){

      this.visitagenda.getAgendaAnchorDetailsList(this.selectvisit.selectedVisitObj.VisitID, this.userSelectedAgenda)
        .subscribe(updatedAgenda => {
          console.log(updatedAgenda);
        });
  };

  public goToSessionDetails(agendaID: string, sessionTitle: string){
      this.visitagenda.agendaActiveSessionTitle = sessionTitle;
      this._router.navigate(['/home/agenda/sessiondetail/home', agendaID]);
  }

  public goToSpeakerDetails(agendaID: string, sessionTitle: string){
      if(agendaID){
        this.visitagenda.agendaActiveSessionTitle = sessionTitle;
        this._router.navigate(['/home/agenda/sessiondetail/speaker', agendaID]);
      }
  }

  public goToSessionFeedbackDetails(agendaID: string, sessionTitle: string){
      if(agendaID){
        this.visitagenda.agendaActiveSessionTitle = sessionTitle;
        this._router.navigate(['/home/agenda/sessiondetail/feedback', agendaID]);
      }
  }

  public goToSessionDownloadsDetails(agendaID: string, sessionTitle: string){
      if(agendaID){
        this.visitagenda.agendaActiveSessionTitle = sessionTitle;
        this._router.navigate(['/home/agenda/sessiondetail/download', agendaID]);
      }
  }
}
