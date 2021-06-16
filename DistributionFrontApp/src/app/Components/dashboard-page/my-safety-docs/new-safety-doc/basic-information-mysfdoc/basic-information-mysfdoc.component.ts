import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SafetyDocumentServiceService } from 'src/app/Services/safety-document-service.service';

@Component({
  selector: 'app-basic-information-mysfdoc',
  templateUrl: './basic-information-mysfdoc.component.html',
  styleUrls: ['./basic-information-mysfdoc.component.css']
})
export class BasicInformationMysfdocComponent implements OnInit {

  editMode = false;
  readOnlyMode = false;
  infoForm = this.fb.group({
    type: ['Planned work'],
    documentId: [''],
    user: [''],
    crew: [0],
    details: ['', Validators.required],
    notes: [''],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[- +0-9]+$')]],
    dateCreated: [formatDate(new Date(), "yyyy-MM-dd", "en").toString()]
  });

  constructor(private fb: FormBuilder, private sd: SafetyDocumentServiceService) { }

  ngOnInit(): void {

    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.infoForm.get('user').setValue(loggedInUser.username);

    if(sessionStorage.getItem("infoForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("infoForm"));
      this.infoForm.setValue(formdata);
    }
    if(sessionStorage.getItem("idDoc") !== null){
      let readDocId = sessionStorage.getItem("idDocReadOnly");
      if (readDocId!==null && readDocId.substring(0,2)=="SD")
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
    this.sd.updateBasicInfo(this.infoForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  getAndFill(id) {

    this.sd.getBasicInformation(id).subscribe(
      res => {
        this.infoForm.get('type').setValue(res["type"]);
        this.infoForm.get('user').setValue(res["user"]);
        this.infoForm.get('crew').setValue(res["crew"]);
        this.infoForm.get('details').setValue(res["details"]);
        this.infoForm.get('notes').setValue(res["notes"]);
        this.infoForm.get('phoneNumber').setValue(res["phoneNumber"]);
        this.infoForm.get('dateCreated').setValue(moment(res["dateCreated"]).format('YYYY-MM-DDTHH:mm'));
      }
    );
  }

  get phoneNumber(){
    return this.infoForm.get('phoneNumber');
  }


}
