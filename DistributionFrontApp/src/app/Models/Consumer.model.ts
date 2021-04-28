export class Consumer{

    name: string;
    lastname: string;
    location:string;
    priority: string;
    phoneNum: string;
    accountID: string;
    type: string;

    constructor(firstname: string, lastname: string, location: string, priority: string, phoneNum: string, accountID: string, type: string){
        this.name = firstname;
        this.lastname = lastname;
        this.location = location;
        this.priority = priority;
        this.phoneNum = phoneNum;
        this.accountID = accountID;
        this.type = type;
    }

}