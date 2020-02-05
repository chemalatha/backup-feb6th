import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { SelectVisitServices} from './services/selectVisit.service';
import {HeaderService} from '../shared/headerComponent/header.services';

@Component({
	templateUrl:'./selectVisit.component.html'
})
export class SelectVisitComponent implements OnInit, OnDestroy{

  public headerConfig = {
  		title: this._translate.instant("visitlist"),
  		isHomeBtn: false,
  		isBackBtn: false,
  		isMenuBtn: true
  };

  constructor(
    private selectvisit: SelectVisitServices,
    private _router:Router,
    private _translate:TranslateService,
	  private headerService: HeaderService,
    private route: ActivatedRoute) {}

  ngOnInit(){
	  
  }

  ngOnDestroy(){

  }

  goHome(title){
		this._router.navigate(['/home']);
  };

  goBack(title){
		if(this.route.firstChild.snapshot.url.length && this.route.firstChild.snapshot.url[0].path === 'welcomevisit'){
        this._router.navigate(['/visit/visitlocation']);
    }else{
        this._router.navigate(['/visit']);
    }
  };

}