import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from '../../app.config';
import { VisitsAgendaDownloadService } from '../services/visits-agenda-download.service';
import { HeaderRadioFieldComponent } from '../../shared/headerRadioFieldComponent/header.radiofield.component';

@Component({
  moduleId: module.id,
	templateUrl:'./download.component.html'
})
export class DownloadComponent implements OnInit{
	public downloadItems = null;
	public showShortcutMenu: boolean = true;
  @ViewChild('headerNavCompRef') headerNavCompRef: HeaderRadioFieldComponent;

	constructor(
    private agendasession: VisitsAgendaDownloadService
  ) { }

    ngOnInit(){
		this.downloadItems = APP_CONFIG.downloadItems;
    }

  triggerDownloadAction(event){
      this.agendasession.emitDownloadUserActionEvent(event);
  }

  isSideMenuVisible(){
      if(this.headerNavCompRef.showMenuItem){
          this.headerNavCompRef.showMenuItem = false;
      }
  }

}
