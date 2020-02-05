//* Defines the urlConfiguration entity */
export interface IUrlConfigurationContent {
    "Production": string;
    "Static": string;
    "Method": string;
    "isProtected": boolean;
    "cacheData"?: boolean;
}
export interface IUrlConfiguration {
    'Authenticate': IUrlConfigurationContent;
    'refreshToken':IUrlConfigurationContent;
    'getUserInfo':IUrlConfigurationContent;
    'getVisits':IUrlConfigurationContent;
    'getPastVisits':IUrlConfigurationContent;
    'forgotPassword': IUrlConfigurationContent;
    'changePassword':IUrlConfigurationContent;
    'EulaAcceptance':IUrlConfigurationContent;
    'GetVisitAgendaDatewise':IUrlConfigurationContent;
    'GetVisitTheme': IUrlConfigurationContent;
    'GetAgendaAnchorDetails': IUrlConfigurationContent;
    'GetVisitLocation': IUrlConfigurationContent;
    'GetAccentureOffices': IUrlConfigurationContent;
    'GetContactUsEmail': IUrlConfigurationContent;
    'Logout': IUrlConfigurationContent;
    'GetSessionImage': IUrlConfigurationContent;
    'GetWelcomeInformation': IUrlConfigurationContent;
    'GetAgendaSessionContent': IUrlConfigurationContent;
    'GetVisitPreReadDocument': IUrlConfigurationContent;
    'GetPreReadDocument': IUrlConfigurationContent;
    'GetVisitorInformation': IUrlConfigurationContent;
    'GetVisitorInformationWithoutPhoto': IUrlConfigurationContent;
    'SubmitVisitorDetails': IUrlConfigurationContent;
    'GetVisitConfirmationBarCode': IUrlConfigurationContent;
    'GetVisitorAssetDetails': IUrlConfigurationContent;
    'AddVisitorAssetDetails': IUrlConfigurationContent;
    'SubmitAgendaVisitorRemark': IUrlConfigurationContent;
    'GetTravelGuideDetails': IUrlConfigurationContent;
    'GetPointOfContactDetails': IUrlConfigurationContent;
    'GetPOCDetailsPhoto': IUrlConfigurationContent;
    'GetVisitorGuideline': IUrlConfigurationContent;
    'GetVisitTeamToMeet': IUrlConfigurationContent;
    'GetVisitTeamToMeetPhoto': IUrlConfigurationContent;
    'GetGalleryForVisit': IUrlConfigurationContent;
    'GetWifiInformation': IUrlConfigurationContent;
    'GetFoodPreference': IUrlConfigurationContent;
    'AddFoodPreference': IUrlConfigurationContent;
    'GetCabBookingDetails': IUrlConfigurationContent;
    'RequestCab': IUrlConfigurationContent;
    'CancelCabRequest': IUrlConfigurationContent;
    'GetGalleryThumbnailForVisit':IUrlConfigurationContent;
    'GetGalleryFullSizeImageForVisit':IUrlConfigurationContent;
    'GetVisitFloorPlan': IUrlConfigurationContent;
    'GetSafetyOverview': IUrlConfigurationContent;
    'GetNewsAndEvents': IUrlConfigurationContent;
    'GetFloorMapImage': IUrlConfigurationContent;
    'GetAgendaDashboardInfo': IUrlConfigurationContent;
    'GetDashboardCommentsVisitor': IUrlConfigurationContent;
    'AddDashboardComments':IUrlConfigurationContent;
}

