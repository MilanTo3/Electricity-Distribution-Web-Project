import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MyIncidents } from 'src/app/Models/MyIncidents.model';
import { User } from '../../../Models/User.model';
import { WorkRequest } from '../../../Models/WorkRequest.model';
import { HistoryStateChange } from '../../../Models/HistoryStateChange.model';
import { Device } from 'src/app/Models/Device.model';
import { WorkPlan } from '../../../Models/WorkPlan.model';
import { Call } from 'src/app/Models/Call.model';
import { Team } from 'src/app/Models/Team.model';
import { NavigationEnd, Router } from '@angular/router';
import { MySafetyDoc } from 'src/app/Models/MySafetyDoc.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})

export class TableComponentComponent implements OnInit, AfterViewInit {

  @Input('tableType') tableid:number = 0;
  @ViewChild(MatSort) sort: MatSort;
  keyNames: string[] = [];
  headerToPrint: string[] = [];
  dataToPrint: any = [];
  dataBind = new MatTableDataSource([]);

  hideElement = false;
  choose = false;

  constructor(public router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/newIncident/crew') {
          this.hideElement = true;
        }  else {
          this.hideElement = false;     
        }
        if ((event.url === '/teamsPage')) {
          this.choose = true;
        } else {
          this.choose = false;
        }

      }
    });
  }

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
    }else if(this.tableid === 5){
      this.loadCalls();
    }else if(this.tableid ===6){
      this.loadWorkPlans();
    }else if(this.tableid ===7){
      this.loadTeams();
    }else if(this.tableid === 8){
      this.loadMySafetyDocs();
    }

  }

  loadTeams(){

    let team1 = new Team("Team-1", "Dispatch Team Telep");
    let team2 = new Team("Team-2", "Dispatch Team Novo Naselje");
    let team3 = new Team("Team-3", "Dispatch Team Satelit");

    this.dataToPrint.push(team1, team2, team3);
    this.keyNames = Object.getOwnPropertyNames(team3);

  }

  loadProfileRequests(){

    let user1 = new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Administrator", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg");
    let user2 = new User("Rukia", "Kuchiki", "kuchiki123@gmail.com", "Dispatcher", "username1", "2019-01-16", "fejkadresfda", "/assets/Images/colorpattern.jpg");
    let user3 = new User("Jordan", "Peterson", "jordanpeterson@gmail.com", "Consumer", "username3", "2019-01-16", "fejkfdadresa", "/assets/Images/colorpattern.jpg");
    let user4 = new User("Petar" , "Bojovic", "petarbojovic@gmail.com", "Administrator", "username4", "2019-01-16", "fejkfadresa", "/assets/Images/colorpattern.jpg");

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

  loadWorkPlans(){
    let plan1 = new WorkPlan('WR-1', "2019-01-16", "3989-434-343", "Draft", "Jevrejska 12a");
    let plan2 = new WorkPlan("WR-2", "2019-01-16", "323-35345-2343", "Draft", "Marka Kraljevica 15");
    let plan3 = new WorkPlan("WR-3", "2019-01-16", "349-553-855-12", "Draft", "Dragana Torbice 3");

    this.dataToPrint.push(plan1, plan2, plan3);
    this.keyNames = Object.getOwnPropertyNames(plan3);
  }

  loadCalls() {
    let call1 = new Call(2412421, "No electricity for...", "Strong wind", "");
    let call2 = new Call(5555555, "No electricity for...", "Strong wind", "");
    let call3 = new Call(1112334, "No electricity for...", "Strong wind", "");

    this.dataToPrint.push(call1, call2, call3);
    this.keyNames = Object.getOwnPropertyNames(call3);

  }

  loadMySafetyDocs() {
    let doc1 = new MySafetyDoc('WR-1', "2019-01-16", "3989-434-343", "Draft", "Jevrejska 12a");
    let doc2 = new MySafetyDoc("WR-2", "2019-01-16", "323-35345-2343", "Draft", "Marka Kraljevica 15");
    let doc3 = new MySafetyDoc("WR-3", "2019-01-16", "349-553-855-12", "Draft", "Dragana Torbice 3");

    this.dataToPrint.push(doc1, doc2, doc3);
    this.keyNames = Object.getOwnPropertyNames(doc3);
  }

  ngOnInit(): void{
    this.addMockRequests();
    this.copyArray(this.keyNames, this.headerToPrint);
    if(this.tableid === 0 || this.tableid === 7){
      this.headerToPrint.push("What to do?");
    }
    this.dataBind.data = this.dataToPrint;

  }

  ngAfterViewInit(){
    this.dataBind.sort = this.sort;
  }

  copyArray(arr1: string[], arr2: string[]){
    let i;
    for(i = 0; i < arr1.length; i++){
      arr2.push(arr1[i]);
    }

  }

}