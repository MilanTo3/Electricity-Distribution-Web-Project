import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customFormValidators } from 'src/app/Models/customValidators';
import { IncidentService } from 'src/app/Services/incident.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-basic-information-incident',
  templateUrl: './basic-information-incident.component.html',
  styleUrls: ['./basic-information-incident.component.css']
})
export class BasicInformationIncidentComponent implements OnInit {

  editMode = false;
  readOnlyMode = false;
  infoForm = this.fb.group({
    type: ['Planned work'],
    documentId: [''],
    dispatcher: [''],
    status: ['Draft'],
    emergency: [false, Validators.required],
    confirmed: [false, Validators.required],
    ETA: ['', Validators.required],
    ATA: ['', Validators.required],
    incidentTime: ['', Validators.required],
    ETR: ['', Validators.required],
    affectedCustoms: ['', Validators.required],
    callNum: ['', Validators.required],
    voltage: ['', Validators.required],
    scheduledTime: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private inc: IncidentService) { }

  ngOnInit(): void {

    /*let loggedInUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.infoForm.get('user').setValue(loggedInUser.username);*/

    if(sessionStorage.getItem("infoForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("infoForm"));
      this.infoForm.setValue(formdata);
    }

    if(sessionStorage.getItem("idDoc") !== null){
      let readDocId = sessionStorage.getItem("idDocReadOnly");
      if (readDocId!==null && readDocId.substring(0,2)=="IN")
      {
        this.getAndFill(sessionStorage.getItem("idDocReadOnly"));
        this.readOnlyMode = true;
        this.infoForm.disable();
      }
      else{
        this.getAndFill(sessionStorage.getItem("idDoc"));
        this.editMode = true;
      }

    }

    this.onValueChanges();


  }

  onValueChanges(): void {
    this.infoForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("infoForm", JSON.stringify(this.infoForm.value));
      sessionStorage.setItem("infoFormValid", JSON.stringify(this.infoForm.valid));
      
    })
  }

  getAndFill(id) {
    this.inc.getBasicInformation(id).subscribe(
      res => {
        console.log(res);
        this.infoForm.get('type').setValue(res["type"]);
        this.infoForm.get('documentId').setValue(res["documentId"]);
        this.infoForm.get('dispatcher').setValue(res["dispatcher"]);
        this.infoForm.get('status').setValue(res["status"]);
        this.infoForm.get('emergency').setValue(res["emergency"]);
        this.infoForm.get('confirmed').setValue(res["confirmed"]);   
        this.infoForm.get('ETA').setValue(moment(res["eta"]).format('YYYY-MM-DDTHH:mm'));
        this.infoForm.get('ATA').setValue(moment(res["ata"]).format('YYYY-MM-DDTHH:mm'));
        this.infoForm.get('incidentTime').setValue(moment(res["incidentTime"]).format('YYYY-MM-DDTHH:mm'));
        this.infoForm.get('ETR').setValue(moment(res["etr"]).format('YYYY-MM-DDTHH:mm'));
        this.infoForm.get('confirmed').setValue(res["confirmed"]);
        this.infoForm.get('affectedCustoms').setValue(res["affectedCustoms"]);
        this.infoForm.get('callNum').setValue(res["callNum"]);
        this.infoForm.get('voltage').setValue(res["voltage"]);
        this.infoForm.get('scheduledTime').setValue(moment(res["scheduledTime"]).format('YYYY-MM-DDTHH:mm'));
      }

    );
  }

  saveChanges(){
 
    let id = sessionStorage.getItem("idDoc");
    this.infoForm.get('documentId').setValue(id);
    this.inc.updateBasicInfo(this.infoForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  setDispatcher(){
 
    let username = (JSON.parse(sessionStorage.getItem('loggedUser'))).username;
    this.infoForm.get('dispatcher').setValue(username);
  }

}