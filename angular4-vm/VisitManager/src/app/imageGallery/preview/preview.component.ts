import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {ImageGalleryService} from '../services/imageGallery.services';
import * as _ from 'lodash';

@Component({
	templateUrl:'./preview.component.html',
	styleUrls:['./preview.scss']
})
export class PreviewComponent implements OnInit {

  public previewImages = [];
	public currentImageId;
  // constant for swipe action: left or right
  private SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  public isFirst;
  public isLast;
	constructor(
      private headerService: HeaderService,
			private _translate: TranslateService,
			private imageGalleryService: ImageGalleryService,
			private selectVisit: SelectVisitServices){}

	ngOnInit(){
		  let obj = {
          title:this._translate.instant("preview"),
          isHomeBtn: false,
          isBackBtn: true,
          isMenuBtn: true
      };
      this.headerService.setHeaderObject(obj);
      this.getPreviewImages(this.imageGalleryService.imageId, true);
      this.isFirst = false;
      this.isLast = false;
	}

    getPreviewImages(imageId, visiblity){
        	this.currentImageId = imageId;
        	let me = this;
        	let imageIdAvailable = false;
        	_.forEach(this.previewImages, function(key, value){
      				if(key.imageId === me.currentImageId){
      					  imageIdAvailable = true;
                  key.visible = true;
      				}else{
                  key.visible = false;
              }
    			});

        	if(!imageIdAvailable){
      	    	this.imageGalleryService.previewImage(this.selectVisit.selectedVisitObj.VisitID, imageId)
          			.subscribe(response => {
            				let obj = {
            					imageId: imageId,
            					image: response.Image,
            					visible: visiblity
            				};
          				  this.previewImages.push(obj);

          			}, error => {console.log("error 1", error)});
		      }

    }
    // action triggered when user swipes
    swipe( action = this.SWIPE_ACTION.RIGHT) {
    	    let avatars = this.imageGalleryService.imageIdList;
          let currentIndex = avatars.indexOf(this.currentImageId);
          let nextIndex = 0;

          console.log("action ",action);
          // swipe right, next avatar
          if (action === this.SWIPE_ACTION.LEFT) {
              currentIndex++;
              if(currentIndex <= avatars.length-1){
                  this.getPreviewImages(avatars[currentIndex], true);
                  const isLast = currentIndex === avatars.length - 1;
                  nextIndex = isLast ? 0 : currentIndex + 1;
                  if(isLast){
                      this.isLast = true;
                      this.isFirst = false;
                  }else{
                      this.isLast = false;
                      this.isFirst = false;
                  }
              }else{
                  this.isLast = true;
                  this.isFirst = false;
                  return;
              }
          }

          // swipe left, previous avatar
          if (action === this.SWIPE_ACTION.RIGHT) {
              currentIndex--;
            	if(currentIndex >= 0){
    	        	  this.getPreviewImages(avatars[currentIndex], true);
    	            const isFirst = currentIndex === 0;
    	            nextIndex = isFirst ? avatars.length - 1 : currentIndex - 1;
                  if(isFirst){
                      this.isLast = false;
                      this.isFirst = true;
                  }else{
                      this.isLast = false;
                      this.isFirst = false;
                  }
    	        }else{
                  this.isLast = false;
                  this.isFirst = true;
    	        	  return;
    	        }
          }
          console.log("nextIndex ", nextIndex);
          // toggle avatar visibility
          //this.previewImages.forEach((x, i) => x.visible = (i === nextIndex));
    }

}
