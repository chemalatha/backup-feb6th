import { NgModule } from '@angular/core';

import { TermsAndConditionComponent } from './termsandcondition.component';
import { SharedModule } from '../shared/shared.module';

import { TermsAndConditionRoutingModule } from './termsandcondition-routing.module';

@NgModule({
  
  declarations: [
   TermsAndConditionComponent
  ],
  imports: [
    TermsAndConditionRoutingModule,
    SharedModule
  ],
  providers: []
})
export class TermsAndConditionModule {}
