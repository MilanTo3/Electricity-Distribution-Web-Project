import { Consumer } from './../../../Models/Consumer.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/registration-service.service';

@Component({
  selector: 'app-new-consumer',
  templateUrl: './new-consumer.component.html',
  styleUrls: ['./new-consumer.component.css']
})
export class NewConsumerComponent implements OnInit {
  consumer = new Consumer("", "", "", "HIGH", "", "", "");
  typeOptions = ["Residential", "Commercial"];
  priorityOptions = ["NORMAL", "LOW", "IMPORTANT", "CRITICAL"];
  parameter;
  consumerForm  = this.formBuilder.group({
    name: [this.consumer.name, Validators.required],
    lastname: [this.consumer.lastname, Validators.required],
    location: [this.consumer.location, Validators.required],
    priority: [this.consumer.priority, Validators.required],
    phone: [this.consumer.phoneNum, Validators.required],
    accountId: [this.consumer.accountID, Validators.required],
    type: [this.consumer.type, Validators.required],

  });
  constructor(private routerActivate: ActivatedRoute, private router: Router,private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService) { }

  async ngOnInit(): Promise<void>  {

    this.parameter = this.routerActivate.snapshot.paramMap.get('username');
    console.log(this.parameter);
    let user = await this.userService.getUser(this.parameter).toPromise();
    console.log(user);
    this.consumerForm.get('name').setValue(user["name"]);
    this.consumerForm.get('lastname').setValue(user["lastname"]);
    this.consumerForm.get('accountId').setValue(user["username"]);
    this.consumerForm.get('location').setValue(user["address"]);
    this.consumerForm.get('phone').setValue(user["phone"]);
    
  }
  onSubmit(){
    // Process checkout data here
    if (this.consumerForm.valid) {
      this.showToastrSuccess();
    } else {
      this.showToastrError();
    }
  }

  showToastrSuccess(){  

    this.toastr.success('Consumer added!', 'Form successfuly sent.');

  }
  showToastrError(){  
      this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
}
