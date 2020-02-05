import { Component, OnInit,  OnDestroy, AfterViewInit} from '@angular/core';
import {Router } from '@angular/router';
import {AjaxService } from '../core/services/AjaxService.service';
import { UtilityServices } from '../core/services/utility.service';
import { APP_CONFIG } from '../app.config';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {GoogleMaps, GoogleMap,GoogleMapsEvent,LatLng,CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';
import { SelectVisitServices} from '../selectVisit/services/selectVisit.service';
import * as _ from 'lodash';
import {HeaderService} from '../shared/headerComponent/header.services';
import * as moment from 'moment';
import {ISingleVisitAddMarkerParams} from '../selectVisit/services/selectVisit.interface';

declare var window:any;
declare var google:any;

@Component({
	moduleId: module.id,
	templateUrl: "./cityInsights.component.html",
	styleUrls: ["./cityInsights.scss"]
})
export class CityInsightsComponent implements OnInit, OnDestroy, AfterViewInit{

    public errorMessage: string;
	private mapInstance:GoogleMap = null;
    public headerConfig;
    private googleMapDesktopAPIKey = 'AIzaSyD5yFBB69RwOsb6sVRsQEapd9ynwCuoBYo';
    private _apiLoadingPromise: Promise<any>;
    private mapZoomLevel = 3;

    constructor(
      private _translate: TranslateService,
      private selectvisit: SelectVisitServices,
      private headerService: HeaderService,
      private ajaxService: AjaxService,
		  private _router: Router,
      private googleMaps: GoogleMaps
    ){}

    ngOnInit(){
        console.log('CityInsightsComponent');
        this.headerConfig = {
      		title: this._translate.instant('cityInsightsTitle'),
      		isHomeBtn: true,
      		isBackBtn: false,
      		isMenuBtn: true
    	};
    }

    // Load map only after view is initialized
		ngAfterViewInit() {
			  this.loadMap();
		}

    loadMap(){
          	this.selectvisit._getVisitLocation(this.selectvisit.selectedVisitObj.VisitID)
  		 		.subscribe(locations => this.successLocationCallback(locations),
                   error => this.errorMessage = <any>error);
    }
    private successLocationCallback(locations: any[]){
            //let cities = _.groupBy(locations,"CityName");
            // create a new map by passing HTMLElement
            let element: HTMLElement = document.getElementById('flatMapContainerPhone');

        if(window.cordova){
                this.mapInstance = this.googleMaps.create(element);

                // listen to MAP_READY event
                // You must wait for this event to fire before adding something to the map or modifying it in anyway
                this.mapInstance.one(GoogleMapsEvent.MAP_READY).then(
                () => {
                    console.log('Map is ready!');
                this.fetchMapCoordinatesAndDisplay(locations);
                }
                );
        }else{
            let me = this;
            if( !this.isApiLoaded() ){
                this.loadApi();
                this._apiLoadingPromise.then( () => {
                    me.__onGoogleLoaded(locations);
                });
            }else{
                me.__onGoogleLoaded(locations);
            }
        }
    }



  private fetchMapCoordinatesAndDisplay(locations){
        this.headerService.setGoogleMapInstance(this.mapInstance);
        // Now you can add elements to the map like the marker
        this.filterVisitAndOfficeLocations(locations|| []);
        this.addVisitLocationMarker();
        this.addAccentureLocationMarker();
        this.zoomToCurrentLocation();
  }

  private _loadGoogleMapAPIScript(){

      let script = (<any>document).createElement('script');
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?callback=__onGoogleLoaded&key=${this.googleMapDesktopAPIKey}`;
        script.type = 'text/javascript';

        (<any>document).getElementsByTagName('head')[0].appendChild(script);
  }

  isApiLoaded(): boolean {
        return (<any>window).google ? true : false;
    }

  loadApi(): void{
      if(!this._apiLoadingPromise){
          this._apiLoadingPromise = new Promise( (resolve) => {
              (<any>window)['__onGoogleLoaded'] = (ev) => {
                  console.log('google maps api loaded');
                  resolve('google maps api loaded');
              }
              this._loadGoogleMapAPIScript();
          });
      }
  }


  public __onGoogleLoaded(locations){
       let mapProp = {
          center: new google.maps.LatLng(51.508742,-0.120850),
          zoom: this.mapZoomLevel,
          tilt: 30
      };
      let element: HTMLElement = document.getElementById('flatMapContainerPhone');
      this.mapInstance = new google.maps.Map(element, mapProp);
      this.fetchMapCoordinatesAndDisplay(locations);
  }

  ngOnDestroy(){

  }

  goHome(title){
      this._router.navigate(['/home']);
  };

  goBack(title){

  }
}
