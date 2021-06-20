import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.css']
})
export class ResolutionComponent implements OnInit {

  editMode = false;
  readOnlyMode = false;
  resolutionForm = this.fb.group({
    cause: [''],
    subcause: [''],
    constructionType: [''],
    material: ['']
  });


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("resolutionForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("resolutionForm"));
      this.resolutionForm.setValue(formdata);
    }
    this.onValueChanges();
  }

   onValueChanges(): void {
    this.resolutionForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("resolutionForm", JSON.stringify(this.resolutionForm.value));
      sessionStorage.setItem("resolutionValid", JSON.stringify(this.resolutionForm.valid));
      
    })
  }

}
