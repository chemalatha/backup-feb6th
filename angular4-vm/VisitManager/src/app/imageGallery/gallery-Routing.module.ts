import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ImageGalleryComponent} from './imageGallery.component';
import { GalleryFolderComponent } from './galleryFolder/galleryFolder.component';
import { ThumbnailComponent } from './thumbnailView/thumbnail.component';
import { PreviewComponent } from './preview/preview.component';


const gallery_routes: Routes = [
	{ path: '', component: ImageGalleryComponent,
		children: [

			{ path: '', redirectTo: 'galleryFolder', pathMatch: 'full' },
			{ path: 'galleryFolder',  component: GalleryFolderComponent },
			{ path:'thumbnail' , component:ThumbnailComponent},
			{path:'preview', component:PreviewComponent}
		]
	}

];
@NgModule({
    imports: [ RouterModule.forChild(gallery_routes) ]
})
export class GalleryRoutingModule{}