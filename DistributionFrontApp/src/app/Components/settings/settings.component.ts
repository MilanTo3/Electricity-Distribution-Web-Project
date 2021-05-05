import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  settingsFormAdmin: FormGroup;

  currentPassword: string;
  newPassword: string;
  crewIcon: string;
  callIcon: string;
  incidentIcon: string;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.settingsForm  = this.formBuilder.group({
      currentPassword: [this.currentPassword, Validators.required],
      newPassword: [this.newPassword, Validators.required],   
    });
    this.settingsFormAdmin  = this.formBuilder.group({
      iconCall: [this.callIcon],
      iconIncident: [this.incidentIcon],
      iconCrew: [this.crewIcon],
      infoCheck : [],
      warningCheck:[],
      successCheck:[],
      errorCheck: []

    });
  }
 
  selectIcon(){

  }
  //type == 1 -> call
  //type == 2 -> incident
  //type == 3 -> crew
  onFileChanged(event : any, type: number){
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        switch (type){
          case 1:         
            this.callIcon = reader.result as string;
            this.settingsForm.patchValue({
              iconCall: reader.result
            });
            break;
          case 2:
            this.incidentIcon = reader.result as string;
            this.settingsForm.patchValue({
              iconIncident: reader.result
            });
            break;
          case 3:
            this.crewIcon = reader.result as string;
            this.settingsForm.patchValue({
              iconCrew: reader.result
            });
            break;

        }
      };
    
    }
  }
  onSubmit(){
    // Process checkout data here
    if (this.settingsForm.valid) {
      this.showToastrSuccess(1);
    } else {
      this.showToastrError();
    }
  }
  onSubmitAdmin(){
    // Process checkout data here
    if (this.settingsFormAdmin.valid) {
      this.showToastrSuccess(2);
    } else {
      this.showToastrError();
    }
  }

  showToastrSuccess(i){  
    if(i===1)
    {
      this.toastr.success('Your password change has been sent.', 'Form successfuly sent.');
    }
    else
    {
      this.toastr.success('New settings have been sent.', 'Form successfuly sent.');

    }
  }
  showToastrError(){  
      this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
}
