import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LogisticsComponent } from './logistics.component';
import { CarDetailsComponent } from './carDetailsComponent/carDetails.component';
import { DietarySettingsComponent } from './dietarySettingsComponent/dietarySettings.component';
import { SafetyComponent } from './safetyComponent/safety.component';
import { TravelGuideComponent } from './travelGuideComponent/travelGuide.component';
import { VisitorGuideComponent } from './visitorGuideComponent/visitorGuide.component';

const logistics_routes: Routes = [
	{ path: '', component: LogisticsComponent,
	children: [
    { path: '', redirectTo: 'cardetail', pathMatch: 'full' },
		{ path: 'cardetail',  component: CarDetailsComponent },
    { path: 'dietary', component: DietarySettingsComponent },
    { path: 'safety', component: SafetyComponent},
    { path: 'travelguide', component: TravelGuideComponent},
    { path: 'visitorguide', component: VisitorGuideComponent}
  ]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(logistics_routes)
	]

})
export class LogisticsRoutingModule{

}
