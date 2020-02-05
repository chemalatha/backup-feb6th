import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionDetailDownloadComponent } from './downloadComponent/download.component';
import { SessionDetailFeedbackComponent } from './feedbackComponent/feedback.component';
import { SessionDetailsComponent } from './sessionDetails.component';
import { SpeakerInfoComponent } from './speakerInfoComponent/speakerInfo.component';
import { SessionDetailHomeComponent } from './homeComponent/home.component';

const sessiondetails_routes: Routes = [
  { path: '', component: SessionDetailsComponent,
	children: [
    { path: '', redirectTo: 'home/:id', pathMatch: 'full' },
  	{ path: 'download/:id', component: SessionDetailDownloadComponent },
  	{ path: 'feedback/:id', component: SessionDetailFeedbackComponent },
  	{ path: 'home/:id', component: SessionDetailHomeComponent },
  	{ path: 'speaker/:id', component: SpeakerInfoComponent }
]}

];

@NgModule({
	imports: [
		RouterModule.forChild(sessiondetails_routes)
	]

})
export class SessionDetailsRoutingModule{

}
