import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CheckInComponent } from './checkInComponent/checkIn.component';
import { CheckInHomeComponent } from './checkInComponent/checkIn-home.component';
import { ScanBarcodeComponent } from './scanBarcodeComponent/scanBarcode.component';
import { RegisterLaptopComponent } from './registerLaptopComponent/registerLaptop.component';
import { CheckInProcessGuard } from './checkInProcess.guard.service';

const checkInProcess_routes: Routes = [
	{ path: '', component: CheckInComponent,
	children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
		{ path: 'home', canActivate: [ CheckInProcessGuard], component: CheckInHomeComponent },
    { path: 'scanbarcode', component: ScanBarcodeComponent },
    { path: 'registerlaptop', component: RegisterLaptopComponent}
  ]
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(checkInProcess_routes)
	]

})
export class CheckInProcessRoutingModule{

}
