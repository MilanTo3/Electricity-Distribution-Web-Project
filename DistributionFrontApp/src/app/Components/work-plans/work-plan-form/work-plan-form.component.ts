import { LoggedUser } from 'src/app/Models/LoggedUser.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  editMode = false;
  loggedUser: LoggedUser;
  constructor(private router: Router, private route: ActivatedRoute, private workPlanService: WorkPlanServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

    for (var i in sessionStorage) {
      if (i !== "loggedUser") {
        sessionStorage.removeItem(i);
      }
    }

    if (sessionStorage.getItem("idDocReadOnly") === null) {
      //sessionStorage.clear();
    }
    else {
      this.editMode = true; // kad se vraca iz WR
    }

    sessionStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));

    this.db.collection('images').delete();

    let id = this.route.snapshot.paramMap.get('idparam');
    if (id !== null && id !== undefined) {
      sessionStorage.setItem('idDoc', id);
      this.editMode = true;
    }
    this.router.navigateByUrl('/newWorkPlan/basic-information');
  }

  async onSubmit() {

    let check = JSON.parse(sessionStorage.getItem("planBasicInfoFormValid"));
    if (check === false || check === null) {
      this.router.navigateByUrl('/newWorkPlan/basic-information');
      this.showToastrWarning();
      return;
    }
    this.setInfoForm();
    this.setHistoryForm();
    await this.setMediaForm();
    this.setInstructionsForm();
    console.log(this.wrapper);

    this.workPlanService.postWorkRequest(this.wrapper).subscribe(
      res => {
        this.showToastrSuccess();
      }
    );

    this.router.navigateByUrl('/workPlans');

  }

  showToastrSuccess() {
    this.toastr.success('Your work plan has been successfuly sent.', 'Form successfuly sent.');
  }

  showToastrWarning() {
    this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');
  }

  setInfoForm() {
    let formdata = JSON.parse(sessionStorage.getItem("planBasicInfoForm"));
    this.wrapper.basicInformationForm = formdata;
  }

  setHistoryForm() {
    let formdata = JSON.parse(sessionStorage.getItem("historyStateForm"));
    this.wrapper.historyForm = formdata;
  }

  setMediaForm() {
    this.wrapper.mediaForm = [];
    this.db.collection('images').get().then(x => {
      let i;
      for (i = 0; i < x.length; i++) {
        this.wrapper.mediaForm.push(x[i]);
      }

    });
  }
  setInstructionsForm() {
    let formdata = JSON.parse(sessionStorage.getItem("WPSwitchingInstuctionsForm"));
    this.wrapper.switchingInstructionsForm = formdata;
  }
}
