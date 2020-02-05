import { ErrorHandler, Injectable } from '@angular/core';
import { UtilityServices } from '../services/utility.service';
import { environment } from '../../../environments/environment';
import { ErrorConfig } from './errorConfig.service'
/**
 * Exception App Level Handler Service
 */

@Injectable()
export class ExceptionService implements ErrorHandler {

  constructor(private utilityservice: UtilityServices, private errorconfig:ErrorConfig) {}

  handleError(error) {
    //need to disable console.error and enable alert msg in Production mode
    //console.log(environment.production);
    console.error(error);
    //this.errorconfig.showMessage("52");
  }
}