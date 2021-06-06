import { ConsumerService } from './../../../Services/consumer.service';
import { Consumer } from './../../../Models/Consumer.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/registration-service.service';
import { Location } from '@angular/common';

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
  formdata: FormData;
  editMode = false;
  constructor(private routerActivate: ActivatedRoute, private router: Router,private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService,
    private consumerService: ConsumerService, private location: Location) { }

  async ngOnInit(): Promise<void>  {

    this.parameter = this.routerActivate.snapshot.paramMap.get('username');
    let user = await this.userService.getUser(this.parameter).toPromise();
    if(sessionStorage.getItem('consumer') !== null)
    {
      this.editMode = true;
      let consumer = await this.consumerService.GetConsumer(this.parameter).toPromise();
      this.consumerForm.get('type').setValue(consumer["type"]);
      this.consumerForm.get('priority').setValue(consumer["priority"]);
    }
    this.consumerForm.get('name').setValue(user["name"]);
    this.consumerForm.get('lastname').setValue(user["lastname"]);
    this.consumerForm.get('accountId').setValue(user["username"]);
    this.consumerForm.get('location').setValue(user["address"]);
    this.consumerForm.get('phone').setValue(user["phone"]);
    
  }
  fillFormData(){
    this.formdata = new FormData();
    this.formdata.append('Username', this.consumerForm.get('accountId').value);
    this.formdata.append('Type', this.consumerForm.get('type').value);
    this.formdata.append('Priority', this.consumerForm.get('priority').value);
    
  }
  onSubmit(){
    // Process checkout data here
    if (this.consumerForm.valid) {     
      this.fillFormData();
      if(this.editMode)
      {
        sessionStorage.removeItem('consumer');
        this.consumerService.UpdateConsumer(this.formdata).subscribe(
          (response: any) => {
            this.toastr.success('Updated consumer!', 'Yas!');
            this.router.navigateByUrl('/consumers');
          },
          (err) => {
            if (err.status == 400)
              this.toastr.error(err.error, 'Consumer not updated!');
            else
              this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
          }
        ); 

      }
      else{
        this.consumerService.AddConsumer(this.formdata).subscribe(
          (response: any) => {
            this.toastr.success('Added a new consumer!', 'Yas!');
            this.updateUserRole();
          },
          (err) => {
            if (err.status == 400)
              this.toastr.error(err.error, 'Consumer not added!');
            else
              this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
          }
        ); 
      }
       
    } else {
      this.showToastrError();
    }
  }
  cancelClick(){
    if(!this.editMode)
    {
      this.router.navigateByUrl('/adminPanel/adminProfileRequests');
    }
    else{
      this.router.navigateByUrl('/consumers');
      sessionStorage.removeItem('consumer');
    }
  }
  async updateUserRole()
  {
    let formDataApprove: FormData = new FormData();
    formDataApprove.append('username', this.consumerForm.get('accountId').value);
    formDataApprove.append('op', '1');
    await this.userService.approveOrDenyRequest(formDataApprove).toPromise();
    this.router.navigateByUrl('/adminPanel/adminProfileRequests');
    //this.location.back();
  }
  showToastrSuccess(){  

    this.toastr.success('Consumer added!', 'Form successfuly sent.');

  }
  showToastrError(){  
      this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
}
