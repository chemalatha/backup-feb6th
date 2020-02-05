import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
 
declare var Connection: any;
declare var window: any;

@Injectable()
export class ConnectivityService {
 
  constructor(private network: Network) { }

  isOnline(): boolean {
    if(window.cordova && this.network.type){
      return this.network.type !== 'none';
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(window.cordova && this.network.type){
      return this.network.type === 'none';
    } else {
      return !navigator.onLine;   
    }
  }
}