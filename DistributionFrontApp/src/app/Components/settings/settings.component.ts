import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currentPassword: string;
  newPassword: string;
  crewIcon: string;
  callIcon: string;
  incidentIcon: string;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.settingsForm  = this.formBuilder.group({
      currentPassword: [this.currentPassword],
      newPassword: [this.newPassword],
      iconCall: [this.callIcon],
      iconIncident: [this.incidentIcon],
      iconCrew: [this.crewIcon]
      
      
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

}
