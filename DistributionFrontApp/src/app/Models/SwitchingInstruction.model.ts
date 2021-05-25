export class SwitchingInstruction{

    documentId: string;
    id: number;
    status: string;
    name: string;

    constructor(name: string, status: string, id : number, documentId: string){
        
        this.name = name;
        this.status = status;
        this.id = id;
        this.documentId = documentId;
    }

}