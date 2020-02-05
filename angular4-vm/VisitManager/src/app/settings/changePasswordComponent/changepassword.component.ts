import { Component, OnInit, OnDestroy } from '@angular/core';
import {HeaderService} from '../../shared/headerComponent/header.services';
import { AjaxService } from '../../core/services/AjaxService.service';
import {ActivatedRoute, Router } from '@angular/router';
import {LoginService} from '../../login/loginComponent/login.service';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import {CustomFormValidators} from '../../core/services/customFormValidators';
import {UtilityServices} from '../../core/services/utility.service';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
	templateUrl:'./changepassword.component.html',
	styleUrls:['./changepassword.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy{

    public changepasswordGroupForm: FormGroup;
    private routeSubscribe;

    constructor(
        private headerService: HeaderService,
        private ajaxService: AjaxService,
        private _router: Router,
        private loginService: LoginService,
        private formBuilder: FormBuilder,
        private utilityService: UtilityServices,
        private _translate: TranslateService,
        private route: ActivatedRoute
    ){}

    ngOnInit(){
        let obj = {
            title:this._translate.instant("change_password_first_time"),
            isHomeBtn: false,
            isBackBtn: true,
            isMenuBtn: true
        }

        this.routeSubscribe = this.route
            .queryParams
            .subscribe(params => {
                if(params['firstaccess']){
                    obj.isBackBtn = false;
                    obj.isMenuBtn = false;
                }
                this.headerService.setHeaderObject(obj);
            });

         this.changepasswordGroupForm = this.formBuilder.group({
             currentPassword: ['',[
                  Validators.required,
                  Validators.pattern('[a-zA-Z0-9]{4,15}')
             ]],
            newPassword: ['',[
                  Validators.required,
                  Validators.pattern('[a-zA-Z0-9]{4,15}')
            ]],
             confirmPassword: ['',[
                  Validators.required,
                  Validators.pattern('[a-zA-Z0-9]{4,15}')
             ]]
         }, {validator: CustomFormValidators.passwordMatcher});
    }
    onSubmitBtnTap(values){

        let data = {
            EmailID: this.loginService.userDetails.EmailID,
            NewPassword: values.newPassword
        };
        let authData = JSON.stringify(data);

        this.ajaxService.makeJSONRequest("changePassword",authData)
        .subscribe(response => this.changePasswordSuccess(response),
        error => this.changePasswordFailure(error) );
    }

    changePasswordSuccess(response){
        if (response && response.ResponseStatus === "Success") {
            this.headerService.emitChangePasswordLogout();
            this._router.navigate(['/login'], {queryParams: {denyAuth: true}});
        }
    }

    changePasswordFailure(error){

    }

    ngOnDestroy(){

    }

}
