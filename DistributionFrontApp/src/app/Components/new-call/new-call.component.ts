import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/registration-service.service';
import { User } from '../../Models/User.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnInit {

  users = [new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Dispatcher", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg"),
          new User("Drugi", "User", "efdg@squirel.com", "Admin", "username", "2019-01-16", "adresausera", "/assets/Images/colorpattern.jpg")];
  customerInfo: User;
  
  user = new User("", "", "", "", "", "", "", "");
  callForm = this.formBuilder.group({
    comment: ['', Validators.required],
    reason: ['', Validators.required],
    hazzard: ['', Validators.required]
    
  });
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService) { 
    this.customerInfo = this.user;
  }

  ngOnInit(): void {
  }

  resetModal()
  {
    this.customerInfo = this.user;
  }
  selectCustomer()
  {
  }

  onSubmit()
  {

  }
}
