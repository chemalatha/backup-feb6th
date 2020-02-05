import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AgendaComponent } from './agendaComponent/agenda.component';
import { DownloadComponent } from './downloadComponent/download.component';
import { DashboardComponent } from './dashboardComponent/dashboard.component';
import { FeedbackComponent } from './feedbackComponent/feedback.component';
import { HomeGuard } from './home-guard.service';
import { DownloadVisitContentComponent } from './downloadComponent/download-visitcontent.component';
import { DownloadSessionContentComponent } from './downloadComponent/download-sessioncontent.component';

import { HomeComponent } from './home.component';
const home_routes: Routes = [
	{ path: '', canActivate: [ HomeGuard], component: HomeComponent,
	children: [
		
		{ path: '', redirectTo: 'agenda', pathMatch: 'full' },
		{ path: 'agenda', component: AgendaComponent },
		{ path: 'downloads', component: DownloadComponent,
      children: [
        { path: '', redirectTo: 'visitcontent', pathMatch: 'full' },
		    { path: 'visitcontent', component: DownloadVisitContentComponent },
        { path: 'sessioncontent', component: DownloadSessionContentComponent }
      ] },
		{ path: 'dashboard', component: DashboardComponent },
		{ path: 'feedback', component: FeedbackComponent },
	]}
	
]

@NgModule({
	imports: [
		RouterModule.forChild(home_routes)
	]

})
export class HomeRoutingModule{

}