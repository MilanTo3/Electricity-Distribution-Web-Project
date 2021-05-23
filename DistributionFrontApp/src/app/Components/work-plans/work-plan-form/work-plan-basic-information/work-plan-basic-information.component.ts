import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WorkPlanServiceService } from 'src/app/Services/work-plan-service.service';
import { customFormValidators } from '../../../../Models/customValidators';
import * as moment from 'moment';


@Component({
  selector: 'app-work-plan-basic-information',
  templateUrl: './work-plan-basic-information.component.html',
  styleUrls: ['./work-plan-basic-information.component.css']
})
export class WorkPlanBasicInformationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private wp: WorkPlanServiceService) { }
  editMode = false;

  planBasicInfoForm  = this.formBuilder.group({
      type: ['', Validators.required],
      documentId: [''],
      status: ['', Validators.required],
      workRequestId: ['popunjeno', Validators.required],
      incidentId: ['popunjeno', Validators.required],
      street: ['', Validators.required],
      //locationId : [''],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      crewId: [0, Validators.required],
      user: ['popunjeno', Validators.required],
      company: ['', Validators.required],
      phoneNumber: ['',  [Validators.required, Validators.pattern('^[- +0-9]+$')]],
      createdDateTime: ['', Validators.required],
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
    else if (sessionStorage.getItem("planBasicInfoForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("planBasicInfoForm"));
      this.planBasicInfoForm.setValue(formdata);
    }
    this.onValueChanges();
  }

  onValueChanges(): void {
    this.planBasicInfoForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("planBasicInfoForm", JSON.stringify(this.planBasicInfoForm.value));
      sessionStorage.setItem("planBasicInfoFormValid", JSON.stringify(this.planBasicInfoForm.valid));
      
    })
  }
  
  getAndFill(id){

    this.wp.getBasicInformation(id).subscribe(
      res => {

        this.planBasicInfoForm.get('type').setValue(res["type"]);
        this.planBasicInfoForm.get('status').setValue(res["status"]);
        this.planBasicInfoForm.get('street').setValue(res["street"]);
        this.planBasicInfoForm.get('startDateTime').setValue(moment(res["startDateTime"]).format('YYYY-MM-DDTHH:mm'));
        this.planBasicInfoForm.get('user').setValue(res["user"]);
        this.planBasicInfoForm.get('createdDateTime').setValue(moment(res["createdDateTime"]).format('YYYY-MM-DDTHH:mm'));
        this.planBasicInfoForm.get('endDateTime').setValue(moment(res["endDateTime"]).format('YYYY-MM-DDTHH:mm'));
        this.planBasicInfoForm.get('workRequestId').setValue(res["workRequestId"]);
        this.planBasicInfoForm.get('incidentId').setValue(res["incidentId"]);
        this.planBasicInfoForm.get('phoneNumber').setValue(res["phoneNumber"]);
        this.planBasicInfoForm.get('purpose').setValue(res["purpose"]);
        this.planBasicInfoForm.get('details').setValue(res["details"]);
        this.planBasicInfoForm.get('notes').setValue(res["notes"]);
       // this.planBasicInfoForm.get('locationId').setValue(res["locationId"]);
        this.planBasicInfoForm.get('crewId').setValue(res["crewId"]);
        this.planBasicInfoForm.get('company').setValue(res["company"]);
      }
    );

  }
  saveChanges(){

    let id = sessionStorage.getItem("idDoc");
    this.planBasicInfoForm.get('documentId').setValue(id);
    this.wp.updateBasicInfo(this.planBasicInfoForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
