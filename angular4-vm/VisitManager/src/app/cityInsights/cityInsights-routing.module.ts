import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CityInsightsComponent } from './cityInsights.component';

const cityinsights_routes: Routes = [
    { path: '', component: CityInsightsComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(cityinsights_routes) ]
})
export class CityInsightsRoutingModule{}
