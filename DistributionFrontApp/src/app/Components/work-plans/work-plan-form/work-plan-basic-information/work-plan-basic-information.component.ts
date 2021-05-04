import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { customFormValidators } from '../../../../Models/customValidators';


@Component({
  selector: 'app-work-plan-basic-information',
  templateUrl: './work-plan-basic-information.component.html',
  styleUrls: ['./work-plan-basic-information.component.css']
})
export class WorkPlanBasicInformationComponent implements OnInit {
  planBasicInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.planBasicInfoForm  = this.formBuilder.group({
      type: ['', Validators.required],
      status: ['', Validators.required],
      workRequestId: ['', Validators.required],
      incidentId: ['', Validators.required],
      street: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      crewId: ['', Validators.required],
      user: ['', Validators.required],
      company: ['', Validators.required],
      phoneNumber: ['',  [Validators.required, Validators.pattern('^[- +0-9]+$')]],
      createdDateTime: ['', Validators.required],
      purpose: ['', Validators.required],
      notes: ['', Validators.required]
    },
    { //Custom validacija.
      validator: Validators.compose([customFormValidators.dateLessThan('startDateTime', 'endDateTime', { 'dateError': true })])
    });
  }
  onSubmit(): void {
  }
}
