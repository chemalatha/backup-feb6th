import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {HeaderService} from '../shared/headerComponent/header.services';

@Component({
	templateUrl:"./imageGallery.component.html",
  styleUrls:["./imageGallery.scss"]
})
export class ImageGalleryComponent implements OnInit{
	constructor(
	    private _router:Router,
	    private _translate:TranslateService,
	    private headerService: HeaderService,
      	    private route: ActivatedRoute) {}
  	public title:string;
	
	ngOnInit(){
	     this.title = this._translate.instant("photoAlbum");
     
        }
  	goHome(){
	     this._router.navigate(['/home']);
  	};
  	goBack(){

	      if(this.route.firstChild.snapshot.url.length >0 && this.route.firstChild.snapshot.url[0].path=="thumbnail"){
	        this._router.navigate(['/gallery']);
	      }else if(this.route.firstChild.snapshot.url.length >0 && this.route.firstChild.snapshot.url[0].path=="preview"){
	        this._router.navigate(['/gallery/thumbnail']);
	      }
      
  	}

}