import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router } from '@angular/router';
import {HeaderService} from '../shared/headerComponent/header.services';
import { APP_CONFIG } from '../app.config';

@Component({
	moduleId: module.id,
	templateUrl: './logistics.component.html',
	//styleUrls: ['./checkIn.component.scss']
})

export class LogisticsComponent implements OnInit{
	public title: string;
  public logisticsItems: any = APP_CONFIG.logisticsMenuItems;

	constructor(
		private _translate: TranslateService,
		private _router:Router,
		private headerService: HeaderService){}

	ngOnInit(){
      this.title = 'Logistics';
  }

  goBack(event){

  }

  goHome(event){
      this._router.navigate(['/home']);
  }

}
