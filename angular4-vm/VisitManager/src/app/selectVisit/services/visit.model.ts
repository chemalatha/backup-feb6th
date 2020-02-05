export interface Visit{
    VisitID: string;
    VisitTitle: string;
    VisitStartDate: string;
    VisitEndDate: string;
    CityID: number;
    CityName: string;
    Longtitude: string;
    Latitude: string;
    Country: string;
    FacilityName: string;
    isPast?: boolean;
    IsFeedbackSubmitted?: boolean;
    SessionTitle: string;
}

export interface VisitModel{
    ResponseStatus: string;
    ResponseMessage: string;
    Visits: Array<Visit>;
}