import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './resources/i18n', '.json');
}

@NgModule({
    imports: [ 
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }) 
    ]
})
export class AppTranslateModule{}