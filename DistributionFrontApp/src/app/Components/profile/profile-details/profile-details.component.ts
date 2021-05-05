import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../../Models/User.model';
import { customFormValidators } from '../../../Models/customValidators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  currentUser = new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Dispatcher", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg");
  rolesOptions = ["Administrator", "Dispatcher", "Team member", "Consumer", "Employed(data analyst)"];
  selectedRole : string; 
  profileForm: FormGroup;
  oldpass: string;
  newpass: string;

  constructor(private formBuilder: FormBuilder,  private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.profileForm  = this.formBuilder.group({
      name: [this.currentUser.name, Validators.required],
      lastname: [this.currentUser.lastname, Validators.required],
      email: [this.currentUser.email, Validators.required],
      username: [this.currentUser.username, Validators.required],
      birthday: [this.currentUser.birthday, Validators.required],
      address: [this.currentUser.address, Validators.required],
      role: [this.currentUser.role, Validators.required],
      profileImg: [this.currentUser.profileImg, Validators.required]
    });
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
    
        this.currentUser.profileImg = reader.result as string;
      
        this.profileForm.patchValue({
          profileImg: reader.result
        });
    
      };
    
    }
  }
}

