import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customFormValidators } from 'src/app/Models/customValidators';


@Component({
  selector: 'app-basic-information-incident',
  templateUrl: './basic-information-incident.component.html',
  styleUrls: ['./basic-information-incident.component.css']
})
export class BasicInformationIncidentComponent implements OnInit {

  editMode = false;
  readOnlyMode = false;
  infoForm = this.fb.group({
    type: ['Planned work'],
    documentId: [''],
    dispatcher: [''],
    status: ['Draft'],
    emergency: [false, Validators.required],
    confirmed: [false, Validators.required],
    ETA: ['', Validators.required],
    ATA: ['', Validators.required],
    incidentTime: ['', Validators.required],
    ETR: ['', Validators.required],
    affectedCustoms: ['', Validators.required],
    callNum: ['', Validators.required],
    voltage: ['', Validators.required],
    scheduledTime: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("infoForm") !== null) {
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