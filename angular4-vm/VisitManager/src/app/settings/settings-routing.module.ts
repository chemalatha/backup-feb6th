import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { SettingsComponent } from './settingsComponent/settings.component';
import { ChangePasswordComponent} from './changePasswordComponent/changepassword.component';
import { SettingsHomeComponent } from './settingsComponent/settings-home.component';
import { ContactUsComponent } from './contactUsComponent/contactus.component';
import { VisitDetailsComponent } from './visitDetails/visitDetails.component';


const settings_routes: Routes = [
	{ path: '', component: SettingsComponent,
	children: [
		{ path: '', redirectTo: 'home', pathMatch: 'full' },
		{ path: 'home', component: SettingsHomeComponent },
		{ path: 'changePassword', component: ChangePasswordComponent },
		{ path: 'contactus', component: ContactUsComponent },
		{ path: 'visitdetails', component: VisitDetailsComponent }
	]}
]

@NgModule({
	imports: [
		RouterModule.forChild(settings_routes)
	]

})
export class SettingsRoutingModule{

}