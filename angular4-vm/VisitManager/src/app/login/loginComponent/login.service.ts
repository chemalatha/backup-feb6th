import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from './login.model';

@Injectable()
export class LoginService {
    public userDetails = null;

    constructor(
        private ajaxservice: AjaxService) {}

    authenticate(userName: string, userPassword: string): Observable<any> {
        let data = {
            EmailID: userName,
            Password: userPassword
        };
        let authData = JSON.stringify(data);
    
        return this.ajaxservice.makeJSONRequest("Authenticate", authData)
            .map((response: LoginModel) => {
                if (response && response.ResponseStatus === "Success") {
                    this.userDetails = response;
                    this.userDetails.EmailID = userName;
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    }

    logout(): Observable<any> {
        let data = "";
        
        return this.ajaxservice.makeJSONRequest("Logout", data)
            .map((response) => {
                if (response) {
                    this.ajaxservice.authToken=null;
                    this.ajaxservice.sessionIdle.stop();
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    }
}
