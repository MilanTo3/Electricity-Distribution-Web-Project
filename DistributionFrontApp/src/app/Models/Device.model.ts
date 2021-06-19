export class Device{

    id: number;
    name: string;
    type: string;
    longitude: number;
    latitude: number;
    address: string;

    constructor(id: number, name: string, type: string, longitude: number, latitude: number, address: string){
        
        this.id = id;
        this.name = name;
        this.type = type;
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;

    }

}