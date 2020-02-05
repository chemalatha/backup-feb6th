import { NgModule } from '@angular/core';
import {ImageGalleryComponent } from './imageGallery.component';
import {GalleryRoutingModule} from './gallery-Routing.module';
import { GalleryFolderComponent } from './galleryFolder/galleryFolder.component';
import { ThumbnailComponent } from './thumbnailView/thumbnail.component';
import { PreviewComponent } from './preview/preview.component';
import {ImageGalleryService} from './services/imageGallery.services';
import {SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LongPress } from './services/longpress.directive';

@NgModule({
	declarations:[
		ImageGalleryComponent,
		GalleryFolderComponent,
		ThumbnailComponent,
		PreviewComponent,
		LongPress
	],
	imports: [
		RouterModule,
		GalleryRoutingModule,
		SharedModule
	],
	providers:[
		ImageGalleryService
	]

})
export class ImageGalleyModule{


}