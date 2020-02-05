import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import {UtilityServices} from '../../core/services/utility.service';
import { ErrorConfig } from '../../core/error-handler/errorConfig.service';

declare var window:any;
@Injectable()
export class ImageGalleryService {

   public galleryId = "";
   public imageId = "";
   public imageIdList = [];

   constructor(
        private ajaxservice: AjaxService,
        private utilityservice: UtilityServices,
        private errorConfig: ErrorConfig) {}

   getPhotoAlbumsList(visitId){
     return this.ajaxservice.getAPICacheData("GetGalleryForVisit", `visitId=${visitId}`)
            .map((response) => {
              console.log(response);
                return response;
            },
            (error) => { return null; });
   }
   getPhotoList(visitId){
         let me = this;
         return this.ajaxservice.getAPICacheData("GetGalleryThumbnailForVisit", `VisitID=${visitId}&GalleryID=${this.galleryId}&PageNo=1&PageSize=25`)
              .map((response) => {
                  console.log("GetGalleryThumbnailForVisit",response);
                  _.forEach(response.VisitGalleryThumbnails, function(key,value){
                        me.imageIdList.push(key.ImageID);
                  });
                  return response;
              },
              (error) => { return null; });
   }
   previewImage(visitId, imageId){

         return this.ajaxservice.getAPICacheData("GetGalleryFullSizeImageForVisit", `VisitID=${visitId}&GalleryID=${this.galleryId}&ImageID=${imageId}`)
              .map((response) => {
               console.log("GetGalleryFullSizeImageForVisit",response);
                  return response;
              },
              (error) => { return null; });
      }

   }