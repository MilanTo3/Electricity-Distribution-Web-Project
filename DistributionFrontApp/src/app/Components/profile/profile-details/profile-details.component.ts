import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../../Models/User.model';
import { customFormValidators } from '../../../Models/customValidators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/registration-service.service';
import * as moment from 'moment';
import { LoggedUser } from 'src/app/Models/LoggedUser.model';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  currentImg: any;
  rolesOptions = ["Administrator", "Dispatcher", "Team member", "Consumer", "Employed(data analyst)"];
  selectedRole: string;
  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    birthday: ['', Validators.required],
    address: ['', Validators.required],
    role: ['', Validators.required],
    profileImg: ['', Validators.required]
  });
  oldpass: string;
  newpass: string;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService) {
  }

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      res => {
        this.profileForm.get('name').setValue(res["name"]);
        this.profileForm.get('lastname').setValue(res["lastname"]);
        this.profileForm.get('username').setValue(res["userName"]);
        this.profileForm.get('birthday').setValue(moment(res["birthday"]).format('YYYY-MM-DD'));
        this.profileForm.get('address').setValue(res["address"]);
        this.profileForm.get('role').setValue(res["userType"]);
      }
    );

    let user: LoggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.userService.getProfileImg(user.username).subscribe(
      res => {
        console.log(res);

        let this_ = this;
        var reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = function () {
          this_.currentImg = reader.result;
        }
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
  showToastrSuccess() {
    this.toastr.success('Your profile change has been sent.', 'Form successfuly sent.');
  }
  showToastrError() {
    this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
  onFileChanged(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
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

