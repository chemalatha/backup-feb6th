import { Injectable, Injector } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HeaderService{

    private eventCallback = new Subject<string>(); // Source
    public eventCallback$ = this.eventCallback.asObservable(); // Stream

    private hamburgerMenuEvent = new Subject<boolean|-1|0>(); // Source
    public hamburgerMenuEventObservable = this.hamburgerMenuEvent.asObservable(); // Stream

    private changePasswordLogoutEvent = new Subject<boolean>(); // Source
    public changePasswordLogoutEventObservable = this.changePasswordLogoutEvent.asObservable(); // Stream

    public googleMapInstance = null;
    public isSideMenuClick: boolean = false;

    setHeaderObject(obj){
        if(obj){
            this.eventCallback.next(obj);
        }
    }

    displayVisitHamburgerMenu(){
        this.hamburgerMenuEvent.next(true);
    }

    displayVRHamburgerMenu(){
        this.hamburgerMenuEvent.next(-1);
    }

    hideVRHamburgerMenu(){
        this.hamburgerMenuEvent.next(0);
    }

    setGoogleMapInstance(mapInstance){
        this.googleMapInstance = mapInstance;
    }

    emitChangePasswordLogout(){
        if(this.changePasswordLogoutEvent){
            this.changePasswordLogoutEvent.next(true);
        }
    }

}