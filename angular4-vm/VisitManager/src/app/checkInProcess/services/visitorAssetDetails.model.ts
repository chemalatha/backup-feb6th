interface VisitorAssetDetail{
    LaptopMake: string;
    Model: string;
    AssetNumber: string;
    AssetID: number;
}

export interface VisitorAssetDetailsModel{
    ResponseStatus: string;
    ResponseMessage: string;
    VisitorAssetDetails: Array<VisitorAssetDetail>;
}
