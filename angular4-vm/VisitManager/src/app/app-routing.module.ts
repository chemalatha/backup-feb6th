import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const app_routes: Routes = [
    { path: 'termsandcondition' , loadChildren: 'app/termsandcondition/termsandcondition.module#TermsAndConditionModule'},
    { path: 'settings' , loadChildren: 'app/settings/settings.module#SettingsModule'},
    { path: 'home' , loadChildren: 'app/home/home.module#HomeModule'},
    { path: 'home/agenda/sessiondetail' , loadChildren: 'app/home/agendaComponent/sessionDetails/sessionDetails.module#SessionDetailsModule'},
    { path: 'visit' , loadChildren: 'app/selectVisit/selectVisit.module#SelectVisitModule'},
    { path: 'checkin' , loadChildren: 'app/checkInProcess/checkInProcess.module#CheckInProcessModule'},
    { path: 'logistics' , loadChildren: 'app/logistics/logistics.module#LogisticsModule'},
    { path: 'gallery' , loadChildren: 'app/imageGallery/imageGallery.module#ImageGalleyModule'},
    { path: 'cityinsights' , loadChildren: 'app/cityInsights/cityInsights.module#CityInsightsModule'},
    { path: '', pathMatch:'full', redirectTo: '/login' },
    { path: '**', pathMatch:'full', redirectTo: '/login' }
];

@NgModule({
    imports: [ RouterModule.forRoot(app_routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}