import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../../Models/User.model';
import { customFormValidators } from '../../../Models/customValidators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/registration-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  currentImg: string;
  rolesOptions = ["Administrator", "Dispatcher", "Team member", "Consumer", "Employed(data analyst)"];
  selectedRole : string; 
  profileForm: FormGroup;
  oldpass: string;
  newpass: string;

  constructor(private formBuilder: FormBuilder,  private toastr: ToastrService, private userService: UserService) {
  }

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      res => {
        this.currentImg = res["filePicture"];
        this.profileForm  = this.formBuilder.group({
          name: [res["name"], Validators.required],
          lastname: [res["lastname"], Validators.required],
          email: [res["email"], Validators.required],
          username: [res["userName"], Validators.required],
          birthday: [moment(res["birthday"]).format('YYYY-MM-DD'), Validators.required],
          address: [res["address"], Validators.required],
          role: [res["userType"], Validators.required],
          profileImg: [res["filePicture"], Validators.required]
        });
      }
    );

  }
  onSubmit(): void {
    // Process checkout data here
    if (this.profileForm.valid) {
      this.showToastrSuccess();
    } else {
      this.showToastrError();
    }
   

  }
  showToastrSuccess(){  
    this.toastr.success('Your profile change has been sent.', 'Form successfuly sent.');
  }
  showToastrError(){  
    this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
  onFileChanged(event : any){
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.currentImg = reader.result as string;
        this.profileForm.patchValue({
          profileImg: reader.result
        });
    
      };
    
    }
  }
}

