export class HistoryStateChange{

    name: string;
    lastname: string;
    dateChanged: string;
    details: string;

    constructor(firstname: string, lastname: string, date: Date, details: string){
        
        this.name = firstname;
        this.lastname = lastname;
        this.dateChanged = date.toLocaleString();
        this.details = details;

    }

}