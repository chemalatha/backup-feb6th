import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CheckInProcessRoutingModule } from './checkInProcess-routing.module';
import { CheckInComponent } from './checkInComponent/checkIn.component';
import { CheckInHomeComponent } from './checkInComponent/checkIn-home.component';
import { ScanBarcodeComponent } from './scanBarcodeComponent/scanBarcode.component';
import { CheckInProcessGuard } from './checkInProcess.guard.service';
import { RegisterLaptopComponent } from './registerLaptopComponent/registerLaptop.component';
import {MomentModule} from 'angular2-moment';

@NgModule({
	declarations: [
		CheckInComponent,
    CheckInHomeComponent,
    ScanBarcodeComponent,
    RegisterLaptopComponent
	],

	imports: [
		CheckInProcessRoutingModule,
		SharedModule,
		RouterModule,
    MomentModule
	],
	providers: [
    CheckInProcessGuard
  ]

})
export class CheckInProcessModule{

}
