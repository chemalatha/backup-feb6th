import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {VisitContactServices} from '../services/visitContact.service';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import { UtilityServices } from '../../core/services/utility.service';

@Component({
	moduleId: module.id,
  templateUrl: './importantLinks.component.html',
	styleUrls: ['./importantLinks.scss']
})

export class ImportantLinksComponent implements OnInit{

  public newsAndEvents: any = [];
	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService,
    private visitContact: VisitContactServices,
    private utilityservice: UtilityServices,
    private selectVisit: SelectVisitServices) { }

	ngOnInit(){

    let obj = {
      title: this._translate.instant('newsAndEvents'),
      isHomeBtn: true,
      isBackBtn: false,
      isMenuBtn: true
    };

    this.headerService.setHeaderObject(obj);

    this.visitContact.getNewsAndEvents(this.selectVisit.selectedVisitObj.VisitID)
        .subscribe(newsEventsInfo => {
            if(newsEventsInfo){
              this.newsAndEvents = newsEventsInfo;
            }
        });
  };

  openExternalLink(externalUrl: string){
      this.utilityservice.openExternalLink(externalUrl);
  };
   onClickLinks(News: any){
      window.open(News.URL, '_system');
   };
}
