import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectVisitServices} from '../selectVisit/services/selectVisit.service';
import { CheckInProcessService } from './services/checkInProcess.service';

@Injectable()
export class CheckInProcessGuard implements CanActivate {

    constructor(
        private _router: Router,
        private visitService: SelectVisitServices,
        private _route: ActivatedRoute,
        private checkInProcess: CheckInProcessService) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
            return this.checkInProcess.getVisitorDetails(this.visitService.selectedVisitObj.VisitID)
                .map(data => {
                    if(data && data.IsCheckedIn){
                        this.checkInProcess.IsCheckedIn = true;
                        this._router.navigate(['/checkin/scanbarcode']);
                        return false;
                    }else{
                        this.checkInProcess.IsCheckedIn = false;
                        return true;
                    }
                });

    }

}
