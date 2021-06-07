export class HistoryStateChange{

    documentId: string;
    name: string;
    dateChanged: string;
    details: string;

    constructor(id: string, name: string, date: Date, details: string){
        
        this.documentId = id;
        this.name = name;
        this.dateChanged = date.toLocaleString();
        this.details = details;

    }

}