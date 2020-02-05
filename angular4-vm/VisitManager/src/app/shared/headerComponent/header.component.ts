import { Component,Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { APP_CONFIG } from '../../app.config';
import {HeaderService} from './header.services';
import {Router } from '@angular/router';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import {UtilityServices} from '../../core/services/utility.service';
import * as _ from 'lodash';
import {LoginService} from '../../login/loginComponent/login.service';
declare var window: any;

@Component({
		selector:'cvm-header',
		templateUrl:'./header.component.html',
		styleUrls:['./header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  public static hamburgerItems = null;
	@Input() pageTitle: string;
	@Input() isHomeBtn: boolean;
	@Input() isBackBtn: boolean;
	@Input() isMenuBtn: boolean;
	@Output() backButtonEvent: EventEmitter<string> = new EventEmitter();
	@Output() homeButtonEvent: EventEmitter<string> = new EventEmitter();

	public  isNav: boolean = false;
	private headerEventCallbackSubscribe: any = null;
	private modalEventCallbackSubscribe: any = null;
	private hamburgerMenuEventSubscribe: any = null;

	constructor(
		private headerService: HeaderService, 
		private _router: Router,
		private errorConfig: ErrorConfig,
		private utilityService: UtilityServices,
		private loginService: LoginService){}

	ngOnInit(){
    if(!HeaderComponent.hamburgerItems){
        HeaderComponent.hamburgerItems = this.utilityService.getClonedObject(APP_CONFIG.hamburgerItems);
    }
		this.headerEventCallbackSubscribe = this.headerService.eventCallback$.subscribe(data => {
			this.pageTitle = data['title'];
			this.isHomeBtn = data['isHomeBtn'];
			this.isBackBtn = data['isBackBtn'];
			this.isMenuBtn = data['isMenuBtn'];
		});

		this.hamburgerMenuEventSubscribe = this.headerService.hamburgerMenuEventObservable.subscribe(event=>{
      if(event === -1){
          let matchindex = _.findIndex(HeaderComponent.hamburgerItems, function(n) {
              return n.title === APP_CONFIG.hamburgerVRItems.title;
          });
          if(matchindex === -1){
              HeaderComponent.hamburgerItems.splice(1, 0, APP_CONFIG.hamburgerVRItems);
          }
      }else if(event === 0){
          _.remove( HeaderComponent.hamburgerItems, function(n) {
              return n.title === APP_CONFIG.hamburgerVRItems.title;
          });
      } else if(event){
        	_.forEach(HeaderComponent.hamburgerItems, function(item){
    				if(!item.show){
    					item.show = true;
    				}
    			});
      }
		});
	}

  public resetAppDataState(){
      //window.localStorage.removeItem('isAutoLoginEnabled');
      HeaderComponent.hamburgerItems = null;
      this.headerService.isSideMenuClick = false;
  }

  public returnVisitHamburgerMenu(){
      return HeaderComponent.hamburgerItems;
  }

	openNav():void{
		this.isNav = true;
    //disable the map click event, when google map is displayed
		if(this.headerService.googleMapInstance){
        if(window.cordova){
			      this.headerService.googleMapInstance.setClickable(false);
        }else{
            this.headerService.googleMapInstance.clickable = false;
        }
		}
	}

	closeNav(isLogout:boolean = false, sideMenu:boolean = false):void{
		this.isNav = false;
    if(sideMenu){
        this.headerService.isSideMenuClick = sideMenu;
    }
    if(this.headerService.googleMapInstance){
      if(window.cordova){
          this.headerService.googleMapInstance.setClickable(!isLogout);
      }else{
          this.headerService.googleMapInstance.clickable = false;
      }
    }

	}

	goBack(){
		this.backButtonEvent.emit(this.pageTitle);
	}

	goHome(){
		this.homeButtonEvent.emit(this.pageTitle);
	}

	doLogout(){
		this.closeNav(true);
		this.errorConfig.showMessage("6");
		this.modalEventCallbackSubscribe = this.utilityService.modelEventCallbackObservable.subscribe(data => {
			if(data.type=== 'logout'){
          if(data.result==='yes'){
      				//reset the app data state
              this.resetAppDataState();
      				this.loginService.logout().subscribe(()=>{
      					  this._router.navigate(["/login"], {queryParams: {denyAuth: true}});
      				});
      		}else{
      				if(this.headerService.googleMapInstance){
                  if(window.cordova){
      					      this.headerService.googleMapInstance.setClickable(true);
                  }else{
                      this.headerService.googleMapInstance.clickable = false;
                  }

      				}
      		}
      }
		});
	}

	ngOnDestroy(){
		this.headerEventCallbackSubscribe.unsubscribe();
		if(this.modalEventCallbackSubscribe){
			this.modalEventCallbackSubscribe.unsubscribe();
		}
		if(this.hamburgerMenuEventSubscribe){
			this.hamburgerMenuEventSubscribe.unsubscribe();
		}
	}
	
}