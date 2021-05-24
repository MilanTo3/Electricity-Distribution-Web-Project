import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Localbase from 'localbase';
import { ToastrService } from 'ngx-toastr';
import { MySafetyDocsWrapper } from 'src/app/Models/formWrappers';

@Component({
  selector: 'app-new-safety-doc',
  templateUrl: './new-safety-doc.component.html',
  styleUrls: ['./new-safety-doc.component.css']
})
export class NewSafetyDocComponent implements OnInit {

  db = new Localbase('db');
  wrapper: MySafetyDocsWrapper = new MySafetyDocsWrapper();
  //editMode = false;

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { 

  }

  ngOnInit(): void {
    sessionStorage.clear();
    this.db.collection('images').delete();
    this.router.navigateByUrl('/newMySafetyDoc/basicInformation');
  }

  async onSubmit() {

    let check = JSON.parse(sessionStorage.getItem("infoFormValid"));
    if(check === false || check === null){
      this.router.navigateByUrl('/newMySafetyDoc/basicInformation');
      this.showToastrWarning();
      return;
    }
    console.log(check);
    this.setInfoForm();
    this.setHistoryForm();
    this.setCheckListForm();
    await this.setMediaForm();
    console.log(this.wrapper);
    this.router.navigateByUrl('/newMySafetyDoc');
  }

  showToastrWarning(){
    this.toastr.warning('Seems like theres an error with basic information form input. Please check again.', 'Ooops!');

  }

  setInfoForm(){
    let formdata = JSON.parse(sessionStorage.getItem("infoForm"));
    this.wrapper.infoForm = formdata;
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

   setHistoryForm(){
    let formdata = JSON.parse(sessionStorage.getItem("historyStateForm"));
    this.wrapper.historyForm = formdata;
  }

  setCheckListForm() {
    let formdata = JSON.parse(sessionStorage.getItem("checkListForm"));
    this.wrapper.checkListForm = formdata;
  }



}
