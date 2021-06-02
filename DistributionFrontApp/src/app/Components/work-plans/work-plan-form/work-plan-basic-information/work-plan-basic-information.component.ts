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

@Component({
  selector: 'app-work-plan-basic-information',
  templateUrl: './work-plan-basic-information.component.html',
  styleUrls: ['./work-plan-basic-information.component.css']
})
export class WorkPlanBasicInformationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private wp: WorkPlanServiceService, private wr: WorkRequestServiceService, private locationService: LocationService) { }
  editMode = false;
  loggedInUser: LoggedUser;
  workRequests : any;
  addedWRs = [];
  filteredRequests: Observable<string[]>;
  locations : any;
  addedStreets = [];
  filteredStreets: Observable<string[]>;

  planBasicInfoForm  = this.formBuilder.group({
      type: ['', Validators.required],
      documentId: ['id'],
      status: ['Draft', Validators.required],
      workRequestId: ['id', Validators.required],
      incidentId: ['id', Validators.required],
      street: [''],
      //locationId : [''],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      crewId: [0, Validators.required],
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
        this.workRequests.forEach(element => {
          this.addedWRs.push(element["documentId"]);
        });
      }
    );
    this.filteredRequests = this.planBasicInfoForm.get('workRequestId').valueChanges.pipe(
      startWith(''),
      map(value => this._filterWRs(value))
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
        this.planBasicInfoForm.get('crewId').setValue(res["crewId"]);
        this.planBasicInfoForm.get('company').setValue(res["company"]);
      }

    );
  }
  saveChanges(){

    let id = sessionStorage.getItem("idDoc");
    this.planBasicInfoForm.get('documentId').setValue(id);
    this.planBasicInfoForm.get('user').setValue(JSON.parse(sessionStorage.getItem('loggedUser')).username);
    this.wp.updateBasicInfo(this.planBasicInfoForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
