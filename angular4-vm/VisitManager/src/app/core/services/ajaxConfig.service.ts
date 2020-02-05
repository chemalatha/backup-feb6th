 import {IUrlConfiguration} from '../interfaces/urlConfiguration';
 import { Injectable } from '@angular/core';
 import { APP_CONFIG } from '../../app.config';

@Injectable()
export class AjaxConfigService{

	public serverStage:string[] = APP_CONFIG.serverEnvironments;
    public mode:string = APP_CONFIG.apiMode;
    public timeout: number= APP_CONFIG.httpTimeout;
    public requestInProgress:number = 0;

    public baseURL= {
        "static": <string> "./resources/stubs/", 
        "stage": <string> "https://clientvisitmanagementsvc.ciostage.accenture.com/",
        "prod": <string> "https://clientvisitmanagementsvc.accenture.com/",
        "uat": <string> "UAT url"
    };
    
    public urlConfiguration :IUrlConfiguration= {
        'Authenticate':{
            'Production': 'ClientVisitManagement-Service/Login',
            'Static': 'login.json',
            'Method':'POST',
            'isProtected': false,
            'cacheData': false
        },
        'refreshToken':{
            'Production': 'ClientVisitManagement-Service/RefreshToken',
            'Static': 'refreshToken.json',
            'Method':'POST',
            'isProtected': false,
            'cacheData': false
        },
        'EulaAcceptance':{
            'Production': 'ClientVisitManagement-Service/EulaAcceptance',
            'Static': 'EulaAcceptance.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': false
        },
        'getUserInfo':{
            'Production': 'ClientVisitManagement-Service/GetVisitorInformation',
            'Static': 'getUserInfo.json',
            'Method':'GET',
            'isProtected': false,
            'cacheData': true
        },
        'getVisits':{
            'Production': 'ClientVisitManagement-Service/GetVisits',
            'Static': 'getVisits.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'getPastVisits':{
            'Production': 'ClientVisitManagement-Service/GetPastVisits',
            'Static': 'getPastVisits.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'forgotPassword': {
            'Production': 'ClientVisitManagement-Service/ForgotPassword',
            'Static': 'password_success.json',
            'Method':'GET',
            'isProtected': false,
             'cacheData': false
        },
        'changePassword': {
            'Production': 'ClientVisitManagement-Service/ChangePassword',
            'Static': 'password_success.json',
            'Method':'POST',
            'isProtected': true,
             'cacheData': false
        },
        'GetVisitAgendaDatewise': {
            'Production': 'ClientVisitManagement-Service/GetVisitAgendaDatewise',
            'Static': 'GetVisitAgendaDatewise.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitTheme': {
            'Production': 'ClientVisitManagement-Service/GetVisitTheme',
            'Static': 'GetVisitTheme.json',
            'Method':'POST',
            'isProtected': true,
            'cacheData': true
        },
        'GetAgendaAnchorDetails': {
            'Production': 'ClientVisitManagement-Service/GetAgendaAnchorDetails',
            'Static': 'getAgendaAnchorDetails.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitLocation': {
            'Production': 'ClientVisitManagement-Service/GetVisitLocation',
            'Static': 'getVisitLocation.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetAccentureOffices': {
            'Production': 'ClientVisitManagement-Service/GetAccentureOffices',
            'Static': 'getAccentureOffices.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetContactUsEmail': {
            'Production': 'ClientVisitManagement-Service/GetContactUsEmail',
            'Static': 'getContactUsEmail.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': false
        },
        'Logout':{
            'Production': 'ClientVisitManagement-Service/Logout',
            'Static': 'logout.json',
            'Method':'POST',
            'isProtected': true,
            'cacheData': false
        },
        'GetSessionImage':{
            'Production': 'ClientVisitManagement-Service/GetSessionImage',
            'Static': 'GetSessionImage.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': false
        },
        'GetWelcomeInformation':{
            'Production': 'ClientVisitManagement-Service/GetWelcomeInformation',
            'Static': 'welcomeScreen.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetAgendaSessionContent':{
            'Production': 'ClientVisitManagement-Service/GetAgendaSessionContent',
            'Static': 'GetAgendaSessionContent.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitPreReadDocument':{
            'Production': 'ClientVisitManagement-Service/GetVisitPreReadDocument',
            'Static': 'getMaterialList.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetPreReadDocument':{
            'Production': 'ClientVisitManagement-Service/GetPreReadDocument',
            'Static': 'downloadMaterialList.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitorInformation':{
            'Production': 'ClientVisitManagement-Service/GetVisitorInformation',
            'Static': 'getUserInfo.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitorInformationWithoutPhoto':{
            'Production': 'ClientVisitManagement-Service/GetVisitorInformationWithoutPicture',
            'Static': 'getUserInfo.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'SubmitVisitorDetails':{
            'Production': 'ClientVisitManagement-Service/SubmitVisitorDetails',
            'Static': 'saveAssetDetails.json',
            'Method':'POST',
            'isProtected': true,
            'cacheData': false
        },
        'GetVisitConfirmationBarCode':{
            'Production': 'ClientVisitManagement-Service/GetVisitConfirmationBarCode',
            'Static': 'getBarCode.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitorAssetDetails':{
            'Production': 'ClientVisitManagement-Service/GetAssetDetails',
            'Static': 'getAssetDetails.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'AddVisitorAssetDetails':{
            'Production': 'ClientVisitManagement-Service/AddVisitorAssetDetails',
            'Static': 'saveAssetDetails.json',
            'Method':'POST',
            'isProtected': true,
            'cacheData': false
        },
        'SubmitAgendaVisitorRemark': {
            'Production': 'ClientVisitManagement-Service/SubmitAgendaVisitorRemark',
            'Static': 'saveAssetDetails.json',
            'Method': 'POST',
            'isProtected': true,
            'cacheData': false
        },
	'GetTravelGuideDetails':{
            'Production': 'ClientVisitManagement-Service/GetImmigrationInfo',
            'Static': 'getTravelGuideDetails.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetPointOfContactDetails':{
            'Production': 'ClientVisitManagement-Service/GetPOCDetails',
            'Static': 'getPOCDetails.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetPOCDetailsPhoto':{
            'Production': 'ClientVisitManagement-Service/GetPOCDetailsPhoto',
            'Static': 'getPOCDetailsPhoto.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitorGuideline': {
            'Production': 'ClientVisitManagement-Service/GetVisitorGuideline',
            'Static': 'getVisitorGuideline.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitTeamToMeet': {
            'Production': 'ClientVisitManagement-Service/GetVisitTeamToMeet',
            'Static': 'getTeamVisitToMeet.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitTeamToMeetPhoto':{
            'Production': 'ClientVisitManagement-Service/GetVisitTeamToMeetPhoto',
            'Static': 'getVisitTeamToMeetPhoto.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
	'GetGalleryForVisit':{
            'Production': 'ClientVisitManagement-Service/GetVisitGallery',
            'Static': 'getPhotoAlbumsList.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetWifiInformation':{
            'Production': 'ClientVisitManagement-Service/GetWifiInformation',
            'Static': 'getWifiInformation.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetFoodPreference':{
            'Production': 'ClientVisitManagement-Service/GetFoodPreference',
            'Static': 'getFoodPreference.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'AddFoodPreference':{
            'Production': 'ClientVisitManagement-Service/AddFoodPreference',
            'Static': 'saveAssetDetails.json',
            'Method':'POST',
            'isProtected': true,
            'cacheData': false
        },
        'GetCabBookingDetails':{
            'Production': 'ClientVisitManagement-Service/GetCabBookingDetails',
            'Static': 'getCarDetails.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': true
        },
        'RequestCab':{
            'Production': 'ClientVisitManagement-Service/RequestCab',
            'Static': 'saveAssetDetails.json',
            'Method':'POST',
            'isProtected': true,
            'cacheData': false
        },
        'CancelCabRequest':{
            'Production': 'ClientVisitManagement-Service/CancelCabRequest',
            'Static': 'saveAssetDetails.json',
            'Method':'GET',
            'isProtected': true,
            'cacheData': false
        },
	'GetGalleryThumbnailForVisit':{
            'Production': 'ClientVisitManagement-Service/GetVisitGalleryThumbnailImages',
            'Static': 'getPhotoList.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetGalleryFullSizeImageForVisit':{
            'Production': 'ClientVisitManagement-Service/GetVisitGalleryfullImage',
            'Static': 'getPhotoDetailedImage.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetVisitFloorPlan':{
            'Production': 'ClientVisitManagement-Service/GetVisitFloorPlan',
            'Static': 'getVisitFloorPlan.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetSafetyOverview':{
            'Production': 'ClientVisitManagement-Service/GetSafetyOverview',
            'Static': 'getSafetyOverview.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetFloorMapImage':{
            'Production': 'ClientVisitManagement-Service/GetVisitFloorPlanImage',
            'Static': 'getFloorMapImage.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetNewsAndEvents':{
            'Production': 'ClientVisitManagement-Service/GetNews',
            'Static': 'getNews.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetAgendaDashboardInfo':{
            'Production': '',
            'Static': 'dashboardInfo.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'GetDashboardCommentsVisitor':{
            'Production': '',
            'Static': 'getCommentsForSession.json',
            'Method': 'GET',
            'isProtected': true,
            'cacheData': true
        },
        'AddDashboardComments':{
            'Production': '',
            'Static': 'addDashboardComments.json',
            'Method': 'POST', 
            'isProtected': true,
            'cacheData': true
        }
    };
}
