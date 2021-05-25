import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-information-mysfdoc',
  templateUrl: './basic-information-mysfdoc.component.html',
  styleUrls: ['./basic-information-mysfdoc.component.css']
})
export class BasicInformationMysfdocComponent implements OnInit {

  editMode = false;
  infoForm = this.fb.group({
    type: ['Planned work'],
    documentId: [''],
    user: [''],
    crew: [''],
    details: ['', Validators.required],
    notes: [''],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[- +0-9]+$')]],
    dateCreated: [new Date().getUTCDate()]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    /*if(sessionStorage.getItem("idDoc") !== null){
      this.getAndFill(sessionStorage.getItem("idDoc"));
      this.editMode = true;
    }else */
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

  /*saveChanges(){

    let id = sessionStorage.getItem("idDoc");
    this.infoForm.get('documentId').setValue(id);
    this.wr.updateBasicInfo(this.infoForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }*/

  get phoneNumber(){
    return this.infoForm.get('phoneNumber');
  }


}
