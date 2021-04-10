export class Call{

    callId: number;
    reason: string;
    hazard: string;
    comment: string;

    constructor(callId: number, reason: string, hazard: string, comment: string){
        
        this.callId = callId;
        this.reason = reason;
        this.hazard = hazard;
        this.comment = comment;
    }

}