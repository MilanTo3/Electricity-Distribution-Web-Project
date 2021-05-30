import { WorkPlanServiceService } from 'src/app/Services/work-plan-service.service';
import { Consumer } from './../../../Models/Consumer.model';
import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { changeRoleRequest } from 'src/app/Models/roleRequestChange.model';
import { WorkRequestServiceService } from 'src/app/Services/work-request-service.service';
import { TeamsServiceService } from '../../../Services/teams-service.service';
import { UserService } from '../../../Services/registration-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})

export class TableComponentComponent implements OnInit, AfterViewInit {

  @Input('tableType') tableid: number = 0;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) pagination: MatPaginator;
  keyNames: string[] = [];
  headerToPrint: string[] = [];
  dataToPrint: any = [];
  dataBind = new MatTableDataSource([]);
  baseLink: string;
  @Output() emitter = new EventEmitter<string>();

  hideElement = false;
  choose = false;

  emitId(id) {
    this.emitter.next(id);
  }

  constructor(public router: Router, private workRequestService: WorkRequestServiceService, private teamsService: TeamsServiceService, private workPlanService: WorkPlanServiceService, private registrattionService: UserService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/newIncident/crew') {
          this.hideElement = true;
        } else {
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

  async addMockRequests() {

    if (this.tableid === 0) {
      await this.loadProfileRequests();
    } else if (this.tableid === 1) {
      await this.loadWorkRequests();
    } else if (this.tableid === 2) {
      this.loadMyIncidents();
    } else if (this.tableid === 3) {
      await this.loadHistoryStateChanges();
    } else if (this.tableid === 4) {
      this.loadDevices();
    } else if (this.tableid === 5) {
      this.loadCalls();
    } else if (this.tableid === 6) {
      await this.loadWorkPlans();
    } else if (this.tableid === 7) {
      await this.loadTeams();
    } else if (this.tableid === 8) {
      this.loadMySafetyDocs();
    } else if (this.tableid === 9) {
      this.loadAllConsumers();
    } else if (this.tableid === 10) {
      this.loadRoleRequests();
    }

  }

  async approveOrDenyRegistration(username, op){

    let formdata: FormData = new FormData();
    formdata.append('username', username);
    formdata.append('op', op);
    await this.registrattionService.approveOrDenyRequest(formdata).toPromise();
    this.loadProfileRequests();

  }

  loadRoleRequests() {
    let user1 = new changeRoleRequest("Erik", "Dispatcher", "Administrator");
    let user2 = new changeRoleRequest("Rukia", "Dispatcher", "Dispatcher");
    let user3 = new changeRoleRequest("Jordan", "Consumer", "Administrator");

    this.dataToPrint.push(user1, user2, user3);
    this.keyNames = Object.getOwnPropertyNames(user3);
  }

  async loadTeams() {

    let res = await this.teamsService.getAllTeams().toPromise();
    this.dataToPrint = res;
    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(res[0]);
    this.enableView();
  }

  async loadProfileRequests() {

    let res = await this.registrattionService.getPendingUsers().toPromise();
    this.dataToPrint = res;
    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(res[0]);
    this.enableView();

  }

  async loadWorkRequests() {

    this.baseLink = "/workRequestForm";
    let res = await this.workRequestService.getAllBasicInfo().toPromise();

    let i;
    let wr;
    for (i = 0; i < res["length"]; i++) {
      wr = new WorkRequest(res[i]["documentId"], new Date(moment(res[i]["startDate"]).format('YYYY-MM-DD')), res[i]["phoneNumber"], "Draft", res[i]["street"]);
      this.dataToPrint.push(wr);
    }

    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(wr);

  }

  loadMyIncidents() {
    let myIncident1 = new MyIncidents('WR-1', new Date(2021, 9, 1, 5, 5, 4, 22), "3989-434-343", "Executing", "Koste Racina 23");
    let myIncident2 = new MyIncidents('WR-1', new Date(2021, 10, 1, 11, 5, 4, 22), "3989-434-343", "Draft", "Cankareva 5");
    let myIncident3 = new MyIncidents("WR-3", new Date(2021, 4, 23, 15, 50, 33), "349-553-855-12", "Draft", "Dragana Torbice 3");

    this.dataToPrint.push(myIncident1, myIncident2, myIncident3);
    this.keyNames = Object.getOwnPropertyNames(myIncident3);
  }

  async loadHistoryStateChanges() {

    if (sessionStorage.getItem('idDoc') === null) { return; }
    let res = await this.workRequestService.getHistoryState(sessionStorage.getItem('idDoc')).toPromise();

    if (res !== null || res !== undefined) {
      let i;
      let sc1: HistoryStateChange;
      for (i = 0; i < res["length"]; i++) {
        sc1 = new HistoryStateChange(res[i]["documentId"], res[i]["name"], new Date(moment(res[i]["dateChanged"]).format('YYYY-MM-DDTHH:mm')), res[i]["details"]);
        this.dataToPrint.push(sc1);
      }

      this.dataBind = new MatTableDataSource(this.dataToPrint);
      this.keyNames = Object.getOwnPropertyNames(sc1);
      this.enableView();
    }

  }

  loadDevices() {
    let device1 = new Device(1321, "BRE_0", "Breaker", "41°24'12.2 N 2°10'26.5 E", "Cankareva 23");
    let device2 = new Device(4442, "BRE_1", "Breaker", "11°24'12.2 N 1°23'25.5 E", "Turgenjeva 2");
    let device3 = new Device(5131, "DIS_0", "Disconnector", "5°11'13.2 N 5°11'45.5 E", "Puskinova 17");
    let device4 = new Device(1321, "BRE_0", "Breaker", "41°24'12.2 N 2°10'26.5 E", "Cankareva 23");

    this.dataToPrint.push(device1, device2, device3, device4);
    this.keyNames = Object.getOwnPropertyNames(device3);
  }

  async loadWorkPlans() {
    this.baseLink = "/newWorkPlan";
    let res = await this.workPlanService.getAllBasicInfo().toPromise();

    let i;
    let wp;
    for (i = 0; i < res["length"]; i++) {
      wp = new WorkPlan(res[i]["documentId"], new Date(moment(res[i]["startDate"]).format('YYYY-MM-DD')).toLocaleDateString(), res[i]["phoneNumber"], res[i]["status"], res[i]["street"]);
      this.dataToPrint.push(wp);
    }

    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(wp);

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
  loadAllConsumers() {
    let consumer1 = new Consumer("Erik", "Hoffstad", "grad, ulica i broj", "high", "065454215", "id naloga", "residential");
    let consumer2 = new Consumer("Rukia", "Kuchiki", "grad, ulica i broj", "low", "065454215", "id naloga", "residential");
    let consumer3 = new Consumer("Jordan", "Peterson", "grad, ulica i broj", "low", "065454215", "id naloga", "commertial");
    let consumer4 = new Consumer("Petar", "Bojovic", "grad, ulica i broj", "high", "065454215", "id naloga", "commertial");

    this.dataToPrint.push(consumer1, consumer2, consumer3, consumer4);
    this.keyNames = Object.getOwnPropertyNames(consumer4);
  }

  async ngOnInit(): Promise<void> {
    await this.addMockRequests();
    this.copyArray(this.keyNames, this.headerToPrint);
    if (this.tableid === 0 || this.tableid === 7 || this.tableid === 9 || this.tableid === 10 || this.tableid === 4) {
      this.headerToPrint.push("What to do?");
    }
    this.dataBind.data = this.dataToPrint;

  }

  ngAfterViewInit(): void {
    this.dataBind.paginator = this.pagination;
    this.dataBind.sort = this.sort;
  }

  callMethod(id) {
    this.router.navigate([this.baseLink, { idparam: id }]);
  }

  enableView() {
    this.copyArray(this.keyNames, this.headerToPrint);
    this.dataBind.paginator = this.pagination;
    this.dataBind.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataBind.filter = filterValue.trim().toLowerCase();
  }

  copyArray(arr1: string[], arr2: string[]) {
    let i;
    for (i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i]) === false) {
        arr2.push(arr1[i]);
      }
    }

  }

}