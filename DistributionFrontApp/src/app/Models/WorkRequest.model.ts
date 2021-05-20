
export class WorkRequest{

    documentId: string;
    startDate: string;
    phoneNumber: string;
    status: string;
    address: string;

    constructor(id: string, startingDate: Date, phone: string, state: string, workLocation: string){

        this.documentId = id;
        this.startDate = startingDate.toUTCString();
        this.phoneNumber = phone;
        this.status = state;
        this.address = workLocation;

    }

}