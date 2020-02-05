import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
//import { ILocalForageItem } from './localForageItem';

declare var require: any;
//const localforage: LocalForage = require("localforage");
import * as localforage from "localforage";

export interface ILocalForageItem {
    key: string;
    value: any;
};

@Injectable()
export class LocalDatabaseService{

    constructor() {
        localforage.config({
            name: APP_CONFIG.localDatabaseName,
            driver: [
                localforage.INDEXEDDB,
                localforage.WEBSQL,
                localforage.LOCALSTORAGE
            ],
            storeName: APP_CONFIG.databaseStoreName,
            size: 200*1024*1024, // 200MB - used only by WebSql
        });
    }

	getItem(key: string): Observable<any> {
        let promise = localforage.getItem(key);

        return Observable.fromPromise(promise);
    }

    setItem(item: ILocalForageItem): Observable<any> {
        let promise = localforage.setItem(item.key, item.value);

        return Observable.fromPromise(promise);
    }

    removeItem(key: string): Observable<any> {
        let promise = localforage.removeItem(key);

        return Observable.fromPromise(promise);
    }

    clear(): Observable<any> {
        let promise = localforage.clear();

        return Observable.fromPromise(promise);
    }

    length(): Observable<number> {
        let promise = localforage.length();

        return Observable.fromPromise(promise);
    }

    key(index: number): Observable<string> {
        let promise = localforage.key(index);

        return Observable.fromPromise(promise);
    }

    keys(): Observable<string[]> {
        let promise = localforage.keys();

        return Observable.fromPromise(promise);
    }
}
