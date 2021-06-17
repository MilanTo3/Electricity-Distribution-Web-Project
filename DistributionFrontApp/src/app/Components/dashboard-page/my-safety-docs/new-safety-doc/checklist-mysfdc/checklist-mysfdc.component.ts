import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SafetyDocumentServiceService } from 'src/app/Services/safety-document-service.service';

@Component({
  selector: 'app-checklist-mysfdc',
  templateUrl: './checklist-mysfdc.component.html',
  styleUrls: ['./checklist-mysfdc.component.css']
})
export class ChecklistMysfdcComponent implements OnInit {

  editMode = false;
  checkListForm = this.fb.group({
    documentId: [''],
    firstCheck: [false],
    secondCheck: [false],
    thirdCheck: [false],
    fourthCheck: [false]
  });

  constructor(private fb: FormBuilder, private sd: SafetyDocumentServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("idDoc") !== null){
      this.getAndFill(sessionStorage.getItem("idDoc"));
      this.editMode = true;
    }

    if(sessionStorage.getItem("checkListForm") != null) {
      let formData = JSON.parse(sessionStorage.getItem("checkListForm"));
      this.checkListForm.setValue(formData);
    }
    this.onValueChanges();
  }

  onValueChanges(): void {
    this.checkListForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("checkListForm", JSON.stringify(this.checkListForm.value));
      sessionStorage.setItem("checkListFormValid", JSON.stringify(this.checkListForm.valid));
      
    })
  }

  getAndFill(id) {
    this.sd.getCheckList(id).subscribe(
      res => {
        this.checkListForm.get('firstCheck').setValue(res["firstCheck"]);
        this.checkListForm.get('secondCheck').setValue(res["secondCheck"]);
        this.checkListForm.get('thirdCheck').setValue(res["thirdCheck"]);
        this.checkListForm.get('fourthCheck').setValue(res["fourthCheck"]);
      }
    );
 
  }

  saveChanges(){

    let id = sessionStorage.getItem("idDoc");
    this.checkListForm.get('documentId').setValue(id);
    this.sd.updateCheckList(this.checkListForm.value).subscribe(
      res => {
        console.log(res);
        this.showToastrSuccess();
      }
    );
  }

  showToastrSuccess(){   
    this.toastr.success('Your changes are successfuly sent.', 'Yay.');
  }
}


//checkListForm