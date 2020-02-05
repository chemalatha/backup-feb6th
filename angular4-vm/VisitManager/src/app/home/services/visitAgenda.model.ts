interface AgendaAnchor{
    ContactDetailID: number;
    FirstName: string;
    LastName: string;
    Designation: string;
    EmailID: string;
    ContactNo: string;
    ShortBio: string;
}

interface VisitAgenda{
    Title: string;
    Date: string;
    TimeZone: string;
    StartTime: string;
    EndTime: string;
    CityName: string;
    Description: string;
    VisitorRemark: string;
    AgendaID: number;
    Room: string;
    IsFeedbackApplicable: boolean;
    IsPreReadContentAvailable: boolean;
    IsSessionContentAvailable: boolean;
    SessionTitle: string;
    AgendaAnchor: Array<AgendaAnchor>
}

export interface VisitAgendaModel{
    ResponseStatus: string;
    ResponseMessage: string;
    VisitAgenda: Array<VisitAgenda>
}