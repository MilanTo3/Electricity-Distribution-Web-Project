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

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private workRequest: WorkRequestServiceService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.db.collection('images').delete();
    this.db.collection('files').delete();

    let id = this.route.snapshot.paramMap.get('idparam');
    if(id !== null && id !== undefined){
      sessionStorage.setItem('idDoc', id);
      this.editMode = true;
    }
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
    // Launch meh to backend!

    this.workRequest.postWorkRequest(this.wrapper).subscribe(
      res => {
        let formdata: FormData = new FormData();
        let i;
        for(i = 0; i < this.wrapper.mediaForm.length; i++){
          formdata.append('mediaForm', this.wrapper.mediaForm[i]);
        }
        formdata.append('id', String(res));
        
        this.workRequest.sendAttachments(formdata).subscribe(
          res => {
            this.showToastrSuccess();
          },
          err => {
            this.toastr.error('Error uploading attachments', 'Error');
          }
        );
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

  setMediaForm(){
    this.wrapper.mediaForm = [];
    this.db.collection('files').get().then(x => {
      let i;
      for (i = 0; i < x.length; i++) {
        this.wrapper.mediaForm.push(x[i]);
      }

    });
  }

}