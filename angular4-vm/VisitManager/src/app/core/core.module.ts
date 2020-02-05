import { NgModule, ErrorHandler } from '@angular/core';

import { UtilityServices } from './services/utility.service';
import { SessionManagerService } from './services/sessionManager.service';
import { ConnectivityService } from './services/connectivity.service';
import { AjaxService } from "./services/AjaxService.service";
import { ExceptionService } from './error-handler/exception.service';
import { HeaderService } from '../shared/headerComponent/header.services'
import { DefaultBase64Image } from './services/defaultBase64Image';
import { AjaxConfigService } from './services/ajaxConfig.service'
import { ErrorConfig } from './error-handler/errorConfig.service';
import { LocalDatabaseService } from './database/local-database.service';
import { ModalAlertComponent } from './commonComponents/modal/modal.alert.component';
import { SpinnerComponent } from './commonComponents/spinner/spinner.component';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from '../login/loginComponent/login.service';
import {SelectVisitServices} from '../selectVisit/services/selectVisit.service';
import { VisitsAgendaService } from '../home/services/visits-agenda.service';
import { VisitsAgendaDownloadService } from '../home/services/visits-agenda-download.service';
import { CheckInProcessService } from '../checkInProcess/services/checkInProcess.service';

@NgModule({
  
  declarations: [ModalAlertComponent,
                  SpinnerComponent],
  imports: [SharedModule],
  entryComponents: [],
  providers: [
    UtilityServices,
    SessionManagerService,
    ConnectivityService,
    AjaxService,
    AjaxConfigService,
    HeaderService,
    DefaultBase64Image,
    ErrorConfig,
    LocalDatabaseService,
    {provide: ErrorHandler, useClass: ExceptionService},
    LoginService,
    SelectVisitServices,
    VisitsAgendaService,
    VisitsAgendaDownloadService,
    CheckInProcessService
  ],
  exports: [ModalAlertComponent,
            SpinnerComponent]
})
export class CoreModule {}
