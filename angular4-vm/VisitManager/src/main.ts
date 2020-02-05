import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrapApp = () => {
    platformBrowserDynamic().bootstrapModule(AppModule);
};
//we are loading the app only when cordova device ready is true
if(!!window['cordova']){
    document.addEventListener('deviceready',bootstrapApp);
}else{
    bootstrapApp();
}

