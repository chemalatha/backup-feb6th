import { Component, OnInit, OnDestroy } from '@angular/core';
import {AjaxService } from '../core/services/AjaxService.service';
import { LoginService } from '../login/loginComponent/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {HeaderService} from '../shared/headerComponent/header.services';
import { ErrorConfig } from '../core/error-handler/errorConfig.service';
import {UtilityServices} from '../core/services/utility.service';

@Component({
	moduleId: module.id,
	templateUrl: './termsandcondition.component.html',
	styleUrls:['./termsandcondition.scss']
})
export class TermsAndConditionComponent implements OnInit, OnDestroy{

  errorMessage:string;
	public headerConfig;
	public displayFooterSection = true;
	private routesubscribe;
  private modalEventCallbackSubscribe;

	constructor(
		private ajaxService: AjaxService,
		private _router:Router,
		private loginService: LoginService,
		private _translate:TranslateService,
		private route: ActivatedRoute,
    private headerService: HeaderService,
    private errorConfig: ErrorConfig,
    private utilityService: UtilityServices) {}

	ngOnInit(){

      this.headerConfig = {
      		title: this._translate.instant('termsandcondition'),
      		isHomeBtn: false,
      		isBackBtn: false,
      		isMenuBtn: false
    	};

      if(this.headerService.isSideMenuClick){
          this.headerConfig.isHomeBtn = true;
					this.headerConfig.isMenuBtn = true;
					this.displayFooterSection = false;
      }
	};

	ngOnDestroy() {
    if(this.routesubscribe){
        this.routesubscribe.unsubscribe();
    }
    if(this.modalEventCallbackSubscribe){
        this.modalEventCallbackSubscribe.unsubscribe();
    }
	}

	onClickTermcondition(targetText){
		
		if(targetText === "accept"){	//on accept, take to dashboard
			let data={
				accepted:1
			};
			
			this.ajaxService.makeJSONRequest("EulaAcceptance",data)
				.subscribe(data => this.successCallback(data),
				error => this.errorMessage = <any>error);
		}else{	//on reject, take to login
			this._router.navigate(['/login'], {queryParams: {denyAuth: true}});
		}				
	};

    successCallback(response) :void{
          if(this.loginService.userDetails){
      			  this.loginService.userDetails.IsEulaAccepted = true;

              this.errorConfig.showMessage("30");
          		this.modalEventCallbackSubscribe = this.utilityService.modelEventCallbackObservable.subscribe(data => {
          			if(data.type=== 'changepassword_firsttime_warning'){
                    if(data.result==='yes'){
                        this._router.navigate(['/settings/changePassword'], {queryParams: {firstaccess: true}});
                		}else{
                        this._router.navigate(['/visit']);
                    }
                }
              });
          }
  	};

  	failureCallback(response) :void{
		this._router.navigate(['/login']);
  	};

	goHome(title){
		this._router.navigate(['/home']);
	};
 
}