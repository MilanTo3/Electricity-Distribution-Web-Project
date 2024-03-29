import { clearAllProjections } from 'ol/proj';
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
import { LoggedUser } from 'src/app/Models/LoggedUser.model';
import { ConsumerService } from 'src/app/Services/consumer.service';
import { SafetyDocumentServiceService } from 'src/app/Services/safety-document-service.service';
import { DeviceService } from 'src/app/Services/device.service';
import { CallService } from 'src/app/Services/call.service';
import { IncidentService } from 'src/app/Services/incident.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})

export class TableComponentComponent implements OnInit, AfterViewInit {

  @Input('tableType') tableid: number = 0;
  @Input('showMine') showMine?: boolean; //opcioni parametar za prikaz samo svojih
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) pagination: MatPaginator;
  keyNames: string[] = [];
  headerToPrint: string[] = [];
  dataToPrint: any = [];
  dataBind = new MatTableDataSource([]);
  baseLink: string;
  @Output() emitter = new EventEmitter<string>();

  searchDeviceForm : FormGroup;
  deviceTypeFormControl = new FormControl('Any');
  deviceAddressFormControl = new FormControl('');

  hideElement = false;
  choose = false;

  emitId(id) {
    this.emitter.next(id);
  }

  constructor(public router: Router, private workRequestService: WorkRequestServiceService, private teamsService: TeamsServiceService,
    private workPlanService: WorkPlanServiceService, private safetyDocService: SafetyDocumentServiceService,
    private registrattionService: UserService, private deviceService: DeviceService, private callService: CallService, private incidentService: IncidentService,
    private consumerService: ConsumerService, private formBuilder: FormBuilder) {
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
       this.searchDeviceForm = formBuilder.group(
        {
          deviceTypeFormControl: this.deviceTypeFormControl,
          deviceAddressFormControl : this.deviceAddressFormControl
        }
      )
    });
  }

  async addMockRequests() {

    if (this.tableid === 0) {
      await this.loadProfileRequests();
    } else if (this.tableid === 1) {
      await this.loadWorkRequests();
    } else if (this.tableid === 2) {
      await this.loadIncidents();
    } else if (this.tableid === 3) {
      await this.loadHistoryStateChanges();
    } else if (this.tableid === 4) {
      await this.loadDevices();
    } else if (this.tableid === 5) {
      this.loadCalls();
    } else if (this.tableid === 6) {
      await this.loadWorkPlans();
    } else if (this.tableid === 7) {
      await this.loadTeams();
    } else if (this.tableid === 8) {
       await this.loadMySafetyDocs();  
    } else if (this.tableid === 9) {
      await this.loadAllConsumers();
    } else if (this.tableid === 10) {
      await this.loadRoleRequests();
    }

  }
  async ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    //Write your code here
    if (this.tableid === 6) {
      await this.loadWorkPlans();
    } else if(this.tableid === 8) {
      await this.loadMySafetyDocs();
    }

  }

  async approveOrDenyRegistration(username, role, op) {

    if ((role != 'Consumer') || op == 1) //bilo koji se odbija svakako, ako je consumer i odobrava se onda redirekt
    {
      let formdata: FormData = new FormData();
      formdata.append('username', username);
      formdata.append('op', op);
      await this.registrattionService.approveOrDenyRequest(formdata).toPromise();
      this.loadProfileRequests();
    }
    else {
      this.router.navigate(['/new-consumer', username]);
    }

  }

  async loadRoleRequests() {

    let res = await this.registrattionService.getRoleRequests().toPromise();
    this.dataToPrint = res;
    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(res[0]);
    this.enableView();
  }
  async ApproveOrDenyRoleRequest(username, op) {

    let formdata: FormData = new FormData();
    formdata.append('username', username);
    formdata.append('op', op);
    await this.registrattionService.approveOrDenyRoleRequest(formdata).toPromise();
    this.loadRoleRequests();

  }

  
  async loadDevices() {
   
    let res = await this.deviceService.GetDevices().toPromise();
    this.dataToPrint = res;
    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(res[0]);
    this.enableView();
    
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
    let res;

    if (this.showMine) {
      res = await this.workRequestService.getMineBasicInfo().toPromise();
    }
    else {
      res = await this.workRequestService.getAllBasicInfo().toPromise();
    }

    if (res) {
      let i;
      let wr;
      for (i = 0; i < res["length"]; i++) {
        wr = new WorkRequest(res[i]["documentId"], new Date(moment(res[i]["startDate"]).format('YYYY-MM-DD')), res[i]["phoneNumber"], "Draft", res[i]["street"]);
        this.dataToPrint.push(wr);
      }

      this.dataBind = new MatTableDataSource(this.dataToPrint);
      this.keyNames = Object.getOwnPropertyNames(wr);
      this.enableView();
    }
  }

  async loadWorkPlans() {
    this.baseLink = "/newWorkPlan";
    let res;
    const data = [];

    if (this.showMine) {
      res = await this.workPlanService.getMineBasicInfo().toPromise();
    }
    else {
      res = await this.workPlanService.getAllBasicInfo().toPromise();
    }

    if (res) {
      let i;
      let wp;
      for (i = 0; i < res["length"]; i++) {
        wp = new WorkPlan(res[i]["documentId"], new Date(moment(res[i]["startDate"]).format('YYYY-MM-DD')).toLocaleDateString(), res[i]["phoneNumber"], res[i]["status"], res[i]["street"]);
        data.push(wp);
      }
      this.dataToPrint = data;
      this.dataBind = new MatTableDataSource(this.dataToPrint);
      this.keyNames = Object.getOwnPropertyNames(wp);
      this.enableView();
    }

  }

  async loadMySafetyDocs() {
    this.baseLink = "/newMySafetyDoc";
    let res;
    const data = [];

    if (this.showMine) {
      res = await this.safetyDocService.getMineBasicInfo().toPromise();
    }
    else {
      res = await this.safetyDocService.getAllBasicInfo().toPromise();
    }

    if (res) {
      let i;
      let sd;
      for (i = 0; i < res["length"]; i++) {
        sd = new MySafetyDoc(res[i]["documentId"], new Date(moment(res[i]["dateCreated"]).format('YYYY-MM-DD')), res[i]["phoneNumber"], res[i]["type"]);
        data.push(sd);
      }
      this.dataToPrint = data;
      this.dataBind = new MatTableDataSource(this.dataToPrint);
      this.keyNames = Object.getOwnPropertyNames(sd);

      this.enableView();
    }

  }

   async loadIncidents() {

      this.baseLink = "/newIncident";
      let res;
      const data = [];

      if (this.showMine) {
        res = await this.incidentService.getMineBasicInfo().toPromise();
      }
      else {
        res = await this.incidentService.getAllBasicInfo().toPromise();
      }

      if (res) {
        let i;
        let inc;
        for (i = 0; i < res["length"]; i++) {
          inc = new MyIncidents(res[i]["documentId"], new Date(moment(res[i]["incidentTime"]).format('YYYY-MM-DDTHH:mm')), res[i]["type"], res[i]["status"], res[i]["callNum"]);
          data.push(inc);
        }
        this.dataToPrint = data;
        this.dataBind = new MatTableDataSource(this.dataToPrint);
        this.keyNames = Object.getOwnPropertyNames(inc);

        this.enableView();
    }
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


  async loadCalls() {


  }

  async loadAllConsumers() {
    this.baseLink = "/new-consumer";
    let res = await this.consumerService.GetConsumers().toPromise();
    this.dataToPrint = res;
    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(res[0]);
    this.enableView();
  }

  async ngOnInit(): Promise<void> {
    await this.addMockRequests();
    this.copyArray(this.keyNames, this.headerToPrint);
    if (this.tableid === 0 || this.tableid === 7 || this.tableid === 10 || this.tableid === 4) {
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
  callMethodUser(user) {
    sessionStorage.setItem('consumer', user);
    this.router.navigate([this.baseLink, user]);
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

  reloadCurrentPage() {
    window.location.reload();
   }


  async seachDevices() {   
    let address = this.searchDeviceForm.get('deviceAddressFormControl').value;
    let type = this.searchDeviceForm.get('deviceTypeFormControl').value;
    
    let res = await this.deviceService.SearchDevices(address, type).toPromise();
    this.dataToPrint = res;
    this.dataBind = new MatTableDataSource(this.dataToPrint);
    this.keyNames = Object.getOwnPropertyNames(res[0]);
    this.enableView();
   }

}