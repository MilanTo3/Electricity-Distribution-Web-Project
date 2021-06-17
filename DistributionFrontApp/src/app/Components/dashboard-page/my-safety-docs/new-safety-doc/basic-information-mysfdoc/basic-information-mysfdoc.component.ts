import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WorkRequest } from 'src/app/Models/WorkRequest.model';
import { SafetyDocumentServiceService } from 'src/app/Services/safety-document-service.service';
import { WorkPlanServiceService } from 'src/app/Services/work-plan-service.service';
import { WorkRequestServiceService } from 'src/app/Services/work-request-service.service';

@Component({
  selector: 'app-basic-information-mysfdoc',
  templateUrl: './basic-information-mysfdoc.component.html',
  styleUrls: ['./basic-information-mysfdoc.component.css']
})
export class BasicInformationMysfdocComponent implements OnInit {

  filteredWorkPlans: Observable<string[]>;
  workPlans : any;
  addedWPs = [];
  editMode = false;
  readOnlyMode = false;

  infoForm = this.fb.group({
    type: ['Planned work'],
    documentId: [''],
    user: [''],
    crew: [0],
    details: ['', Validators.required],
    workPlanId: [''],
    notes: [''],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[- +0-9]+$')]],
    dateCreated: [formatDate(new Date(), "yyyy-MM-dd", "en").toString()]
  });

  constructor(private fb: FormBuilder, private router: Router, private sd: SafetyDocumentServiceService, private wp: WorkPlanServiceService) { }

  ngOnInit(): void {

    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.infoForm.get('user').setValue(loggedInUser.username);

    if(sessionStorage.getItem("infoForm") !== null) {
      let formdata = JSON.parse(sessionStorage.getItem("infoForm"));
      this.infoForm.setValue(formdata);
    }
    if(sessionStorage.getItem("idDoc") !== null){
      let readDocId = sessionStorage.getItem("idDocReadOnly");
      if (readDocId!==null && readDocId.substring(0,2)=="SD")
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

    this.wp.getAllBasicInfo().subscribe(
      res => {
        this.workPlans = res;
        this.workPlans.forEach(element => {
          this.addedWPs.push(element["documentId"]);
        });
      }
    );

    this.filteredWorkPlans = this.infoForm.get('workPlanId').valueChanges.pipe(
      startWith(''),
      map(value => this._filterWPs(value))
    );
    
  }

  private _filterWPs(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.addedWPs.filter(req => this._normalizeValue(req).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }


  onValueChanges(): void {
    this.infoForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("infoForm", JSON.stringify(this.infoForm.value));
      sessionStorage.setItem("infoFormValid", JSON.stringify(this.infoForm.valid));
      
    })
  }

  saveChanges(){

    let id = sessionStorage.getItem("idDoc");
    this.infoForm.get('documentId').setValue(id);
    this.sd.updateBasicInfo(this.infoForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  getAndFill(id) {

    this.sd.getBasicInformation(id).subscribe(
      res => {
        this.infoForm.get('type').setValue(res["type"]);
        this.infoForm.get('user').setValue(res["user"]);
        this.infoForm.get('crew').setValue(res["crew"]);
        this.infoForm.get('details').setValue(res["details"]);
        this.infoForm.get('workPlanId').setValue(res["workPlanId"]);
        this.infoForm.get('notes').setValue(res["notes"]);
        this.infoForm.get('phoneNumber').setValue(res["phoneNumber"]);
        this.infoForm.get('dateCreated').setValue(moment(res["dateCreated"]).format('YYYY-MM-DDTHH:mm'));
      }
    );
  }

  get phoneNumber(){
    return this.infoForm.get('phoneNumber');
  }

  OpenWP(){
    let id = this.infoForm.get('workPlanId').value;
   if(id.length!==0 && id.trim() && this.workPlans.indexOf(id) > -1)
   {
     sessionStorage.setItem('idDocReadOnly', id);
     this.router.navigate(['/newWorkPlan', { idparam: id}]);   
   }
 }
 
}
