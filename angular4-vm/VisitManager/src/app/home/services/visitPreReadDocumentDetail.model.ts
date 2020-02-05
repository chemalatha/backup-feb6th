export interface VisitPreReadDocumentDetailModel{
    ResponseStatus: string;
    ResponseMessage: string;
    PreReadDocument: string;
    DocumentID: number;
    isDownloaded?: boolean;
    fileSavePath?: any;
    contentType?: string;
}
