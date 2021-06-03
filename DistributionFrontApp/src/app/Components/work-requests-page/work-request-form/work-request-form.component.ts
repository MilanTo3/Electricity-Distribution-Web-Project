import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Localbase from 'localbase';
import { WorkRequestWrapper } from '../../../Models/formWrappers';
import { ToastrService } from 'ngx-toastr';
import { WorkRequestServiceService } from '../../../Services/work-request-service.service';
import { pictureModel } from 'src/app/Models/pictureModel.model';

@Component({
  selector: 'app-work-request-form',
  templateUrl: './work-request-form.component.html',
  styleUrls: ['./work-request-form.component.css']
})
export class WorkRequestFormComponent implements OnInit {

  db = new Localbase('db');
  wrapper: WorkRequestWrapper = new WorkRequestWrapper();
  editMode = false;
  readOnlyMode = false;

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private workRequest: WorkRequestServiceService) { }

  ngOnInit(): void {
    let readDocId = sessionStorage.getItem("idDocReadOnly");
    if (readDocId!==null && readDocId.substring(0,2)=="WR")
    {
      this.readOnlyMode = true;
    }
    else
    {
      sessionStorage.clear();
      this.db.collection('images').delete();
      let id = this.route.snapshot.paramMap.get('idparam');
      if(id !== null && id !== undefined){
        sessionStorage.setItem('idDoc', id);
        this.editMode = true;
    }

    }
    this.router.navigateByUrl('/workRequestForm/basicInformation');
  }

  async onSubmit() {

    let check = JSON.parse(sessionStorage.getItem("infoFormValid"));
    if(check === false || check === null){
      this.router.navigateByUrl('/workRequestForm/basicInformation');
      this.showToastrWarning();
      return;
    }
    console.log(check);
    this.setInfoForm();
    this.setHistoryForm();
    await this.setMediaForm();
    console.log(this.wrapper);
    // Launch meh to backend!
    
    this.workRequest.postWorkRequest(this.wrapper).subscribe(
      res => {
        this.toastr.success('Yay! Form Successfully submitted.', 'Work Request submitted.');
      }
    );

    this.router.navigateByUrl('/workRequests');
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

  async setMediaForm(){
    this.wrapper.mediaForm = [];
    await this.db.collection('images').get().then(x => {
      let i;
      for (i = 0; i < x.length; i++) {
        this.wrapper.mediaForm.push(x[i]);
      }

    });
  }
}