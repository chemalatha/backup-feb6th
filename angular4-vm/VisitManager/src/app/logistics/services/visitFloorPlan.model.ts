interface VisitFloorPlan{
    FloorID: number;
    Floor: string;
    Description: string;
    CityID: string;
    CityName: string;
}

export interface VisitFloorPlanModel{
    ResponseStatus: string;
    ResponseMessage: string;
    FloorPlan: Array<VisitFloorPlan>;
}
