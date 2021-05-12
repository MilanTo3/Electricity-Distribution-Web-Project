export class changeRoleRequest{

    userid: string;
    currentRole: string;
    wantsRole: string;

    constructor(userid: string, currentRole: string, wantsRole: string){
        this.userid = userid;
        this.currentRole = currentRole;
        this.wantsRole = wantsRole;
    }

}