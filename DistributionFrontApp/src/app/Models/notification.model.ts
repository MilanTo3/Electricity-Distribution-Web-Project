export class Notification{
    type: string;
    content: string;
    seen: boolean;

    constructor(type: string, content: string, seen: boolean){
        this.type = type;
        this.content = content;
        this.seen = seen;

    }
}