import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/registration-service.service';
import { User } from '../../Models/User.model';
import { ToastrService } from 'ngx-toastr';
import { CallService } from 'src/app/Services/call.service';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnInit {

  users = [new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Dispatcher", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg"),
          new User("Drugi", "User", "efdg@squirel.com", "Admin", "username", "2019-01-16", "adresausera", "/assets/Images/colorpattern.jpg")];
  customerInfo: User;
  formdata = new FormData();

  user = new User("", "", "", "", "", "", "", "");
  callForm = this.formBuilder.group({
    id:[''],
    comment: ['', Validators.required],
    reason: ['', Validators.required],
    hazzard: ['', Validators.required]
    
  });
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService, private callService: CallService) { 
    this.customerInfo = this.user;
  }

  ngOnInit(): void {
    
  }

  fillFormData(){
    this.formdata = new FormData();
    this.formdata.append('comment', this.callForm.get('comment').value);
    this.formdata.append('reason', this.callForm.get('reason').value);
    this.formdata.append('hazzard', this.callForm.get('hazzard').value);  
    this.formdata.append('id', '0');  
  }
  resetModal()
  {
    this.customerInfo = this.user;
  }
  selectCustomer()
  {
  }

  onSubmit(): void {
    // Process checkout data here
    if (this.callForm.valid) {
      this.fillFormData();
      console.log(this.formdata);
      this.callService.AddNewCall(this.formdata).subscribe(
        (response: any) => {
          this.showToastrSuccess();
        },
        (err) => {
          console.log(err);
            this.showToastrError();
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

  getAndFill(id){

    this.callService.GetCall(id).subscribe(
      res => {
        this.callForm.get('comment').setValue(res["comment"]);
        this.callForm.get('hazzard').setValue(res["hazzard"]);
        this.callForm.get('reason').setValue(res["reason"]);
      
      }
    );

  }
}
