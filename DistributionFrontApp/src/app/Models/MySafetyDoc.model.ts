export class MySafetyDoc{

    //id: string;
    documentId: string;
    startDate: string;
    phoneNumber: string;
    status: string;
    address: string;

    constructor(id: string, startingDate: string, phone: string, state: string, workLocation: string){

        this.documentId = id;
        this.startDate = startingDate;
        this.phoneNumber = phone;
        this.status = state;
        this.address = workLocation;

    }

}