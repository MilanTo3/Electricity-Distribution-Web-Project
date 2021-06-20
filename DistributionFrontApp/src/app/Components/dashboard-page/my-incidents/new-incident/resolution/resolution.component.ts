import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IncidentService } from 'src/app/Services/incident.service';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private fb: FormBuilder, private inc: IncidentService, private toastr: ToastrService) { }

  ngOnInit(): void {

     if(sessionStorage.getItem("idDoc") !== null){
      this.getAndFill(sessionStorage.getItem("idDoc"));
      this.editMode = true;
    }

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

  getAndFill(id) {
    this.inc.getResolutionList(id).subscribe (
      res => {
        this.resolutionForm.get('cause').setValue(res["cause"]);
        this.resolutionForm.get('subcause').setValue(res["subcause"]);
        this.resolutionForm.get('constructionType').setValue(res["constructionType"]);
        this.resolutionForm.get('material').setValue(res["material"]);
      }
    );
  }

  showToastrSuccess(){   
    this.toastr.success('Your changes are successfuly sent.', 'Yay.');
  }

}
