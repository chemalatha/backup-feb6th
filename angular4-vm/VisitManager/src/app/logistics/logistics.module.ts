import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LogisticsRoutingModule } from './logistics-routing.module';
import { LogisticsComponent } from './logistics.component';
import { CarDetailsComponent } from './carDetailsComponent/carDetails.component';
import { DietarySettingsComponent } from './dietarySettingsComponent/dietarySettings.component';
import { SafetyComponent } from './safetyComponent/safety.component';
import { TravelGuideComponent } from './travelGuideComponent/travelGuide.component';
import { VisitorGuideComponent } from './visitorGuideComponent/visitorGuide.component';
import { LogisticsServices } from './services/logistics.service';

@NgModule({
	declarations: [
    CarDetailsComponent,
    LogisticsComponent,
    DietarySettingsComponent,
    SafetyComponent,
    TravelGuideComponent,
    VisitorGuideComponent
  ],

	imports: [
		LogisticsRoutingModule,
		SharedModule,
		RouterModule
	],
	providers: [
    LogisticsServices
  ]

})
export class LogisticsModule{

}
