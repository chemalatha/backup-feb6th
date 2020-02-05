interface SafetyOverview{
    SafetyOverviewID: number;
    Overview: string;
}

export interface SafetyOverviewModel{
    ResponseStatus: string;
    ResponseMessage: string;
    SafetyOverview: Array<SafetyOverview>;
}
