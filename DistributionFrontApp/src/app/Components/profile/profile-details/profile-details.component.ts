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
  fileToUpload: any = null;
  formdata = new FormData();
  registrationState;

  currentImg: any;
  rolesOptions = ["Administrator", "Dispatcher", "DataAnalyst", "TeamMember", "Consumer"];
  selectedRole: string;
  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    //username: ['', Validators.required],
    userName: ['', Validators.required],
    birthday: ['', Validators.required],
    address: ['', Validators.required],
    //role: ['', Validators.required],
    //userType: ['', Validators.required],
    //profileImg: ['', Validators.required],
    filePicture: [''],
    teamId: [''],
    phoneNumber: [''],
    password: ['']
  });
  roleForm = this.formBuilder.group({
    userType: ['', Validators.required]
  })
  oldpass: string;
  newpass: string;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService) {
  }
  fillFormData(){
    this.formdata = new FormData();
    this.formdata.append('UserName', this.profileForm.get('userName').value);
    this.formdata.append('Name', this.profileForm.get('name').value);
    this.formdata.append('Lastname', this.profileForm.get('lastname').value);
    this.formdata.append('Email', this.profileForm.get('email').value);
    this.formdata.append('Birthday', this.profileForm.get('birthday').value);
    this.formdata.append('Address', this.profileForm.get('address').value);
    this.formdata.append('UserType', this.roleForm.get('userType').value);
    this.formdata.append('Password', this.profileForm.get('password').value);
    this.formdata.append('TeamId', this.profileForm.get('teamId').value);
    this.formdata.append('PhoneNumber', this.profileForm.get('phoneNumber').value);
    if(this.fileToUpload !== null){
      this.formdata.append("FilePicture", this.fileToUpload, this.fileToUpload.name);
    }
  }
  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      res => {
        this.profileForm.get('name').setValue(res["name"]);
        this.profileForm.get('lastname').setValue(res["lastname"]);
        this.profileForm.get('userName').setValue(res["userName"]);
        this.profileForm.get('birthday').setValue(moment(res["birthday"]).format('YYYY-MM-DD'));
        this.profileForm.get('address').setValue(res["address"]);
        this.roleForm.get('userType').setValue(this.rolesOptions[res["userType"]]);
        this.profileForm.get('email').setValue(res["email"]);
        this.profileForm.get('teamId').setValue(res["teamId"]);
        this.profileForm.get('phoneNumber').setValue(res["phoneNumber"]);
        this.profileForm.get('password').setValue(res["password"]);
        let regState: number = res["regState"];
        if(regState === 0){
          this.registrationState = "Pending";
        }else if(regState === 1){
          this.registrationState = "Verified";
        }else{
          this.registrationState = "Blocked";
        }
      }
    );

    let user: LoggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.userService.getProfileImg(user.username).subscribe(
      res => {

        let this_ = this;
        var reader = new FileReader();
        this.fileToUpload = res;
        console.log(this.fileToUpload);
        reader.readAsDataURL(res);
        reader.onloadend = function () {
          this_.currentImg = reader.result;
          this_.profileForm.patchValue({
            filePicture: reader.result
          });
        }
      },
      err => {
        this.currentImg = "/assets/Images/defimage3.jpg";
      }
    );

  }

  onSubmit(): void {
    // Process checkout data here
    if (this.profileForm.valid) {
      this.fillFormData();

      this.userService.updateUserProfile(this.formdata).subscribe(
        (response: any) => {
          this.showToastrSuccess();
        },
        (err) => {
          if (err.status == 400)
            this.toastr.error(err.error.substring(3), 'Profile update error');
          else
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
        }
      );
    } else {
      this.showToastrError();
    }

  }
  onSubmitRole(){
    if (this.roleForm.valid) {
      console.log(this.roleForm.value);

      this.userService.updateUserRole(this.roleForm.get('userType').value).subscribe(
        (response: any) => {
          this.toastr.success('Role request sent!', 'Yas!');
          this.toastr.info('Please wait while our admins review your request', 'Info');

        },
        (err) => {
          if (err.status == 400)
            this.toastr.error(err.error, 'Role change error');
          else
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
        }
      );
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
      this.fileToUpload = event.target.files[0];
      

      reader.onload = () => {

        this.currentImg = reader.result;// as string;
        this.profileForm.patchValue({
          filePicture: reader.result
        });

      };

    }
  }
}

