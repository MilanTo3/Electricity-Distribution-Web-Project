import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../Models/User.model';

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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileForm  = this.formBuilder.group({
      name: [this.currentUser.name],
      lastname: [this.currentUser.lastname],
      email: [this.currentUser.email],
      username: [this.currentUser.username],
      birthday: [this.currentUser.birthday],
      address: [this.currentUser.address],
      role: [this.currentUser.role],
      oldPassword: [this.oldpass],
      newPassword: [this.newpass],
      profileImg: [this.currentUser.profileImg]
    });
  }
  onSubmit(): void {
    // Process checkout data here
    if(this.profileForm)
    {
      console.log('name: ' + this.profileForm.value.name);
      console.log('lastname: ' + this.profileForm.value.lastname);
      console.log('email: ' + this.profileForm.value.email);
      console.log('username: ' + this.profileForm.value.username);
      console.log('birthday: ' + this.profileForm.value.birthday);
      console.log('address: ' + this.profileForm.value.address);
      console.log('role: ' + this.profileForm.value.role);
      console.log('img: ' + this.profileForm.value.profileImg);
    }
   

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

