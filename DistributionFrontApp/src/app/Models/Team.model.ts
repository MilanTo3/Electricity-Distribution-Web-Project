import { User } from "./User.model";

export class Team{

    id: string;
    name: string;
    members: string[];

    constructor(idnum: string, name: string){
        this.id = idnum;
        this.name = name;
        this.members = [];
    }

}