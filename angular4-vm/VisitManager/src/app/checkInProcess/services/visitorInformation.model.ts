export interface VisitorInformationModel{
    ResponseStatus: string;
    ResponseMessage: string;
    VisitorFirstName: string;
    VisitorLastName: string;
    VisitorContactNumber: string;
    VisitorCompanyName: string;
    VisitorDesignation: string;
    VisitorPhoto?: string;
    VisitorEmailID: string;
    VisitDate: boolean;
    IsCheckedIn: string;
    isDefault?: boolean;
}
