export class Call{

    id: number;
    reason: string;
    hazard: string;
    comment: string;
    street: string;
    priority: string;

    constructor(id: number, reason: string, hazard: string, comment: string, street: string, priority: string){
        
        this.id = id;
        this.reason = reason;
        this.hazard = hazard;
        this.comment = comment;
        this.street = street;
        this.priority = priority;
    }

}