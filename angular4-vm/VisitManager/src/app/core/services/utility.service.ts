import { Injectable, Injector } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Subject} from 'rxjs/Subject';
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var window:any;
@Injectable()
export class UtilityServices{

    public modelEventCallback = new Subject<any>(); // Source
    public modelEventCallbackObservable = this.modelEventCallback.asObservable(); // Stream

    private modelAlertEvent = new Subject<any>();
    public modelAlertEventObservable  = this.modelAlertEvent.asObservable();

    private loaderStatus: Subject<boolean> = new Subject<boolean>();
    public loaderStatusObservable  = this.loaderStatus.asObservable();

    constructor(
      private _translate: TranslateService,
      private injector:Injector,
      private iab: InAppBrowser) {}

    isCurrentLang(lang: string) {
      return lang === this._translate.getDefaultLang();
    }
    
    selectLang(lang: string) {
      this._translate.setDefaultLang('en');
      this._translate.use('en');
    }

    alertMsg (title: string, message: string,type:string){
        let reqObj = {
          title: title,
          message: message,
          type: type
        };
        this.modelAlertEvent.next(reqObj);

    }

    loadSpinner(value:boolean): void{
    	  this.loaderStatus.next(value);
    }

    getClonedObject(origObj: any): any{
        let clonedObj = {};
        clonedObj = JSON.parse(JSON.stringify(origObj));
        return clonedObj;
    }

    convertBase64ToBlob(base64Data: string, contentType: string = 'application/pdf', sliceSize: number = 512){

        let byteCharacters = atob(base64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    };

    isIos(){
        const platform = window.navigator.platform;
        const rgx = new RegExp('iphone|ipad|ipod', 'i');
        return rgx.test(platform);
    };

    isContentTypeBase64Exist(base64Data: string){
        return (/^data:image\//.test(base64Data));
    };

    openMailerByProtocol(emailAddress: string, subject: string = '', body: string = ''){
        let mailLink = 'mailto:'+emailAddress, isSubject = false;
        if(subject){
            mailLink += '?subject='+subject;
            isSubject = true;
        }
        if(body){
            mailLink += (isSubject) ? '&' : '?' + 'body='+body;
        }
        document.location.href = mailLink;
    }

    openPhoneDialer(phoneNumber: string){
        document.location.href = 'tel:'+phoneNumber;
    }
    /**
	 * Create a Image file according to its database64 content only.
	 * 
	 * @param folderpath {String} The folder where the file will be created
	 * @param filename {String} The name of the file that will be created
	 * @param content {Base64 String} Important : The content can't contain the following string (data:image/png[or any other format];base64,). Only the base64 string is expected.
	 */
	savebase64AsImageFile(folderpath,filename,content,contentType){
	    // Convert the base64 string in a Blob
	    var DataBlob = this.convertBase64ToBlob(content,contentType);
    
	    console.log("Starting to write the file :3");
    
	    window.resolveLocalFileSystemURL(folderpath, function(dir) {
	        console.log("Access to the directory granted succesfully");
	        dir.getFile(filename, {create:true}, function(file) {
	            console.log("File created succesfully.");
	            file.createWriter(function(fileWriter) {
	                console.log("Writing content to file");
	                fileWriter.write(DataBlob);
	            }, function(){
	                alert('Unable to save file in path '+ folderpath);
	            });
	        });
	    });
	};

	  openExternalLink(siteUrl: string){
	      let browser = this.iab.create(siteUrl,
	        '_blank',
	        'location=no,' +
	        'toolbar=yes,' +
	        'enableViewportScale=yes,' +
	        'closebuttoncaption=Close,' +
	        'hardwareback=no'
	      );
	      browser.show();
	  }

}