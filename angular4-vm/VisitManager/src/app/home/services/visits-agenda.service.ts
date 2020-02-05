import { Injectable } from '@angular/core';
import { AjaxService } from '../../core/services/AjaxService.service';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash';
import {VisitThemeModel} from './visitTheme.model';
import {VisitAgendaModel} from './visitAgenda.model';
import {VisitAgendaAnchorModel} from './visitAgendaAnchor.model';
import {SelectVisitServices} from '../../selectVisit/services/selectVisit.service';
import {SessionImageModel} from './sessionImage.model';
import {DefaultBase64Image} from '../../core/services/defaultBase64Image';
import { ILocalForageItem, LocalDatabaseService } from '../../core/database/local-database.service';

@Injectable()
export class VisitsAgendaService {
    public selectedVisitAgenda = [];
    public visitAgendaListDateWise: any[] = [];
    public agendaActiveSessionTitle: string;

    constructor(
        private ajaxservice: AjaxService,
        private selectVisit: SelectVisitServices,
        private base64Image: DefaultBase64Image,
        private localDB: LocalDatabaseService) { }

    getVisitAgendaDatewise(visitId: string): Observable<any> {
        return this.ajaxservice.getAPICacheData("GetVisitAgendaDatewise", `visitId=${visitId}`, `GetVisitAgendaDatewise-${visitId}`)
            .map((response: VisitAgendaModel) => {
                if (response && response.ResponseStatus === "Success" && response.VisitAgenda) {
                    this.visitAgendaListDateWise = response.VisitAgenda;
                    return response.VisitAgenda;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    getSelectedVisitAgendaByDate(visitAgendaGrouped, agendaDate = ''){
        var me = this;
        me.selectedVisitAgenda = [];
        _.forEach(visitAgendaGrouped, function(agenda, key){
	    if(!agendaDate){
                me.selectedVisitAgenda = agenda;
                return false;
            }else if(agendaDate === key){
                me.selectedVisitAgenda = agenda;
                return false;
            }
		});
        return me.selectedVisitAgenda;
    };

    public getAgendaDetailsDataById(agendaId){
        let visitAgendaListDateWise = this.visitAgendaListDateWise;
        let vendorFilteredData = _.filter(visitAgendaListDateWise, function(agendaDetail){
              return agendaDetail.AgendaID === agendaId;
        });
        return (vendorFilteredData.length) ? vendorFilteredData[0] : null;
    }

    public getAgendaDetailsById(agendaId): Observable<any>{
        let visitAgendaListDateWise = this.visitAgendaListDateWise;
        let vendorFilteredData = _.filter(visitAgendaListDateWise, function(agendaDetail){
              return agendaDetail.AgendaID === agendaId;
        });
        let agendaDetail =  (vendorFilteredData.length) ? vendorFilteredData[0] : null;
        if(!agendaDetail){
            return Observable.of(null);
        }
        if(agendaDetail.sessionImage){  //if session image exist, don't need to trigger web service
            return Observable.of(agendaDetail);
        }else{
            let data = `visitId=${this.selectVisit.selectedVisitObj.VisitID}&AgendaID=${agendaId}`;
            let sessioncontentcache = `GetSessionImage-${this.selectVisit.selectedVisitObj.VisitID}-${agendaId}`;
            return this.ajaxservice.getAPICacheData('GetSessionImage', data, sessioncontentcache)
              .map((response: SessionImageModel) => {
                if (response && response.ResponseStatus === "Success" && response.AgendaImage) {
                    agendaDetail.sessionImage = "data:image/png;base64," +response.AgendaImage;
                    return agendaDetail;
                } else {
                    agendaDetail.sessionImage = "data:image/png;base64," + this.base64Image.defaultVisitThemeImage;
                    return agendaDetail;
                }
            },
            (error) => { return agendaDetail; });
        }

    };

    public groupAgendaToDisplayDate(agendaResponse){
        let agendaGrouped = _.groupBy(agendaResponse, function(agenda){
                return agenda.Date;
        });
        return agendaGrouped;
    };

    getVisitTheme(visitId: string, date: string): Observable<any>{
        let data = JSON.stringify({
            VisitID: visitId,
            Date: date
        });
        return this.ajaxservice.getAPICacheData("GetVisitTheme", data, `GetVisitTheme-${visitId}-${date}`)
            .map((response: VisitThemeModel) => {
                if (response && response.ResponseStatus === "Success" && response.VisitTheme) {
                    return "data:image/png;base64," + response.VisitTheme;
                } else {
                    return "data:image/png;base64," + this.base64Image.defaultVisitThemeImage;
                }
            },
            (error) => { return "data:image/png;base64," + this.base64Image.defaultVisitThemeImage; });
    };

    getAgendaAnchorDetailsList(visitId: string, activeAgendaList: any[]): Observable<any>{
        let me = this;
        let observableBatch = [];

        _.forEach(activeAgendaList, function(activeAgenda, key){
            activeAgenda.AgendaAnchor.map(anchorDetail => {
                if(anchorDetail){
                    observableBatch.push(me.getAgendaAnchorDetails(visitId, anchorDetail.ContactDetailID)
                    .map(anchorResponse => {
                        anchorDetail.Photo = (anchorResponse && anchorResponse.Photo) ?  anchorResponse.Photo : me.base64Image.defaultSpeakerAvatarImage;
                        anchorDetail.Photo = "data:image/png;base64," + anchorDetail.Photo;
                        anchorDetail.Designation = (anchorResponse && anchorResponse.Designation) ? anchorResponse.Designation : '';
                        return anchorResponse;
                    }));
                }
            });
        });

        return Observable.forkJoin(observableBatch);
    };

    getAgendaAnchorDetails(visitId: string, anchorId: string): Observable<any>{
        let data = {
            VisitID: visitId,
            AnchorId: anchorId
        };
        return this.ajaxservice.getAPICacheData("GetAgendaAnchorDetails", data, `GetAgendaAnchorDetails-${anchorId}`)
            .map((response: VisitAgendaAnchorModel) => {
                if (response && response.ResponseStatus === "Success") {
                    return response;
                } else {
                    return null;
                }
            },
            (error) => { return null; });
    };

    submitVisitRemarks(visitId: string, agendaId: string, visitorRemarks: string): Observable<any> {
        let data = {
            visitID: visitId,
            AgendaID: agendaId,
            VisitorRemark: visitorRemarks
        };
        return this.ajaxservice.makeJSONRequest("SubmitVisitorDetails", data)
            .map(response => {
                if (response && response.ResponseStatus === "Success") {
                    return true;
                } else {
                    return null;
                }
            },
            error => { return null; });

    }


    getLocalVisitAgendaDatewise(visitId: string): Observable<any> {
        let agendaDateWiseCacheKey = `GetVisitAgendaDatewise-${visitId}`;
        return this.localDB.getItem(agendaDateWiseCacheKey);
    };
}
