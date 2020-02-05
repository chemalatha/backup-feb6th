interface VisitLocation{
    Description: string;
    Facility: string;
    Floor: string;
    Room: string;
    StartDate: string;
    EndDate: string;
    CityID: string;
    CityName: string;
    Longtitude: string;
    Latitude: string;
}

export interface VisitLocationModel{
    ResponseStatus: string;
    ResponseMessage: string;
    VisitLocations: Array<VisitLocation>
}