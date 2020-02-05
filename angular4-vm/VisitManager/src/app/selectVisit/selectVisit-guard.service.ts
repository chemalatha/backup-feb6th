import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectVisitServices} from './services/selectVisit.service';


@Injectable()
export class SelectVisitGuard implements CanActivate {

    constructor(private _router: Router,
                private visitService: SelectVisitServices, private _route: ActivatedRoute ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
            //console.log("abc");
            return this.visitService.getAllVisits()
                .map(data => {
                    if(data && data.length){
                        if(data.length === 1){
                            this.visitService.selectedVisitObj = data[0] || null;
                            this._router.navigate(['/visit/visitlocation']);
                            return false;
                        }else{
                            this.visitService.selectedVisitObj = data[0] || null;
                            //redirect to select visit page
                            console.log("check ",this._router.url);
                            return true;
                        }
                    } 
                });
        
    }

}
