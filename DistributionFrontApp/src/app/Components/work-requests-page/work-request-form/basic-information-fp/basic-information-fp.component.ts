import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { customFormValidators } from '../../../../Models/customValidators';

@Component({
  selector: 'app-basic-information-fp',
  templateUrl: './basic-information-fp.component.html',
  styleUrls: ['./basic-information-fp.component.css']
})
export class BasicInformationFPComponent implements OnInit {

  infoForm = this.fb.group({
    type: ['Planned work'],
    street: ['', Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    emergency: ['false', Validators.required],
    company: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[- +0-9]+$')]],
    purpose: ['', Validators.required],
    details: ['', Validators.required],
    notes: [('')]
  },
    { //Custom validacija.
      validator: Validators.compose([customFormValidators.dateLessThan('startDate', 'endDate', { 'dateError': true })])
    });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("infoForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("infoForm"));
      this.infoForm.setValue(formdata);
    }
    this.onValueChanges();
  }

  onValueChanges(): void {
    this.infoForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("infoForm", JSON.stringify(this.infoForm.value));
      sessionStorage.setItem("infoFormValid", JSON.stringify(this.infoForm.valid));
      
    })
  }

  get endDateForm() {
    return this.infoForm.get('endDate');
  }

  get phoneNumber(){
    return this.infoForm.get('phoneNumber');
  }

}
