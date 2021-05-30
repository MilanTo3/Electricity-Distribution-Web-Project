export class User{

    profileImg: string;
    name: string;
    lastname: string;
    email:string;
    role: string;
    username: string;
    birthday: string;
    address: string;

    constructor(firstname: string, lastname: string, eposta: string, privilege: string, username: string, birthday: string, address: string, profileImg: string){
        this.name = firstname;
        this.lastname = lastname;
        this.email = eposta;
        this.role = privilege;
        this.username = username;
        this.birthday = birthday;
        this.address = address;
        this.profileImg = profileImg;
    }

}