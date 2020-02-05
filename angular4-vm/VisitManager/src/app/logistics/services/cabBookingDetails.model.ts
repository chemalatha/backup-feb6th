interface CabBookingDetails{
    PickupDate: string;
    PickupTime: string;
    DriverName: string;
    DriverNumber: string;
    CarDetails: string;
    PickupLocation: string;
    CabBookedForDays: number;
    CityId: number;
    CityName: string;
    TimeZone: string;
}

interface CabBookingRequest{
    CabRequestID: string;
    CityId: number;
    RequestStatus: number;
    CabDetails: CabBookingDetails;
}

export interface CabBookingDetailsModel{
    ResponseStatus: string;
    ResponseMessage: string;
    CabBooking: Array<CabBookingRequest>;
}
