import {Component, OnInit} from '@angular/core';
import {ImageGalleryService} from '../services/imageGallery.services';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {Router, ActivatedRoute } from '@angular/router';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {TranslateService} from 'ng2-translate/ng2-translate';


@Component({
	templateUrl:'./galleryFolder.component.html',
	styleUrls:['./gallery.scss']
})
export class GalleryFolderComponent implements OnInit{
	public imageFolderObj:any = [];

	constructor(private imageGalleryService:ImageGalleryService,
		    private selectVisit:SelectVisitServices,
		    private headerService: HeaderService,
		    private _router:Router,
		    private _translate:TranslateService){}

	ngOnInit(){
    		let me = this;
    		let obj = {
            title:this._translate.instant("photoAlbum"),
            isHomeBtn: true,
            isBackBtn: false,
            isMenuBtn: true
        };

        this.headerService.setHeaderObject(obj);
    		this.imageFolderObj = [""];
    		this.imageGalleryService.galleryId = "";

    		this.imageGalleryService.getPhotoAlbumsList(this.selectVisit.selectedVisitObj.VisitID)
    		.subscribe(response => {
    			  me.imageFolderObj = response.VisitGallery;
    		},error => {console.log("error 1",error)});

	}
	photoAlbumClicked(galleryId){
        this.imageGalleryService.galleryId =galleryId;
        this._router.navigate(['/gallery/thumbnail']);
	}

}