export class WorkPlan{

    id: string;
    documentId: string;
    startDate: string;
    phoneNo: string;
    status: string;
    address: string;

    constructor(id: string, startDate: string, phoneNo: string, state: string, address: string){

        this.id = id;
        this.startDate = startDate;
        this.phoneNo = phoneNo;
        this.status = state;
        this.address = address;

    }

}