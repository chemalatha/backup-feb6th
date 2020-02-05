import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/loginComponent/login.service';
import { Observable } from 'rxjs/Observable';
import { VisitsAgendaService} from './services/visits-agenda.service';
import {SelectVisitServices} from '../selectVisit/services/selectVisit.service';

@Injectable()
export class HomeGuard implements CanActivate {

    constructor(
        private _router: Router, 
        private loginservice: LoginService,
        private visitService: VisitsAgendaService,
        private selectvisit: SelectVisitServices) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

}
