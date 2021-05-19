import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Localbase from 'localbase';
import { WorkPlanWrapper } from '../../../Models/formWrappers';
import { ToastrService } from 'ngx-toastr';
import { WorkPlanServiceService } from 'src/app/Services/work-plan-service.service';

@Component({
  selector: 'app-work-plan-form',
  templateUrl: './work-plan-form.component.html',
  styleUrls: ['./work-plan-form.component.css']
})
export class WorkPlanFormComponent implements OnInit {
  db = new Localbase('db');
  wrapper: WorkPlanWrapper = new WorkPlanWrapper();
  constructor(private router: Router, private workPlanService: WorkPlanServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.db.collection('images').delete();
    this.db.collection('files').delete();
    this.router.navigateByUrl('/newWorkPlan/basic-information');
  }

  onSubmit() {

    let check = JSON.parse(sessionStorage.getItem("planBasicInfoFormValid"));
    if(check === false || check === null){
      this.router.navigateByUrl('/newWorkPlan/basic-information');
      this.showToastrWarning();
      return;
    }
    this.setInfoForm();
    this.setHistoryForm();
    this.setMediaForm();
    this.setInstructionsForm();
    this.showToastrSuccess();
    console.log(this.wrapper);

    this.workPlanService.postWorkRequest(this.wrapper).subscribe(
      res => {
        console.log(res);
      }
    );

    this.router.navigateByUrl('/workPlans');

  }

  showToastrSuccess(){   
    this.toastr.success('Your work plan has been successfuly sent.', 'Form successfuly sent.');
  }

  showToastrWarning(){
    this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');
  }

  setInfoForm(){
    let formdata = JSON.parse(sessionStorage.getItem("planBasicInfoForm"));
    this.wrapper.basicInformationForm = formdata;
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
  setInstructionsForm(){
    let formdata = JSON.parse(sessionStorage.getItem("WPSwitchingInstuctionsForm"));
    this.wrapper.switchingInstructionsForm = formdata;
  }
}
