import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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

  profileForm = this.formBuilder.group({
    name: new FormControl(this.currentUser.name),
    lastname: new FormControl(this.currentUser.lastname),
    email: new FormControl(this.currentUser.email),
    username: new FormControl(this.currentUser.username),
    birthday: new FormControl(this.currentUser.birthday),
    address: new FormControl(this.currentUser.address),
    role: new FormControl(this.currentUser.role),
    profileImg: new FormControl(this.currentUser.profileImg)
  });

  constructor(private formBuilder: FormBuilder) {
    this.rolesOptions = ["Administrator", "Dispatcher", "Team member", "Consumer", "Employed(data analyst)"];
    this.selectedRole = this.currentUser.role;
  }

  ngOnInit(): void {

  }
  onSubmit(): void {
    // Process checkout data here
    console.log('name: ' + this.profileForm.value.name);
    console.log('lastname: ' + this.profileForm.value.lastname);
    console.log('email: ' + this.profileForm.value.email);
    console.log('username: ' + this.profileForm.value.username);
    console.log('birthday: ' + this.profileForm.value.birthday);
    console.log('address: ' + this.profileForm.value.address);
    console.log('role: ' + this.profileForm.value.role);
    console.log('img: ' + this.profileForm.value.profileImg);

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

