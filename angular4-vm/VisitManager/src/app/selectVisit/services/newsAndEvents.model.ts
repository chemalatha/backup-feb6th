interface NewsAndEvents {
    Title: string;
    Description: string;
    URL: string;
    IsImportant: number;
}

export interface NewsAndEventsModel{
    ResponseStatus: string;
    ResponseMessage: string;
    News: Array<NewsAndEvents>;
}
