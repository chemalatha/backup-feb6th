interface AccentureOffices{
    FacilityID: string;
    CityName: string;
    FacilityName: string;
    Longitude: string;
    Latitude: string;
    Address: string;
}

export interface AccentureOfficeModel{
    ResponseStatus: string;
    ResponseMessage: string;
    AccentureOffices: Array<AccentureOffices>
}