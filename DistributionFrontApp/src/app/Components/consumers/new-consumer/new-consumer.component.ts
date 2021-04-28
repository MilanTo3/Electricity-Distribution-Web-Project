import { Consumer } from './../../../Models/Consumer.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-consumer',
  templateUrl: './new-consumer.component.html',
  styleUrls: ['./new-consumer.component.css']
})
export class NewConsumerComponent implements OnInit {
  consumer = new Consumer("", "", "", "HIGH", "", "", "");
  consumerForm: FormGroup;
  typeOptions = ["Residential", "Commercial"];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.consumerForm  = this.formBuilder.group({
      name: [this.consumer.name],
      lastname: [this.consumer.lastname],
      location: [this.consumer.location],
      priority: [this.consumer.priority],
      phone: [this.consumer.phoneNum],
      accountId: [this.consumer.accountID],
      type: [this.consumer.type],

    });
  }
  onSubmit(){

  }
}
