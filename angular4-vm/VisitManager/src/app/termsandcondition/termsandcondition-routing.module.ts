import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {TermsAndConditionComponent} from './termsandcondition.component';

const termandcond_routes: Routes = [
    { path: '' , component: TermsAndConditionComponent}
];

@NgModule({
    imports: [ RouterModule.forChild(termandcond_routes) ]
})
export class TermsAndConditionRoutingModule{}