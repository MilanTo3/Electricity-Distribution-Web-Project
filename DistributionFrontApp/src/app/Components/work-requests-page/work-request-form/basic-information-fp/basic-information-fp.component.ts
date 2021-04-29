import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-information-fp',
  templateUrl: './basic-information-fp.component.html',
  styleUrls: ['./basic-information-fp.component.css']
})
export class BasicInformationFPComponent implements OnInit {

  infoForm = new FormGroup({
    type: new FormControl(''),
    street: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    emergency: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required)
  })

  constructor() { }

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

}
