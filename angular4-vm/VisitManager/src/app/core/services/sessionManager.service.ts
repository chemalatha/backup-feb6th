import { Injectable } from "@angular/core";
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { AjaxService } from "./AjaxService.service";
import { UtilityServices } from "./utility.service";
import {LoginService} from "../../login/loginComponent/login.service";
import { ErrorConfig } from '../error-handler/errorConfig.service';


@Injectable()
//session timeout= 13min and tokenexpiry timeout = 15 min
export class SessionManagerService {
  private sessiontimeout: number = 780000; // sets the timeout value for calling refresh token by 14min in millisec
  private refreshTokenCalled: boolean;
  public doReset: boolean = false;
  private modalEventCallbackSubscribe;

  constructor(private idle: Idle, 
              private keepalive: Keepalive, 
              private ajaxService: AjaxService,
              private loginService: LoginService, 
              private errorConfig:ErrorConfig, 
              private utilityService:UtilityServices) {}

  init(){
      // sets an idle timeout of 30 minutes i.e, 1800s.
     // this.idle.setIdle(1800);
      // sets an idle timeout of 10 minutes i.e, 600s.
      this.idle.setIdle(600);
      // sets a timeout period of 5 minutes i.e., 300s. after 35 minutes of inactivity, the user will be considered timed out.
      //this.idle.setTimeout(300);
      // sets a timeout period of 3 minutes i.e., 180s. after 13 minutes of inactivity, the user will be considered timed out.
      this.idle.setTimeout(180);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      this.idle.onIdleEnd.subscribe(() => this.onIdleEnd());
      this.idle.onTimeout.subscribe(() => this.onTimeout());
      this.idle.onIdleStart.subscribe(() => this.onIdleStart);
      this.idle.onTimeoutWarning.subscribe((countdown) => this.onTimeoutWarning(countdown));
      
       this.ajaxService.sessionIdle =this.idle;
      let t=setTimeout(() => {
        if(!this.refreshTokenCalled){
          this.doReset = true;
          //need to start the session again
          this.refreshSession();
          this.refreshTokenCalled = false;
        }
        
      },this.sessiontimeout);

      // sets the ping interval to 15 seconds
      this.keepalive.interval(15);

      this.keepalive.onPing.subscribe(() => this.onPing);

      this.reset();

  }

  onIdleStart(){

  }
  onTimeoutWarning(countdown){
    console.log("timeout warning");

    //this.idleState = 'You will time out in ' + countdown + ' seconds!'
  }
  onPing(){
    console.log("on ping");
    
   // this.lastPing = new Date()
  }
  onTimeout(){
    console.log("timeout ");
    //this.idle.stop();
    //do logout here and go to login page
    this.errorConfig.showMessage("9");
    this.modalEventCallbackSubscribe = this.utilityService.modelEventCallbackObservable.subscribe(data => {
          if(data.type=== 'session_expire'){
              this.loginService.logout();
          }
    });
    
    
  }
  //this function will gets called after 30 min of idle and user interrupts between 30th min to 35th min
  onIdleEnd(): void{
    console.log("idle end");
    if(!this.refreshTokenCalled){
        this.doReset = false;
        this.refreshSession();
        this.refreshTokenCalled = true;
    }
  }
  reset() {
    console.log("check");
    this.idle.watch();
  }
   refreshSession():void{
        this.ajaxService.makeJSONRequest('refreshToken', {})
            .subscribe(response => this.refreshTokenSuccess(response),
             error => this.refreshSession );
      
    }
    private refreshTokenSuccess(decodedObject):void{
      if (decodedObject.ResponseStatus === "Success") {
            this.ajaxService.authToken = decodedObject.JsonWebToken;
            this.reset();
            
        } else {
            this.refreshSession();
        }
    }
}