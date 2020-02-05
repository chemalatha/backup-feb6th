interface TravelGuideUsefulGuide{
    Link: string;
}

interface TravelGuide{
    ImmigrationDescription: string;
    UsefulLinks: Array<TravelGuideUsefulGuide>;
}

export interface TravelGuideModel{
    ResponseStatus: string;
    ResponseMessage: string;
    ImmigrationInfo: Array<TravelGuide>;
}
