import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checklist-mysfdc',
  templateUrl: './checklist-mysfdc.component.html',
  styleUrls: ['./checklist-mysfdc.component.css']
})
export class ChecklistMysfdcComponent implements OnInit {

  checkListForm = this.fb.group({
    firstCheck: [''],
    secondCheck: [''],
    thirdCheck: [''],
    fourthCheck: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("checkListForm") != null) {
      let formData = JSON.parse(sessionStorage.getItem("checkListForm"));
      this.checkListForm.setValue(formData);
    }
    this.onValueChanges();
  }

  onValueChanges(): void {
    this.checkListForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("checkListForm", JSON.stringify(this.checkListForm.value));
      sessionStorage.setItem("infoFormValid", JSON.stringify(this.checkListForm.valid));
      
    })
  }

}


//checkListForm