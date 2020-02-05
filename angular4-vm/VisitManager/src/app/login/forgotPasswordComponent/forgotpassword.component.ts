import { Component} from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import {Router } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {ForgotPasswordModel} from './forgotpassword.model';

@Component({
      moduleId: module.id,
      templateUrl: "./forgotpassword.component.html",
      styleUrls:["./forgotpassword.scss"]
})
export class ForgotPasswordComponent{

      public title:string = this._translate.instant("Forgot Password");
      public emailAddressVal:string;

      constructor(private ajaxService: AjaxService,
                  private _router:Router,
                  private _translate: TranslateService,) {}

      onSubmitBtnTap(){
          let data = {
            emailid: this.emailAddressVal
          };
          
          this.ajaxService.makeJSONRequest("forgotPassword", data)
          .subscribe(response => this.forgotPasswordSuccess(response),
          error => this.forgotPasswordFailure(error) );
      }
                                                
      forgotPasswordSuccess(response: ForgotPasswordModel){
          if (response && response.ResponseStatus === "Success") {
              this._router.navigate(['/login']);
          }
      }
                                
      forgotPasswordFailure(error){}

      goBack(event){
  		    this._router.navigate(['/login'], {queryParams: {denyAuth: true}});
  	  }

      goHome(event){}
}
