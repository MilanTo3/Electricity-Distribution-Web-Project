
export class MyIncidents{

    //id: string;
    documentId: string;
    incidentTime: string;
    type: string;
    status: string;
    callNum: number;

    constructor(documentId: string, incidentTime: Date, type: string, state: string, callNum: number)
    {

        this.documentId = documentId;
        this.incidentTime = incidentTime.toUTCString();
        this.type = type;
        this.status = state;
        this.callNum = callNum;

    }
}