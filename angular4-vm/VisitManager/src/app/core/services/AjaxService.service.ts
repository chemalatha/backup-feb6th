import { Injectable } from '@angular/core';
import { Http, Response , Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import * as _ from 'lodash';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AjaxConfigService } from './ajaxConfig.service'
import { SessionManagerService } from './sessionManager.service';
import { UtilityServices } from './utility.service';
import { ErrorConfig } from '../error-handler/errorConfig.service';
import { ILocalForageItem, LocalDatabaseService} from '../database/local-database.service';
import { ConnectivityService } from './connectivity.service';
import { APP_CONFIG } from '../../app.config';

@Injectable()
export class AjaxService {
   public authToken = null;
   public sessionIdle = null;
   private offlineCheckBypassUrl = ['GetVisitTheme', 'GetAgendaAnchorDetails', 'GetSessionImage'];

   constructor(
       private _http: Http, 
       private ajaxConfig:AjaxConfigService, 
       private utilityService: UtilityServices, 
       private errorconfig:ErrorConfig,
       private localDB: LocalDatabaseService,
       private connectivity: ConnectivityService) { }
   
   /* @name AjaxService#getURL
     * @methodOf AjaxService
     * @description Used to set the URL for Ajax request and return it
     */
    private getURL(requestId: string):string  {

        if (this.ajaxConfig.mode !== this.ajaxConfig.serverStage[0] && this.ajaxConfig.urlConfiguration[requestId].Production !== "") {
            return this.ajaxConfig.baseURL[this.ajaxConfig.mode] + this.ajaxConfig.urlConfiguration[requestId].Production;
        } else {
            return this.ajaxConfig.baseURL[this.ajaxConfig.serverStage[0]] + this.ajaxConfig.urlConfiguration[requestId].Static;
        }
    }

    /* @name AjaxService#getMethod
     * @methodOf AjaxService
     * @description Used to get the method for Ajax request
     */
    private getMethod(requestId: string):string {
        return this.ajaxConfig.mode == this.ajaxConfig.serverStage[0] || this.ajaxConfig.urlConfiguration[requestId].Production == "" ? 'GET' : this.ajaxConfig.urlConfiguration[requestId].Method;
    }

    /* @name AjaxService#getContentType
     * @methodOf AjaxService
     * @description Used to get content type
     */
    private getContentType(requestId: string): string {
        return requestId == 'Authenticate' ? 'application/x-www-form-urlencoded' : 'application/json';
    }

    /* @name AjaxService#isProtected
     * @methodOf AjaxService
     * @description Used to get web service is protected or not
     */
    private isProtected(requestId:string): string {
        return this.ajaxConfig.mode == this.ajaxConfig.serverStage[0] ? false : this.ajaxConfig.urlConfiguration[requestId].isProtected;
    }

    /* @name AjaxService#getHeader
     * @methodOf AjaxService
     * @description Used to get web service header
     */
    private getHeader(requestId:string):any {
       let me = this;
        //let contentType = this.getContentType(requestId);
        let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Cache-Control': 'no-cache,no-store',
                'token': me.isProtected(requestId) && me.authToken !== null? me.authToken: null
            });
        
        return headers;
    }
    isRequestInprogress(){
      return this.ajaxConfig.requestInProgress;
    }
    /* @name AjaxService#makeJSONRequest
     * @methodOf AjaxService
     * @description expose function to make web service request other than authentication
     */
    makeJSONRequest(requestId:string, data:any, cacheKey:string = ''):Observable<any> {

        let url = this.getURL(requestId);
        let method = this.getMethod(requestId);

        if(APP_CONFIG.apiMode !== 'static' && this.connectivity.isOffline() && (_.indexOf(this.offlineCheckBypassUrl, requestId) === -1)){
            this.errorconfig.showMessage("140");
            return Observable.of(null);
        }

        this.ajaxConfig.requestInProgress++;

        if(data && method === 'POST'){
            data= JSON.stringify(data); // check this later point stringyfy twice
        }
        let request = {
           headers: this.getHeader(requestId),
           method: method,
           body: '',
           params: ''
        };  

        if(method === 'GET'){
            request.params = data;
        }else{
            request.body = data;
        }

        let requestObject = new RequestOptions(request);
        if(this.ajaxConfig.requestInProgress === 1){ //make sure, we call only once
          this.utilityService.loadSpinner(true);
        }

        return this._http.request(url, requestObject)
            .map((response: Response) => this.handleSuccess(response, requestId, cacheKey))
            .catch((error: Response) => this.handleError(error));
    }
  
    private handleError(error: Response):Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        if(this.ajaxConfig){
            this.ajaxConfig.requestInProgress--;
            if(this.ajaxConfig.requestInProgress === 0){
                this.utilityService.loadSpinner(false);
            }
        }
        return Observable.throw('App Server error');
    }

    private handleSuccess(data: Response, requestId: string, cacheKey: string): Observable<any>  {
        this.ajaxConfig.requestInProgress--;
        let jsonResponse = data.json();
        let saveItem: ILocalForageItem;

        if(this.ajaxConfig.requestInProgress === 0){
            this.utilityService.loadSpinner(false);
        }
        if(jsonResponse.ResponseMessage === "" || jsonResponse === 'True'){
            if(jsonResponse.JsonWebToken){
               this.authToken = jsonResponse.JsonWebToken;
            }
            //save the cache data
            if(this.isCacheData(requestId)){
                this.localDB.removeItem(cacheKey); //clear existing cahce data if available
                saveItem = {
                    key: cacheKey,
                    value: jsonResponse
                }
                this.localDB.setItem(saveItem);
            }
            return jsonResponse;
        }else{
            this.errorconfig.showMessage(jsonResponse.ResponseMessage);
        }
       
       return null;
    }

    private isCacheData(requestId: string): Boolean{
        return (requestId && this.ajaxConfig.urlConfiguration[requestId] && this.ajaxConfig.urlConfiguration[requestId].cacheData);
    }

    private getCacheData(requestId: string, cacheKey: string): Observable<any>{
        if(!this.isCacheData(requestId)){
          return Observable.of(null);
        }
        return this.localDB.getItem(cacheKey);
    }

    public getAPICacheData(requestId:string, data:any, cacheKey:string = '', forceHttp: boolean = false): Observable<any>{
        cacheKey = (!cacheKey) ? requestId : cacheKey;
        if(!this.connectivity.isOffline() || APP_CONFIG.apiMode === 'static'){
            return this.makeJSONRequest(requestId, data, cacheKey);
        }else{
            return this.getCacheData(requestId, cacheKey)
                .map((localData) => {
                    if(localData){
                        return localData;
                    }else{
                        this.errorconfig.showMessage('140');
                        return Observable.of(null);
                    }
                })/*
                .mergeMap(responsedata => {
                    if(!responsedata){
                        return this.makeJSONRequest(requestId, data, cacheKey);
                    }
                    return Observable.of(responsedata);
                })*/;
        }
    };
}
