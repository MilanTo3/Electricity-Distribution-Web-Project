import { User } from "./User.model";

export class Team{

    id: string;
    name: string;
    members: User[];

    constructor(idnum: string, name: string){
        this.id = idnum;
        this.name = name;
        this.members = [];
    }

}