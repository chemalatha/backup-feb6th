import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MomentModule} from 'angular2-moment';
import { HomeComponent } from './home.component';
import { AgendaComponent } from './agendaComponent/agenda.component';
import { DownloadComponent } from './downloadComponent/download.component';
import { DashboardComponent } from './dashboardComponent/dashboard.component';
import { FeedbackComponent } from './feedbackComponent/feedback.component';
import { HomeRoutingModule } from './home-routing.module'
import { SharedModule } from '../shared/shared.module';
import { HomeGuard } from './home-guard.service';
import { AgendaDashboardServices } from "./services/dashboard.service";
import { DownloadVisitContentComponent } from './downloadComponent/download-visitcontent.component';
import { DownloadSessionContentComponent } from './downloadComponent/download-sessioncontent.component';

@NgModule({
  declarations: [
   HomeComponent,
   AgendaComponent,
   DownloadComponent,
   DashboardComponent,
   FeedbackComponent,
   DownloadVisitContentComponent,
   DownloadSessionContentComponent
  ],
  imports: [
   RouterModule,
   SharedModule,
   HomeRoutingModule,
   MomentModule
  ],
  providers: [
    HomeGuard,
    AgendaDashboardServices
  ]
})
export class HomeModule{

}