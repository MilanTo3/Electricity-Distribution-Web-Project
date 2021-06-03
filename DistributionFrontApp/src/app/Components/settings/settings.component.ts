import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/registration-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  settingsFormAdmin: FormGroup;

  crewIcon: string;
  callIcon: string;
  incidentIcon: string;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.settingsForm  = this.formBuilder.group({
      Old: ['', Validators.required],
      New: ['', Validators.required],   
    });
    this.settingsFormAdmin  = this.formBuilder.group({
      iconCall: [this.callIcon],
      iconIncident: [this.incidentIcon],
      iconCrew: [this.crewIcon],
      infoCheck : [],
      warningCheck:[],
      successCheck:[],
      errorCheck: [],
      resetCheck: [],
      mandatoryCheck:[]

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
      this.userService.updatePassword(this.settingsForm.value).subscribe(
        (response: any) => {
          this.showToastrSuccess(1);
        },
        (err) => {
          if (err.status == 400)
            this.toastr.error(err.error, 'Password Change Error');
          else
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
        }
      );
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
      this.toastr.success('Dont forget your new pass gurrl.', 'Password changed!');
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
