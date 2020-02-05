import { Component, OnInit} from '@angular/core';
import {ImageGalleryService} from '../services/imageGallery.services';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {HeaderService} from '../../shared/headerComponent/header.services';
import { UtilityServices} from '../../core/services/utility.service';
import * as _ from 'lodash';
declare var window: any;
import { Observable } from 'rxjs/Observable';

@Component({
	templateUrl:'./thumbnail.component.html',
	styleUrls:['./thumbnail.scss']
})

export class ThumbnailComponent implements OnInit{

  public imageThumbnailObj:any =[];
	public imagetoSave:any=[];

	constructor(private imageGalleryService:ImageGalleryService,
				private selectVisit:SelectVisitServices,
			    private _router:Router,
			    private _translate:TranslateService,
			    private headerService:HeaderService,
			    private utilityservices:UtilityServices){}

	ngOnInit(){
  		  let obj = {
            title:this._translate.instant("welcomeImage"),
            isHomeBtn: false,
            isBackBtn: true,
            isMenuBtn: true
        };
        this.headerService.setHeaderObject(obj);
        this.imageGalleryService.imageId = "";
        this.imageGalleryService.imageIdList = [];

    		this.imageGalleryService.getPhotoList(this.selectVisit.selectedVisitObj.VisitID)
    		.subscribe(response => {
        			//this.imageThumbnailObj=response.VisitGalleryThumbnails;
        			let me = this;
        			let data = response.VisitGalleryThumbnails;

        			_.forEach(data,function(obj,index){
        				  obj.selected = false;
        				  me.imageThumbnailObj.push(obj);
        			});
    			    console.log("test ",this.imageThumbnailObj)

    		},error => {console.log("error 1",error)});
	}
	onLongPressEvent(e, imageId){

        console.log(this.imageThumbnailObj);
        let me = this;
        _.forEach(this.imageThumbnailObj, function(obj, index){
          	if(obj.ImageID === imageId){
            		if(obj.selected){
              			obj.selected = false;
              			me.imagetoSave.filter(function(item) {
          					    return item !== imageId;
          					});
            		}else{
              			obj.selected = true;
              			me.imagetoSave.push(imageId);
            		}
          	}
        });

	};

	gotoPreview(imageId){
	  this.imageGalleryService.imageId = imageId;
	  this._router.navigate(['/gallery/preview']);
	};

	goBack(e){
		console.log("back button clicked")
	}
	saveimage(){
    		console.log("save function start");
    		let me = this, fileDirectory;
    		if(window.cordova !== undefined){
            if(this.utilityservices.isIos()){
                fileDirectory = window.cordova.file.documentsDirectory;
            }else{
                fileDirectory = window.cordova.file.externalRootDirectory;
            }
            let contentType = "image/png";
    			_.forEach(this.imagetoSave,function(imageId, index){
        				me.getBase64ValueForSelectedImageId(imageId)
                  .subscribe(base64File =>{
                      if(base64File){
                          let filename = "image_" + new Date().getTime() + '.png';
                  				console.log("before calling save functionality");
                  				me.utilityservices.savebase64AsImageFile(fileDirectory, filename, base64File, contentType);
                      }
                  });
    			});
    		}

	}
	getBase64ValueForSelectedImageId(imageId): Observable<any>{
    		let me = this;
    		return this.imageGalleryService.previewImage(this.selectVisit.selectedVisitObj.VisitID, imageId)
    			.map(response => {
      				let dataURL = response.Image;
      				let index = dataURL.indexOf(",");
    	        dataURL = dataURL.substring(index + 1, dataURL.length);
    				  return dataURL;
    			}, error => {return null;});
	}

	cancelSelectedImages(){
		  let me = this;
      _.forEach(this.imageThumbnailObj, function(obj, index){
          obj.selected = false;
      });
      me.imagetoSave = [];
	}

}
