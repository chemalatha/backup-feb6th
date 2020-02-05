interface VisitContact {
    ContactDetailID: number;
    FirstName: string;
    LastName: string;
    Designation: string;
    Email: string;
    ShortBio: string;
    ContactNo: string;
    Photo: string;
}

export interface MeetPresentorModel{
    ResponseStatus: string;
    ResponseMessage: string;
    VisitContacts: Array<VisitContact>;
}


