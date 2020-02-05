import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CityInsightsRoutingModule } from './cityInsights-routing.module';
import { CityInsightsComponent } from './cityInsights.component';
import {GoogleMaps} from '@ionic-native/google-maps';

@NgModule({
  imports: [
    SharedModule,
    CityInsightsRoutingModule
  ],
  declarations: [
    CityInsightsComponent
  ],
  providers: [
    GoogleMaps
  ]
})
export class CityInsightsModule {}
