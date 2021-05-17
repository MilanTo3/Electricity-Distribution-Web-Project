export class LoggedUser{

    username: string;
    token: string;
    role: string;

    constructor(token, username, role){
        this.username = username;
        this.token = token;
        this.role = role;
    }

}