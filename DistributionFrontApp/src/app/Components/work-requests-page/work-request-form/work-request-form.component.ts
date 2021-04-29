import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import Localbase from 'localbase';
import { WorkRequestWrapper } from '../../../Models/formWrappers';

@Component({
  selector: 'app-work-request-form',
  templateUrl: './work-request-form.component.html',
  styleUrls: ['./work-request-form.component.css']
})
export class WorkRequestFormComponent implements OnInit {

  db = new Localbase('db');
  wrapper: WorkRequestWrapper = new WorkRequestWrapper();

  constructor() { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.db.collection('images').delete();
  }

  onSubmit() {

    let check = JSON.parse(sessionStorage.getItem("infoFormValid"));
    this.setInfoForm();
    this.setHistoryForm();
    this.setMediaForm();
    console.log(this.wrapper);
    // Launch meh to backend!

  }

  setInfoForm(){
    let formdata = JSON.parse(sessionStorage.getItem("infoForm"));
    this.wrapper.infoForm = formdata;
  }

  setHistoryForm(){
    let formdata = JSON.parse(sessionStorage.getItem("historyStateForm"));
    this.wrapper.historyForm = formdata;
  }

  setMediaForm(){
    this.wrapper.mediaForm = [];
    this.db.collection('images').get().then(x => {
      let i;
      for (i = 0; i < x.length; i++) {
        this.wrapper.mediaForm.push(x[i]);
      }

    });
  }

}
