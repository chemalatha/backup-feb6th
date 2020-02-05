interface PointOfContact{
    POCID: string;
    IsPrimary: boolean;
    FirstName: string;
    LastName: string;
    Designation: string;
    Email: string;
    ShortBio: string;
    ContactNo: string;
    Photo: string;
    City: string;
    Country: string;
}

export interface PointOfContactModel{
    ResponseStatus: string;
    ResponseMessage: string;
    POCDetails: Array<PointOfContact>;
}
