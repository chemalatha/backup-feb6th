import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import {GoogleMaps, GoogleMap,GoogleMapsEvent,LatLng,CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';
import { Router } from '@angular/router';
import { SelectVisitServices} from '../services/selectVisit.service';
import * as _ from 'lodash';
import {HeaderService} from '../../shared/headerComponent/header.services';
import {TranslateService} from 'ng2-translate/ng2-translate';
import * as moment from 'moment';
import {ISingleVisitAddMarkerParams} from '../services/selectVisit.interface';
declare var window:any;
declare var google:any;

@Component({
	templateUrl: './singleVisit.component.html',
	styleUrls:['./singleVisit.scss']
})
export class SingleVisitComponent implements OnDestroy, AfterViewInit, OnInit{

	public errorMessage: string;
	private mapInstance:GoogleMap = null;
  public displayFooterSection = true;
  private markerIconBasePath;
	private officeLocationMarkerUrl: string;
  private visitLocationMarkerUrl: Array<string>;

  public visitStartDate: string;
  public visitEndDate: string;
  public selectedMapCityName;
  private displayVisitLocation: any = [];
  private displayAccentureOfficeLocation: any = [];
  private defaultShowInfoWindow;
  private _apiLoadingPromise: Promise<any>;
  private visitLocationWidth;
  private visitLocationHeight;
  private accentureOfficeWidth;
  private accentureOfficeHeight;
  private mapZoomLevel = 3;
  private googleMapDesktopAPIKey = 'AIzaSyD5yFBB69RwOsb6sVRsQEapd9ynwCuoBYo';
  private googleMapInfoWindow;

	constructor(
		private googleMaps: GoogleMaps,
		private selectvisit: SelectVisitServices,
		private headerService: HeaderService,
		private _translate: TranslateService,
    private _router: Router) {

      if(window.cordova){
          this.markerIconBasePath = 'www/resources/images/singlevisit/';
          this.visitLocationWidth = 17;
          this.visitLocationHeight  = 19;
          this.accentureOfficeWidth = 11;
          this.accentureOfficeHeight = 15;
      }else{
          this.markerIconBasePath = './resources/images/singlevisit/';
          this.visitLocationWidth = 27;
          this.visitLocationHeight  = 29;
          this.accentureOfficeWidth = 21;
          this.accentureOfficeHeight = 15;
      }

      this.officeLocationMarkerUrl = this.markerIconBasePath+'AccentureOffice.png';

	    this.visitLocationMarkerUrl = [
      this.markerIconBasePath+'pin_1.png',
      this.markerIconBasePath+'pin_2.png',
      this.markerIconBasePath+'pin_3.png',
      this.markerIconBasePath+'pin_4.png',
      this.markerIconBasePath+'pin_5.png',
      this.markerIconBasePath+'pin_6.png',
      this.markerIconBasePath+'pin_0.png'];
    }

		ngOnInit(){
    			let obj = {
    				title:this._translate.instant('visitLocation'),
    				isHomeBtn: false,
    				isBackBtn: true,
    				isMenuBtn: true
    			};
    			this.headerService.setHeaderObject(obj);
          this.visitStartDate = this.selectvisit.selectedVisitObj.VisitStartDate;
          this.visitEndDate = this.selectvisit.selectedVisitObj.VisitEndDate;
          this.defaultShowInfoWindow = false;
          if(this.headerService.isSideMenuClick){
              this.displayFooterSection = false;
          }
		}

	  // Load map only after view is initialized
		ngAfterViewInit() {
			  this.loadMap(); 
		}

	loadMap() {

  		 this.selectvisit.getVisitLocationDetails(this.selectvisit.selectedVisitObj.VisitID)
  		 		.subscribe(locations => this.successLocationCallback(locations),
                   error => this.errorMessage = <any>error);
	}

	private successLocationCallback(locations: any[]){

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

	};

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

  private fetchPositionLatLong(latitude, longtitude){
        let position;
        if(window.cordova){
            position = new LatLng(latitude, longtitude);
        }else{
            position = new google.maps.LatLng(latitude, longtitude);
        }
        return position;
  }

	private filterVisitAndOfficeLocations(clientvisitLocations: any[]): void {
    		let me = this;
        //visit Location
    		let clientLocationGrouped = _.groupBy(clientvisitLocations[0], function(locationObj: any){
    				return locationObj.CityName;
    		});

    		_.forEach(clientLocationGrouped, function(paramObj, key){
                //by default, display first marker position
                let locationObj = _.head(paramObj);
                me.displayVisitLocation.push(locationObj);
        });

        //Accenture Offices
        let visitLocationGrouped = _.groupBy(clientvisitLocations[1], function(locationObj: any){
    				return locationObj.CityName;
    		});
        let accentureOffices = [];
    		_.forEach(visitLocationGrouped, function(paramObj, key){
                //by default, display first marker position
                let locationObj = _.head(paramObj);
                accentureOffices.push(locationObj);
        });

        accentureOffices.map(function(locationObj, key){

              let filteredData = _.filter(me.displayVisitLocation, function(o) {
                  return o.CityName === locationObj.CityName;
              });
              if(!filteredData.length){
                  me.displayAccentureOfficeLocation.push(locationObj);
              }
        });
	}

  private addVisitLocationMarker() : void{
        let me = this, counter = 0;
        me.displayVisitLocation.map(function(locationObj, key){
            if(!counter){
                me.selectedMapCityName = locationObj.CityName + ' '+ moment(locationObj.StartDate).format('Do MMM YYYY');
            }
            // create LatLng object
            let position = me.fetchPositionLatLong(locationObj.Latitude, locationObj.Longtitude);
            //add the marker
    				me.addMapMarker({
    						position: position,
    						title: locationObj.CityName,
    						icon: (counter<6) ? me.visitLocationMarkerUrl[counter] : me.visitLocationMarkerUrl[6],
    						detail: locationObj,
                width: me.visitLocationWidth,
                height: me.visitLocationHeight
    				});
            counter++;
        });
    }

	private addAccentureLocationMarker(): void{
    		let me = this;
    		_.forEach(me.displayAccentureOfficeLocation, function(locationObj, key){
    				// create LatLng object
            let position = me.fetchPositionLatLong(locationObj.Latitude, locationObj.Longitude);
            //add the marker
    				me.addMapMarker({
    						position: position,
    						title: locationObj.CityName,
    						icon: me.officeLocationMarkerUrl,
                width: me.accentureOfficeWidth,
                height: me.accentureOfficeHeight
    				});
    		});
	};

	private zoomToCurrentLocation(){
      if(window.cordova){  //for mobile
      		this.mapInstance.getMyLocation().then(res => {
                console.log('Give it to me' +  res.latLng);
                let position = {
                    target: res.latLng,
                    zoom: this.mapZoomLevel,
                    tilt: 30
                };
                if(this.mapInstance){
                    this.mapInstance.animateCamera(position);
                }
          });
      }else{    //for desktop
          // Try HTML5 geolocation.
          let me = this;
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                if(me.mapInstance){
                    me.mapInstance.setCenter(pos);
                }
            }, function() {
                //user denied permission
            });
        }

  	}
  }

	private addMapMarker(markerObj: ISingleVisitAddMarkerParams){
  		  let me = this;

       if(this.mapInstance){
             if(window.cordova){  //for mobile
                 // create new marker
                 let markerOptions: MarkerOptions = {
              		   position: markerObj.position,
              		   title: markerObj.title,
              			 icon: {
              					url: markerObj.icon,
                        size: {
                          width: markerObj.width,
                          height: markerObj.height
                        }
              			 }
            		 };
            		 this.mapInstance.addMarker(markerOptions)
            			.then((marker: Marker) => {
                      if(typeof markerObj.detail !== 'undefined'){
            					  marker.set('custominfo', markerObj.detail);
                      }
                      if(!me.defaultShowInfoWindow){
                          marker.showInfoWindow();
                          me.defaultShowInfoWindow = true;
                      }
            					marker.addEventListener('click').subscribe((mobj)=>{
                        marker.showInfoWindow();
            						me.displayClickedMarkerDetails(mobj.get('custominfo'));
            					});
            			});
             }else{  //for desktop
                 let image = {
                    url: markerObj.icon, // image is 512 x 512
                    scaledSize : new google.maps.Size(markerObj.width, markerObj.height)
                };
                let markerOptions: any = {
            		   position: markerObj.position,
            		   title: markerObj.title,
                   icon: image,
                   map: this.mapInstance
                };
                let marker = new google.maps.Marker(markerOptions);

                 if(!this.googleMapInfoWindow){
                       this.googleMapInfoWindow = new google.maps.InfoWindow();
                 }

                  if(!me.defaultShowInfoWindow){
                        this.googleMapInfoWindow.setContent(markerObj.detail.CityName);
                        this.googleMapInfoWindow.open(this.mapInstance, marker);
                        me.defaultShowInfoWindow = true;
                  }

                  google.maps.event.addListener(marker, 'click', (function(detailObj, marker) {
                     return function() {
                         if(me.googleMapInfoWindow){
                            me.googleMapInfoWindow.close();
                         }
                         me.googleMapInfoWindow.setContent(detailObj.CityName);
                         me.googleMapInfoWindow.open(this.mapInstance, marker);
                         me.displayClickedMarkerDetails(detailObj);
                     }
                 })(markerObj.detail, marker));

             }
     }
	};

	private displayClickedMarkerDetails(clickMarkerObj: any){
      if(clickMarkerObj){
          this.selectedMapCityName = clickMarkerObj.CityName + ' '+ moment(clickMarkerObj.StartDate).format('Do MMM YYYY');
      }
	}

	ngOnDestroy() {
        if(this.mapInstance){
          if(window.cordova){  //for mobile
    			    this.mapInstance.remove();
          }
    			this.mapInstance = null;
        }
	}

  goToWelcomeView(){
      this._router.navigate(['/visit/welcomevisit']);
  }
}
