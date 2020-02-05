import { ViewEncapsulation, Component, OnInit, Renderer2 } from '@angular/core';
import { UtilityServices } from './core/services/utility.service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

declare var document:any;
declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
	 
	 constructor( 
		 private utilityService: UtilityServices,
		 private renderer: Renderer2,
		 private splashScreen: SplashScreen,
		 private statusBar: StatusBar,
		 private screenOrientation: ScreenOrientation,
		 private keyboard: Keyboard) {}

	 ngOnInit():void{
		this.utilityService.selectLang("en");
		//once the device ready, perform cordova related stuffs
		 let global = this.renderer.listen('document', 'deviceready', (evt) => {
			console.log('onDeviceReady');
			if (window.cordova !== undefined) {

				//handle splash screen
				/*if (this.splashScreen) {
					this.splashScreen.hide();
				}*/
				if (this.statusBar) {
					this.statusBar.styleDefault();
					this.statusBar.overlaysWebView(false); // This separates the statusbar from app header
				}
				if(this.keyboard){
					this.keyboard.disableScroll(true);
				}
				//screen orientation
				if (this.screenOrientation) {
					//if accessing from phone. locking orientation to portrait
					if (!window.isTablet) {
						this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
					}
				}
			}
		});
		//handle device back button
		 let backbuttonref = this.renderer.listen('document', 'backbutton', (evt) => {
			evt.preventDefault();
        		evt.stopPropagation();
        		return false;
		});
	 }
}

