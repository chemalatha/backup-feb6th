import { Component} from '@angular/core';
import {Router } from '@angular/router';
import {AjaxService } from '../../core/services/AjaxService.service';
import { SessionManagerService } from '../../core/services/sessionManager.service';
import { UtilityServices } from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import { AESPlugin } from "../../../../plugins/com.aes.security/www/AESPlugin";
import { APP_CONFIG } from '../../app.config';
import { LoginService } from './login.service';
import { LoginModel } from './login.model';
import {HeaderService} from '../../shared/headerComponent/header.services';

declare var window: any;
@Component({
	moduleId: module.id,
	templateUrl: "./login.component.html",
	styleUrls: ["./login.scss"]
})
export class LoginComponent {
	public usernameVal: string;
	public passwordVal: string;
	public autoLogonEnable: boolean;

	constructor(private _router: Router,
		private ajaxservice: AjaxService,
		private utilityService: UtilityServices,
		private errorConfig: ErrorConfig,
		private sessionManager: SessionManagerService,
		private loginService: LoginService,
    private headerService: HeaderService) { }

	ngOnInit(){
    this.autoLogonEnable = (window.localStorage.getItem('isAutoLoginEnabled')) ? window.localStorage.getItem('isAutoLoginEnabled')  : true;
		this.usernameVal = (this.loginService && this.loginService.userDetails && this.loginService.userDetails.EmailID) ? this.loginService.userDetails.EmailID : '';
	}

	onClick() {
		console.log("login button clicked", this.passwordVal);

		if (this.usernameVal && this.passwordVal) {

			this.loginService.authenticate(this.usernameVal, this.passwordVal)
				.subscribe(response => this.loginPostSuccess(response),
				error => this.loginFailure(error));
			
		} else {
			this.errorConfig.showMessage("13");
		}
	}

	onPrivacyStatementClicked() {
		let url: string = APP_CONFIG.privacyLinkURL;
		window.open(url, '_system');
	}

	onForgotPasswordClicked() {
		console.log("forgotpassword clicked");
		this._router.navigate(["/forgotpassword"]);
	}

	loginPostSuccess(response: LoginModel) {
		if (response && response.ResponseStatus === "Success") {
			this.sessionManager.init();
			var autoLoginStatus = this.autoLogonEnable;
			window.localStorage.setItem('isAutoLoginEnabled', autoLoginStatus.toString());

			if (window.cordova && typeof AESPlugin !== "undefined" && autoLoginStatus) {
				AESPlugin.saveUserCredentials(this.usernameVal, this.passwordVal, (msg) => {
					console.log("AESPlugin saveUserCredentials success");
				}, (err) => {
					console.log("AESPlugin saveUserCredentials failure");
				});
			}
      if(!response.IsEulaAccepted){	//redirect to terms and condition if not set
	            		this._router.navigate(['/termsandcondition']);
	        	}else{	//redirect to visits
				this._router.navigate(['/visit']);
			}
		} else {
			this.loginFailure(response);
		}
	}

	loginFailure(error) {
		this._router.navigate(["/login"]);
	}
  
}