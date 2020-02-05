import { NgModule } from '@angular/core';
import { ChangePasswordComponent} from './changePasswordComponent/changepassword.component';
import { ContactUsComponent } from './contactUsComponent/contactus.component';
import { VisitDetailsComponent } from './visitDetails/visitDetails.component';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settingsComponent/settings.component';
import { SettingsHomeComponent } from './settingsComponent/settings-home.component';
import { SettingsRoutingModule } from './settings-routing.module'
import { SharedModule } from '../shared/shared.module';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
	declarations: [
		SettingsComponent,
		SettingsHomeComponent,
		ChangePasswordComponent,
		ContactUsComponent,
		VisitDetailsComponent
	],

	imports: [
		SettingsRoutingModule,
		SharedModule,
		RouterModule
	],
	providers: [
		EmailComposer
	]

})
export class SettingsModule{

}