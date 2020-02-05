interface VisitAgendaPreReadDocument{
    PreReadDocumentTitle: string;
    DocumentID: number;
    ThumbnailImage: string;
    isDownloaded?: boolean;
}

export interface VisitAgendaPreReadDocumentModel{
    ResponseStatus: string;
    ResponseMessage: string;
    VisitPreReadDocument: Array<VisitAgendaPreReadDocument>;
}
