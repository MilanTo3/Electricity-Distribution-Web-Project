import { Consumer } from './../../../Models/Consumer.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-consumer',
  templateUrl: './new-consumer.component.html',
  styleUrls: ['./new-consumer.component.css']
})
export class NewConsumerComponent implements OnInit {
  consumer = new Consumer("", "", "", "HIGH", "", "", "");
  consumerForm: FormGroup;
  typeOptions = ["Residential", "Commercial"];

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.consumerForm  = this.formBuilder.group({
      name: [this.consumer.name, Validators.required],
      lastname: [this.consumer.lastname, Validators.required],
      location: [this.consumer.location, Validators.required],
      priority: [this.consumer.priority, Validators.required],
      phone: [this.consumer.phoneNum, Validators.required],
      accountId: [this.consumer.accountID, Validators.required],
      type: [this.consumer.type, Validators.required],

    });
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

    this.toastr.success('Your password change has been sent.', 'Form successfuly sent.');

  }
  showToastrError(){  
      this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
}
