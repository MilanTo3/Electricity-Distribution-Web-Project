import { Component, Input, OnInit } from '@angular/core';
import { MyIncidents } from 'src/app/Models/MyIncidents.model';
import { User } from '../../../Models/User.model';
import { WorkRequest } from '../../../Models/WorkRequest.model';

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
    let myIncident3 = new WorkRequest("WR-3", new Date(2021, 4, 23, 15, 50, 33), "349-553-855-12", "Draft", "Dragana Torbice 3");

    this.dataToPrint.push(myIncident1, myIncident2, myIncident3);
    this.keyNames = Object.getOwnPropertyNames(myIncident3);
  }

  ngOnInit(): void{
    this.addMockRequests();
    
  }

}
