import { Router } from '@angular/router';
import { WorkRequestServiceService } from 'src/app/Services/work-request-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WorkPlanServiceService } from 'src/app/Services/work-plan-service.service';
import { customFormValidators } from '../../../../Models/customValidators';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { LocationService } from 'src/app/Services/location.service';
import { LoggedUser } from 'src/app/Models/LoggedUser.model';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';
import { TeamsServiceService } from 'src/app/Services/teams-service.service';

@Component({
  selector: 'app-work-plan-basic-information',
  templateUrl: './work-plan-basic-information.component.html',
  styleUrls: ['./work-plan-basic-information.component.css']
})
export class WorkPlanBasicInformationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private wp: WorkPlanServiceService, private wr: WorkRequestServiceService, private locationService: LocationService,
    private tm: TeamsServiceService,
    private router: Router, private toastr: ToastrService) { }

  editMode = false;
  loggedInUser: LoggedUser;
  workRequests : any;
  addedWRs = [];
  filteredRequests: Observable<string[]>;
  locations : any;
  addedStreets = [];
  filteredStreets: Observable<string[]>;

  teams: any;
  addedTeams = [];
  filteredTeams: Observable<string[]>;

  planBasicInfoForm  = this.formBuilder.group({
      type: ['', Validators.required],
      documentId: [''],
      status: ['Draft', Validators.required],
      workRequestId: [''],
      incidentId: [''],
      street: [''],
      //locationId : [''],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      //crewId: [''],
      crewName: [''],
      user: ['', Validators.required],
      company: ['', Validators.required],
      phoneNumber: ['',  [Validators.required, Validators.pattern('^[- +0-9]+$')]],
      createdDateTime: ['2001-01-01', Validators.required],
      purpose: ['', Validators.required],
      notes: ['', Validators.required]
    },
    { //Custom validacija.
      validator: Validators.compose([customFormValidators.dateLessThan('startDateTime', 'endDateTime', { 'dateError': true })])
    });
   ngOnInit(): void {
    if(sessionStorage.getItem("idDoc") !== null){
      this.getAndFill(sessionStorage.getItem("idDoc"));
      this.editMode = true;
    }
    if (sessionStorage.getItem("planBasicInfoForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("planBasicInfoForm"));
      this.planBasicInfoForm.setValue(formdata);
    }
    this.onValueChanges();
    this.onWRChanges();
 

    this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.planBasicInfoForm.get('user').setValue(this.loggedInUser.username);

    this.wr.getAllBasicInfo().subscribe(
      res => {
        this.workRequests = res;
        this.workRequests.forEach(element => {
          this.addedWRs.push(element["documentId"]);        
        });
      }
    );

    this.filteredRequests = this.planBasicInfoForm.get('workRequestId').valueChanges.pipe(
      startWith(''),
      map(value => this._filterWRs(value))
    );

    this.tm.getAllTeams().subscribe(    //teams
      res => {
        this.teams = res;
        this.teams.forEach(element => {
          this.addedTeams.push(element["name"]) //uzimam imena od timova i upisujem ih addedTeams
        });
      }
    );

    this.filteredTeams = this.planBasicInfoForm.get('crewName').valueChanges.pipe(    //teams
      startWith(''),
      map(value => this._filterTeams(value))
    );

    this.locationService.GetLocations().subscribe(
      res => {
        this.locations = res;
        this.locations.forEach(element => {
          this.addedStreets.push(element["street"]);
        });
      }
    );

    this.filteredStreets = this.planBasicInfoForm.get('street').valueChanges.pipe(
      startWith(''),
      map(value => this._filterStreets(value))
    ); 
    }

  private _filterStreets(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.addedStreets.filter(street => this._normalizeValue(street).includes(filterValue));
  }
  private _filterWRs(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.addedWRs.filter(req => this._normalizeValue(req).includes(filterValue));
  }

  private _filterTeams(value: string): string[] {   //teams
    const filterValue = this._normalizeValue(value);
    return this.addedTeams.filter(crew => this._normalizeValue(crew).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }


  onValueChanges(): void {
    this.planBasicInfoForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("planBasicInfoForm", JSON.stringify(this.planBasicInfoForm.value));
      sessionStorage.setItem("planBasicInfoFormValid", JSON.stringify(this.planBasicInfoForm.valid));
    })
  }
  onWRChanges(): void{
    this.planBasicInfoForm.get('workRequestId').valueChanges.subscribe(val=>
      {       
        this.planBasicInfoForm.get('street').setValue(this.getStreet(this.planBasicInfoForm.get('workRequestId').value));
        this.planBasicInfoForm.get('incidentId').setValue(this.getIncident(this.planBasicInfoForm.get('workRequestId').value)); 
      }
    )
  }



  getStreet(wrDocumentId):string
  {
    let index = this.addedWRs.indexOf(wrDocumentId);     
    if (this.workRequests[index]["street"]!= undefined)
    
      return this.workRequests[index]["street"];
    else
      return "Work request does not have a street.";
  }
 
  

  getIncident(wrDocumentId):string
  {
    let index = this.addedWRs.indexOf(wrDocumentId); 
    if (this.workRequests[index]["incidentId"]!= undefined)
      return this.workRequests[index]["incidentId"];
    else
      return "Work request does not have a incident.";
  }



  getAndFill(id){
    if(sessionStorage.getItem("idDocReadOnly")!=null)
    {
      sessionStorage.removeItem("idDocReadOnly");
      sessionStorage.removeItem("infoForm");
      sessionStorage.removeItem("infoFormValid");

    }
    else
    {
      this.wp.getBasicInformation(id).subscribe(
        res => {
          this.planBasicInfoForm.get('type').setValue(res["type"]);
          this.planBasicInfoForm.get('status').setValue(res["status"]);
          this.planBasicInfoForm.get('street').setValue(res["street"]);
          this.planBasicInfoForm.get('startDateTime').setValue(moment(res["startDateTime"]).format('YYYY-MM-DD'));
          this.planBasicInfoForm.get('user').setValue(res["user"]);
          this.planBasicInfoForm.get('createdDateTime').setValue(moment(res["createdDateTime"]).format('YYYY-MM-DD'));
          this.planBasicInfoForm.get('endDateTime').setValue(moment(res["endDateTime"]).format('YYYY-MM-DD'));
          this.planBasicInfoForm.get('workRequestId').setValue(res["workRequestId"]);
          this.planBasicInfoForm.get('incidentId').setValue(res["incidentId"]);
          this.planBasicInfoForm.get('phoneNumber').setValue(res["phoneNumber"]);
          this.planBasicInfoForm.get('purpose').setValue(res["purpose"]);
          this.planBasicInfoForm.get('notes').setValue(res["notes"]);
          //this.planBasicInfoForm.get('locationId').setValue(res["locationId"]);
          //this.planBasicInfoForm.get('crewId').setValue(res["crewid"]);
          this.planBasicInfoForm.get('crewName').setValue(res["crewName"]);
          this.planBasicInfoForm.get('company').setValue(res["company"]);
        }
  
      );
    }
   
  }
  saveChanges(){
    if(this.planBasicInfoForm.get('type').value == 'Planned work')
    {
      this.planBasicInfoForm.get('workRequestId').setValue('no work request yet');
      this.planBasicInfoForm.get('incidentId').setValue('no incident yet');    
    }
    if (this.planBasicInfoForm.valid) {
      let id = sessionStorage.getItem("idDoc");
      this.planBasicInfoForm.get('documentId').setValue(id);
      this.planBasicInfoForm.get('user').setValue(JSON.parse(sessionStorage.getItem('loggedUser')).username);
      this.wp.updateBasicInfo(this.planBasicInfoForm.value).subscribe(
        res => {
          this.showToastrSuccess();
        },
        (err) => {
          if (err.status == 400)
            this.toastr.error(err.error, 'Modification Error');
          else
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
        }
      );
    } else {
      this.showToastrWarning();
    } 
  }

  OpenWR(){
     let id = this.planBasicInfoForm.get('workRequestId').value;
    if(id.length!==0 && id.trim() && this.addedWRs.indexOf(id) > -1)
    {
      sessionStorage.setItem('idDocReadOnly', id);
      this.router.navigate(['/workRequestForm', { idparam: id}]);   
    }
  }
  showToastrSuccess(){   
    this.toastr.success('Your work plan is updated.', 'Success!.');
  }

  showToastrWarning(){
    this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');
  }

}
