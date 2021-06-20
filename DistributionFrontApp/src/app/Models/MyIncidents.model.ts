
export class MyIncidents{

    //id: string;
    documentId: string;
    startDate: string;
    phoneNumber: string;
    status: string;
    address: string;

    constructor(documentId: string, startingDate: Date, phone: string, state: string, workLocation: string)
    {

        this.documentId = documentId;
        this.startDate = startingDate.toUTCString();
        this.phoneNumber = phone;
        this.status = state;
        this.address = workLocation;

    }
}