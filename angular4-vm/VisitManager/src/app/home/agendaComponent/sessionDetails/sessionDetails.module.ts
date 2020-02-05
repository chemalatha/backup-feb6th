import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MomentModule} from 'angular2-moment';
import { SharedModule } from '../../../shared/shared.module';
import {  ReactiveFormsModule }  from '@angular/forms';
import { SessionDetailDownloadComponent } from './downloadComponent/download.component';
import { SessionDetailFeedbackComponent } from './feedbackComponent/feedback.component';
import { SessionDetailsComponent } from './sessionDetails.component';
import { SpeakerInfoComponent } from './speakerInfoComponent/speakerInfo.component';
import { SessionDetailHomeComponent } from './homeComponent/home.component';
import { SessionDetailsRoutingModule } from './sessionDetails-routing.module';

@NgModule({
  declarations: [
    SessionDetailHomeComponent,
   SessionDetailDownloadComponent,
   SessionDetailFeedbackComponent,
   SessionDetailsComponent,
   SpeakerInfoComponent
  ],
  imports: [
   RouterModule,
   SharedModule,
   ReactiveFormsModule,
   MomentModule,
   SessionDetailsRoutingModule
  ],
  providers: [
  ]
})
export class SessionDetailsModule{

}
