export class MySafetyDoc{

    //id: string;
    documentId: string;
    dateCreated: string;
    phoneNumber: string;
    type: string;

    constructor(id: string, dateCreated: Date, phone: string, type: string){

        this.documentId = id;
        this.dateCreated = dateCreated.toUTCString();;
        this.phoneNumber = phone;
        this.type = type;
    }

}