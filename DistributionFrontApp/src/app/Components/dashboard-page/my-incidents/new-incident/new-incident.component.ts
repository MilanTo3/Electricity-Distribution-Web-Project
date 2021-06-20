import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MyIncidentWrapper } from 'src/app/Models/formWrappers';
import Localbase from 'localbase';
import { ToastrService } from 'ngx-toastr';
import { IncidentService } from 'src/app/Services/incident.service';


@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css'],
})
export class NewIncidentComponent implements OnInit {

  db = new Localbase('db');
  wrapper: MyIncidentWrapper = new MyIncidentWrapper();
  editMode = false;
  readOnlyMode = false;

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private incidentService: IncidentService) { }

  ngOnInit(): void {

    for (var i in sessionStorage) {
      if (i !== "loggedUser") {
        sessionStorage.removeItem(i);
      }
    }

     this.db.collection('images').delete();
    
    let id = this.route.snapshot.paramMap.get('idparam');
    if (id !== null && id !== undefined) {
      sessionStorage.setItem('idDoc', id);
      this.editMode = true;
    }

    this.router.navigateByUrl('/newIncident/basicInformation');

  }

  async onSubmit() {

    let checkFORM1 = JSON.parse(sessionStorage.getItem("infoFormValid"));
    let checkFORM2 = JSON.parse(sessionStorage.getItem("resolutionValid"));
    if(checkFORM1 === false || checkFORM1 === null){
      this.router.navigateByUrl('/newIncident/basicInformation');
      this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');
      return;
    }else if(checkFORM2 === false || checkFORM2 === null){
      this.router.navigateByUrl('/newIncident/resolution');
      this.toastr.warning('Seems like theres an error with resolution form input. Please check again.', 'Ooops!');
      return;
    }

    await this.setForms();
    this.incidentService.postIncident(this.wrapper).subscribe(
      res => {
        this.showToastrSuccess();
        this.router.navigateByUrl('/incidents');
      },
      err => {
        this.showToastrWarning();
      }
    );

  }

  showToastrSuccess(){
    
    this.toastr.success('Your incident has been successfuly sent.', 'Form successfuly sent.');

  }

  showToastrWarning(){
    this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');

  }

  async setForms(){
    let formdata1 = JSON.parse(sessionStorage.getItem("infoForm"));
    this.wrapper.infoForm = formdata1;
    let formdata2 = JSON.parse(sessionStorage.getItem("resolutionForm"));
    this.wrapper.resolutionForm = formdata2;
    this.wrapper.callIds = JSON.parse(sessionStorage.getItem("calls"));
    this.wrapper.devicesIds = JSON.parse(sessionStorage.getItem("devices"));
    this.wrapper.teamId = JSON.parse(sessionStorage.getItem("resolutionForm"));
    this.wrapper.teamId = JSON.parse(sessionStorage.getItem("chosenId"));
    await this.setMediaForm();

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