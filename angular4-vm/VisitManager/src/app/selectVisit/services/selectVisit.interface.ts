export interface ISaveContactParams{
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailID: string;
}

export interface ISingleVisitAddMarkerParams{
    position: any;
    title: string;
    icon: string;
    detail?: any;
    width?: number;
    height?: number;
}
