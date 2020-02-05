import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {SelectVisitComponent} from './selectVisit.component';
import { SelectVisitGuard } from './selectVisit-guard.service';
import { SingleVisitComponent } from './singleVisit/singleVisit.component';
import { MultiVisitComponent } from './multiVisit/multiVisit.component'
import { WelcomeVisitComponent } from './welcomeVisit/welcomeVisit.component';
import {PointOfContactComponent} from './pointOfContact/pointOfContact.component';
import {MeetPresentorComponent} from './meetPresentor/meetPresentor.component';
import {WifiInformationComponent} from './wifiInformation/wifiInformation.component';
import {ImportantLinksComponent} from './importantLinks/importantLinks.component';

const visitlist_routes: Routes = [
	{ path: '', component: SelectVisitComponent,
	children: [

		{ path: '', redirectTo: 'multivisit', pathMatch: 'full' },
		{ path: 'multivisit', canActivate: [ SelectVisitGuard], component: MultiVisitComponent },
		{ path: 'visitlocation', component: SingleVisitComponent },
    		{ path: 'welcomevisit', component: WelcomeVisitComponent },
    		{ path: 'pointofcontact', component: PointOfContactComponent },
        	{ path: 'meetpresentor', component: MeetPresentorComponent },
          { path: 'wifiinfo', component: WifiInformationComponent},
          {path: 'implinks', component: ImportantLinksComponent}
	]}

];
@NgModule({
    imports: [ RouterModule.forChild(visitlist_routes) ]
})
export class VisitRoutingModule{}