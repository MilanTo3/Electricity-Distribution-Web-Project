export class User{

    name: string;
    lastname: string;
    email:string;
    role: string;

    constructor(firstname: string, lastname: string, eposta: string, privilege: string){
        this.name = firstname;
        this.lastname = lastname;
        this.email = eposta;
        this.role = privilege;
    }

}