interface WifiInformation{
    WifiLoginID: string;
    FacilityID: number;
    FacilityName: string;
    WifiConnectionName: string;
    UserName: string;
    Password: string;
    CityID: number;
    CityName: string;
}

export interface WifiInformationModel{
    ResponseStatus: string;
    ResponseMessage: string;
    WifiInformation: Array<WifiInformation>;
}
