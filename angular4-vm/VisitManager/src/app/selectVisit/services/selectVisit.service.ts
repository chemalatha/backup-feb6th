import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash';
import {VisitLocationModel} from './visitLocation.model';
import {AccentureOfficeModel} from './accentureOffice.model';
import {VisitModel, Visit} from './visit.model';
import {WelcomeVisitModel} from './welcomeVisit.model';
import {UtilityServices} from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';
import { Contacts, Contact, ContactField, ContactName, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { CheckInProcessService } from '../../checkInProcess/services/checkInProcess.service';
import { ISaveContactParams } from './selectVisit.interface';

declare var window:any;
@Injectable()
export class SelectVisitServices {
    public selectedVisitObj:Visit = null;
   constructor(
        private ajaxservice: AjaxService,
        private utilityservice: UtilityServices,
        private errorConfig: ErrorConfig,
        private contacts: Contacts,
        private checkInProcess: CheckInProcessService) {}

    getAllVisits(): Observable<any> {
        
       let activevisits = this._getActiveVisit();
       let pastvisits = this._getPastActiveVisit();

       return Observable.forkJoin([activevisits, pastvisits]).map(results => {
            if(results[1]){
                _.forEach(results[1], function(pastVisit, key){
                    pastVisit.isPast = true;
                });
            }

            let finalArray = _.concat(results[0], results[1]);
            return finalArray;
        });
    };

    private _getActiveVisit(): Observable<any> {
        
        return this.ajaxservice.getAPICacheData("getVisits", "")
            .map((response: VisitModel) => {
                if (response && response.ResponseStatus === "Success" && response.Visits) {
                    return response.Visits;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    private _getPastActiveVisit(): Observable<any> {
        
        return this.ajaxservice.getAPICacheData("getPastVisits", "")
            .map((response: VisitModel) => {
                if (response && response.ResponseStatus === "Success" && response.Visits) {
                    return response.Visits;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    getVisitLocationDetails(visitId: string): Observable<any> {
       let visitIdParam = `visitId=${visitId}`;
       let visitLocation = this._getVisitLocation(visitIdParam);
       let accentureOffices = this._getAccentureOffices(visitIdParam);

       return Observable.forkJoin([visitLocation, accentureOffices]).map(results => {
            return results;
        });
    };

    _getVisitLocation(visitIdParam: string): Observable<any>{
        return this.ajaxservice.getAPICacheData("GetVisitLocation", visitIdParam, `GetVisitLocation-${this.selectedVisitObj.VisitID}`)
            .map((response: VisitLocationModel) => {
                if (response && response.ResponseStatus === "Success" && response.VisitLocations) {
                    return response.VisitLocations;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    _getAccentureOffices(visitIdParam: string): Observable<any>{
        return this.ajaxservice.getAPICacheData("GetAccentureOffices", visitIdParam, `GetAccentureOffices-${this.selectedVisitObj.VisitID}`)
            .map((response: AccentureOfficeModel) => {
                if (response && response.ResponseStatus === "Success" && response.AccentureOffices) {
                    return response.AccentureOffices;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    public getWelcomeDetails(visitId: string): Observable<any> {

        return this.ajaxservice.getAPICacheData("GetWelcomeInformation", `visitId=${visitId}`, `GetWelcomeInformation-${visitId}`)
            .map((response: WelcomeVisitModel) => {
                if (response && response.ResponseStatus === "Success") {
                    response = this.utilityservice.getClonedObject(response);
                    if(response.MDPhoto){
                        response.MDPhoto = "data:image/png;base64,"+response.MDPhoto;
                    }
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; })/*
            .mergeMap(welcomeData => {
                return this.checkInProcess.getVisitorDetails(visitId, false)
                  .map(userDetails => {
                      if(userDetails){
                          return Object.assign({}, userDetails, welcomeData);
                      }else{
                          return welcomeData;
                      }
                  });
            })*/;
    };

    public displayNativeEmailApp(emailAddress: string, subject: string='', body: string='', attachment: string = ''){
        let me = this;
        //For Android API 23+, we need to request runtime permissions before callign the mail client app
        if(window.cordova){
            window.cordova.plugins.diagnostic.requestRuntimePermission(function (status) {
                switch (status) {
                    case window.cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                        // Run the plugin
                        window.cordova.plugins.email.isAvailable(
                            function (isAvailable) {
                                if (isAvailable) {
                                  //Now we know we can send
                                  let email = {
                                      to: emailAddress,
                                      subject: subject,
                                      body: body,
                                      isHtml: true,
                                      attachments: ''
                                  };
                                  if(attachment){
                                      email.attachments = attachment;
                                  }else{
                                      delete email.attachments;
                                  }
                                 window.cordova.plugins.email.open(email);
                              }else {
                                //display alert msg
                                me.errorConfig.showMessage("26");
                              }
                            });
                        break;
                    case window.cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
                    case window.cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                    case window.cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                        console.log('Nope!');
                        break;
                }
            }, function (err) {
                me.errorConfig.showMessage("26");
            }, window.cordova.plugins.diagnostic.runtimePermission.GET_ACCOUNTS);
        }else{
          me.utilityservice.openMailerByProtocol(emailAddress, subject, body);
        }
    };

    public saveContactToDevice(contactData: ISaveContactParams): Observable<boolean>{

        if(window.cordova){
            let contact: Contact = this.contacts.create();

            contact.name = new ContactName(null, contactData.lastName, contactData.firstName);
            contact.phoneNumbers = [new ContactField('mobile', contactData.contactNumber)];
            contact.displayName = contactData.lastName + ' ' + contactData.firstName;
            contact.emails = [new ContactField('email', contactData.emailID)];
            return Observable.fromPromise(contact.save().then(
              () => {
                console.log('Contact saved!', contact);
                return true;
              },
              (error: any) => {
                console.error('Error saving contact.', error);
                return false;
              }));
        }else{
            return Observable.of(false);
        }
    };

    public findSavedContact(event: any): Observable<boolean>{

        if(window.cordova){
        		let fields:ContactFieldType[] = ['displayName', 'middleName', 'name', 'nickname'];

        		const options = new ContactFindOptions();
        		options.filter = event;
        		options.multiple = true;
        		options.hasPhoneNumber = true;

        		return Observable.fromPromise(this.contacts.find(fields, options)
            .then(contacts => {
            			return (contacts.length) ? true : false;
        		  },
              (error:any) => {
                  return false;
              }));
        }else{
            return Observable.of(false);
        }
	 }

};
