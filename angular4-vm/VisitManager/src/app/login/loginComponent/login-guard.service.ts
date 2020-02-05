import { Injectable  } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AESPlugin } from "../../../../plugins/com.aes.security/www/AESPlugin";
import { AjaxService } from '../../core/services/AjaxService.service';
import { LoginService } from './login.service';
import { SessionManagerService } from '../../core/services/sessionManager.service';
import { Observable } from 'rxjs/Observable';
import { ConnectivityService } from '../../core/services/connectivity.service';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var window: any;
@Injectable()
export class LoginGuard implements CanActivate  {

    constructor(
        private _router: Router,
        private ajaxservice: AjaxService,
        private sessionManager: SessionManagerService,
        private loginService: LoginService,
        private connectivity: ConnectivityService,
        private splashScreen: SplashScreen) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {

        if(route.queryParams['denyAuth']){
            this.hideSplashScreen();
            return true;
        }else{
            return this.processLoginGuard();
        }
    }

    private hideSplashScreen(){
        if (window.cordova && this.splashScreen){
            this.splashScreen.hide();
        }
    }

    private processLoginGuard(): boolean{
        var me = this, reponseStatus;
        let autoLogon = window.localStorage.getItem('isAutoLoginEnabled');

        if (autoLogon && autoLogon === "true" && this.connectivity.isOnline() && window.cordova && typeof AESPlugin !== "undefined") {
            // start a new navigation to redirect to dashboard page
            AESPlugin.retrieveUserCredentials(function (response) {
                me.hideSplashScreen();
                var data = JSON.parse(response);
                let userName = data.username;
                let userPassword = data.password;
                me.loginService.authenticate(userName, userPassword).subscribe((response) => {
                    if (response && response.ResponseStatus === "Success") {
                        me.sessionManager.init();
                        if(!response.IsEulaAccepted){	//redirect to terms and condition if not set
                            me._router.navigate(['/termsandcondition']);
                        }else{	//redirect to visits
                            me._router.navigate(['/visit']);
                        }
                        return false;
                    } else {
                        return true;
                    }
                });
            }, function (err) {
                me.hideSplashScreen();
                return true;
            });
        } else {
            me.hideSplashScreen();
            return true;
        }
    }

}
