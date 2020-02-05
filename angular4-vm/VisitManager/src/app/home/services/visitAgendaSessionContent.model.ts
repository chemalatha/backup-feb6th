export interface VisitAgendaSessionContentModel{
    ResponseStatus: string;
    ResponseMessage: string;
    SessionTitle: string;
    SessionContent: string;
    AgendaID: any;
    isDownloaded?: boolean;
    fileSavePath?: any;
    contentType?: string;
}
