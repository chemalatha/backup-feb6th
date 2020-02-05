import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectVisitServices} from '../services/selectVisit.service';
import {VisitModel} from '../services/visit.model';
import {HeaderService} from '../../shared/headerComponent/header.services';
import { LoginService } from '../../login/loginComponent/login.service';
import {TranslateService} from 'ng2-translate/ng2-translate';
import * as _ from 'lodash';

@Component({
	templateUrl:'./multiVisit.component.html',
	styleUrls:['./multiVisit.scss']
})
export class MultiVisitComponent implements OnInit, OnDestroy{

	public visits: VisitModel;
  public errorMessage:string;
  public username;
  private routesubscribe;

  constructor(
    private selectvisit: SelectVisitServices,
    private _router:Router,
    private headerService: HeaderService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private _translate:TranslateService) {}

  ngOnInit(): void {

    if(this.loginService.userDetails.EmailID){
        this.username = this.loginService.userDetails.EmailID.split('@')[0];
    }

    this.selectvisit.getAllVisits()
      .subscribe(visits => this.successCallback(visits),
                 error => this.errorMessage = <any>error);
    let obj = {
          title:this._translate.instant("chooseVisitTitle"),
          isHomeBtn: false,
          isBackBtn: false,
          isMenuBtn: true
        };

    if(this.headerService.isSideMenuClick){
        obj.isHomeBtn = true;
    }
    this.headerService.setHeaderObject(obj);

  }

  ngOnDestroy() {
    if(this.routesubscribe){
		    this.routesubscribe.unsubscribe();
    }
  }
    
  successCallback(visits) :void{
    this.visits = visits;
  }

  failureCallback(error) :void{
    
  }

  onClickVisit(visit: any){
    this.selectvisit.selectedVisitObj = visit;
    /*if(_.toLower(visit.Country) === 'india'){
        this.headerService.displayVRHamburgerMenu();
    }else{
        this.headerService.hideVRHamburgerMenu();
    }*/
    this._router.navigate(['/visit/visitlocation']);
  }
}