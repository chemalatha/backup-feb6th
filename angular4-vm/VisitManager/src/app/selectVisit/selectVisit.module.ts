import { NgModule } from '@angular/core';
import {GoogleMaps} from '@ionic-native/google-maps';

import { RouterModule } from '@angular/router';
import { SelectVisitComponent } from './selectVisit.component';
import { WelcomeVisitComponent } from './welcomeVisit/welcomeVisit.component';
import { VisitRoutingModule } from './selectVisit-routing.module'
import { SharedModule } from '../shared/shared.module';
import { SelectVisitGuard } from './selectVisit-guard.service';
import { SingleVisitComponent } from './singleVisit/singleVisit.component';
import { MultiVisitComponent } from './multiVisit/multiVisit.component'
import {MomentModule} from 'angular2-moment';
import {PointOfContactComponent} from './pointOfContact/pointOfContact.component';
import {VisitContactServices} from './services/visitContact.service';
import { MeetPresentorComponent } from './meetPresentor/meetPresentor.component';
import { WifiInformationComponent} from './wifiInformation/wifiInformation.component';
import {ImportantLinksComponent} from './importantLinks/importantLinks.component';

@NgModule({
	declarations: [
		SelectVisitComponent,
		MultiVisitComponent,
		SingleVisitComponent,
    		WelcomeVisitComponent,
    		PointOfContactComponent,
    		MeetPresentorComponent,
        WifiInformationComponent,
        ImportantLinksComponent
	],

	imports: [
		VisitRoutingModule,
		SharedModule,
		RouterModule,
		MomentModule
	],
	providers: [
		SelectVisitGuard,
		GoogleMaps,
    		VisitContactServices
	]

})
export class SelectVisitModule{

}