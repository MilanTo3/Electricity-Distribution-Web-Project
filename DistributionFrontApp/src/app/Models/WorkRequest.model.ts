
export class WorkRequest{

    id: string;
    startDate: string;
    phoneNumber: string;
    status: string;
    address: string;

    constructor(id: string, startingDate: Date, phone: string, state: string, workLocation: string){

        this.id = id;
        this.startDate = startingDate.toUTCString();
        this.phoneNumber = phone;
        this.status = state;
        this.address = workLocation;

    }

}