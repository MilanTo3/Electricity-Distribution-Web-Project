export class Device{

    id: number;
    name: string;
    type: string;
    coordinates: string;
    address: string;

    constructor(id: number, name: string, type: string, coordinates: string, address: string){
        
        this.id = id;
        this.name = name;
        this.type = type;
        this.coordinates = coordinates;
        this.address = address;

    }

}