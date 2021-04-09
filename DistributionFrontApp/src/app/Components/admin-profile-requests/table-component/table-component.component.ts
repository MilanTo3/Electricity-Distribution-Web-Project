import { Component, Input, OnInit } from '@angular/core';
import { MyIncidents } from 'src/app/Models/MyIncidents.model';
import { User } from '../../../Models/User.model';
import { WorkRequest } from '../../../Models/WorkRequest.model';
import { HistoryStateChange } from '../../../Models/HistoryStateChange.model';
import { Device } from 'src/app/Models/Device.model';


@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {

  @Input('tableType') tableid:number = 0;
  keyNames: string[] = [];
  headerToPrint: string[] = [];
  dataToPrint: Array<any> = [];

  constructor() { }

  addMockRequests(){

    if(this.tableid === 0){
      this.loadProfileRequests();
    }else if(this.tableid === 1){
      this.loadWorkRequests();    
    }else if(this.tableid === 2){
      this.loadMyIncidents();
    }else if(this.tableid === 3){
      this.loadHistoryStateChanges();
    }else if(this.tableid === 4){
      this.loadDevices();
    }
    
  }

  loadProfileRequests(){

    let user1 = new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Administrator");
    let user2 = new User("Rukia", "Kuchiki", "kuchiki123@gmail.com", "Dispatcher");
    let user3 = new User("Jordan", "Peterson", "jordanpeterson@gmail.com", "Consumer");
    let user4 = new User("Petar" , "Bojovic", "petarbojovic@gmail.com", "Administrator");

    this.dataToPrint.push(user1, user2, user3, user4);
    this.keyNames = Object.getOwnPropertyNames(user4);

  }

  loadWorkRequests(){

    let request1 = new WorkRequest('WR-1', new Date(2021, 9, 1, 5, 5, 4, 22), "3989-434-343", "Draft", "Jevrejska 12a");
    let request2 = new WorkRequest("WR-2", new Date(2021, 4, 17, 15, 30, 0), "323-35345-2343", "Draft", "Marka Kraljevica 15");
    let request3 = new WorkRequest("WR-3", new Date(2021, 4, 23, 15, 50, 33), "349-553-855-12", "Draft", "Dragana Torbice 3");

    this.dataToPrint.push(request1, request2, request3);
    this.keyNames = Object.getOwnPropertyNames(request3);

  }

  loadMyIncidents() {
    let myIncident1 = new MyIncidents('WR-1', new Date(2021, 9, 1, 5, 5, 4, 22), "3989-434-343", "Executing", "Koste Racina 23");
    let myIncident2 = new MyIncidents('WR-1', new Date(2021, 10, 1, 11, 5, 4, 22), "3989-434-343", "Draft", "Cankareva 5");
    let myIncident3 = new MyIncidents("WR-3", new Date(2021, 4, 23, 15, 50, 33), "349-553-855-12", "Draft", "Dragana Torbice 3");

    this.dataToPrint.push(myIncident1, myIncident2, myIncident3);
    this.keyNames = Object.getOwnPropertyNames(myIncident3);
  }

  loadHistoryStateChanges(){

    let stateChange1 = new HistoryStateChange("Petar", "Bojovic", new Date(2021, 5, 25, 4, 33, 1, 20), "State changed to denied.");
    let stateChange2 = new HistoryStateChange("Petar", "Bojovic", new Date(2021, 4, 21, 21, 23, 22, 30), "State changed to approved.");

    this.dataToPrint.push(stateChange1, stateChange2);
    this.keyNames = Object.getOwnPropertyNames(stateChange2);

  }

  loadDevices() {
    let device1 = new Device(1321, "BRE_0", "Breaker", "41°24'12.2 N 2°10'26.5 E", "Cankareva 23");
    let device2 = new Device(4442, "BRE_1", "Breaker", "11°24'12.2 N 1°23'25.5 E", "Turgenjeva 2");
    let device3 = new Device(5131, "DIS_0", "Disconnector", "5°11'13.2 N 5°11'45.5 E", "Puskinova 17");

    this.dataToPrint.push(device1, device2, device3);
    this.keyNames = Object.getOwnPropertyNames(device3);
  }



  ngOnInit(): void{
    this.addMockRequests();
    
  }

}
