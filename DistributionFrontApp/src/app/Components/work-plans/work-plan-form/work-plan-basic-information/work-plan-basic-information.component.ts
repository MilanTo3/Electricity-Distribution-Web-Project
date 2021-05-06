import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { customFormValidators } from '../../../../Models/customValidators';


@Component({
  selector: 'app-work-plan-basic-information',
  templateUrl: './work-plan-basic-information.component.html',
  styleUrls: ['./work-plan-basic-information.component.css']
})
export class WorkPlanBasicInformationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

  planBasicInfoForm  = this.formBuilder.group({
      type: ['', Validators.required],
      status: ['', Validators.required],
      workRequestId: ['popunjeno', Validators.required],
      incidentId: ['popunjeno', Validators.required],
      street: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      crewId: ['', Validators.required],
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
    if (sessionStorage.getItem("planBasicInfoForm") !== null) {
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
}
