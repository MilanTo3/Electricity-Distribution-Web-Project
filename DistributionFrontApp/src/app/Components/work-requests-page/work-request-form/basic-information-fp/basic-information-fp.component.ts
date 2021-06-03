import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { WorkRequestServiceService } from 'src/app/Services/work-request-service.service';
import { customFormValidators } from '../../../../Models/customValidators';

@Component({
  selector: 'app-basic-information-fp',
  templateUrl: './basic-information-fp.component.html',
  styleUrls: ['./basic-information-fp.component.css']
})
export class BasicInformationFPComponent implements OnInit {

  editMode = false;
  readOnlyMode = false;
  infoForm = this.fb.group({
    type: ['Planned work'],
    documentId: [''],
    user: [''],
    street: ['', Validators.required],
    startDate: ['2001-11-01', Validators.required],
    dateCreated: ['2021-11-01'],
    endDate: ['2001-11-05', Validators.required],
    emergency: [false, Validators.required],
    company: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[- +0-9]+$')]],
    purpose: ['', Validators.required],
    details: ['', Validators.required],
    notes: ['']
  },
    { //Custom validacija.
      validator: Validators.compose([customFormValidators.dateLessThan('startDate', 'endDate', { 'dateError': true })])
    });

  constructor(private fb: FormBuilder, private wr: WorkRequestServiceService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("infoForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("infoForm"));
      this.infoForm.setValue(formdata);
    }
    if(sessionStorage.getItem("idDoc") !== null){
      let readDocId = sessionStorage.getItem("idDocReadOnly");
      if (readDocId!==null && readDocId.substring(0,2)=="WR")
      {
        this.getAndFill(sessionStorage.getItem("idDocReadOnly"));
        this.readOnlyMode = true;
        this.infoForm.disable();
      }
      else{
        this.getAndFill(sessionStorage.getItem("idDoc"));
        this.editMode = true;
      }

    }
    this.onValueChanges();
  }

  onValueChanges(): void {
    this.infoForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("infoForm", JSON.stringify(this.infoForm.value));
      sessionStorage.setItem("infoFormValid", JSON.stringify(this.infoForm.valid));
      
    })
  }

  saveChanges(){

    let id = sessionStorage.getItem("idDoc");
    this.infoForm.get('documentId').setValue(id);
    this.wr.updateBasicInfo(this.infoForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  getAndFill(id){

    this.wr.getBasicInformation(id).subscribe(
      res => {
        this.infoForm.get('type').setValue(res["type"]);
        this.infoForm.get('street').setValue(res["street"]);
        this.infoForm.get('startDate').setValue(moment(res["startDate"]).format('YYYY-MM-DDTHH:mm'));
        this.infoForm.get('user').setValue(res["user"]);
        this.infoForm.get('dateCreated').setValue(moment(res["dateCreated"]).format('YYYY-MM-DDTHH:mm'));
        this.infoForm.get('endDate').setValue(moment(res["endDate"]).format('YYYY-MM-DDTHH:mm'));
        this.infoForm.get('emergency').setValue(res["emergency"]);
        this.infoForm.get('company').setValue(res["company"]);
        this.infoForm.get('phoneNumber').setValue(res["phoneNumber"]);
        this.infoForm.get('purpose').setValue(res["purpose"]);
        this.infoForm.get('details').setValue(res["details"]);
        this.infoForm.get('notes').setValue(res["notes"]);
      }
    );

  }

  get endDateForm() {
    return this.infoForm.get('endDate');
  }

  get phoneNumber(){
    return this.infoForm.get('phoneNumber');
  }

}
