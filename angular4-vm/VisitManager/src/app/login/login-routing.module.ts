import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './loginComponent/login.component';
import { ForgotPasswordComponent} from './forgotPasswordComponent/forgotpassword.component';
import { LoginGuard } from './loginComponent/login-guard.service';

const login_routes: Routes = [
    { path: 'login', canActivate: [ LoginGuard],component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(login_routes) ]
})
export class LoginRoutingModule{}