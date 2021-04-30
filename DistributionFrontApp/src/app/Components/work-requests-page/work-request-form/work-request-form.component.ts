import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import Localbase from 'localbase';
import { WorkRequestWrapper } from '../../../Models/formWrappers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-work-request-form',
  templateUrl: './work-request-form.component.html',
  styleUrls: ['./work-request-form.component.css']
})
export class WorkRequestFormComponent implements OnInit {

  db = new Localbase('db');
  wrapper: WorkRequestWrapper = new WorkRequestWrapper();

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.db.collection('images').delete();
    this.router.navigateByUrl('/workRequestForm/basicInformation');
  }

  onSubmit() {

    let check = JSON.parse(sessionStorage.getItem("infoFormValid"));
    if(check === false || check === null){
      this.router.navigateByUrl('/workRequestForm/basicInformation');
      this.showToastrWarning();
      return;
    }
    console.log(check);
    this.setInfoForm();
    this.setHistoryForm();
    this.setMediaForm();
    console.log(this.wrapper);
    this.showToastrSuccess();
    this.router.navigateByUrl('/workRequests');
    // Launch meh to backend!

  }

  showToastrSuccess(){
    
    this.toastr.success('Your work request has been successfuly sent.', 'Form successfuly sent.');

  }

  showToastrWarning(){
    this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');

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