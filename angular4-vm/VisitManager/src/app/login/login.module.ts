import { NgModule } from '@angular/core';
import { LoginComponent } from './loginComponent/login.component';
import { ForgotPasswordComponent} from './forgotPasswordComponent/forgotpassword.component';
import { SharedModule } from '../shared/shared.module';
import { LoginGuard } from './loginComponent/login-guard.service';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent
  ],
  providers: [
    LoginGuard
  ]
})
export class LoginModule {}
