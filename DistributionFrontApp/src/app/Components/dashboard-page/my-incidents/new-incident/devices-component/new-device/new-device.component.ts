import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/Services/device.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

  deviceForm = this.fb.group({
    type: ['', Validators.required],
    address: ['', Validators.required],
    name: [''],
    id: ['']
  });

  //
  formData = new FormData();
  //
  constructor(private fb: FormBuilder, private deviceService: DeviceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  async onSubmit() {

  }

  fillFormData() {
    this.formData = new FormData();
    this.formData.append('type', this.deviceForm.get('type').value);
    //this.formData.append('id', this.deviceForm.get('id').value);  //nije neophodno jer se generise automatski u bazi po pravilu iz spec
    //this.formData.append('name', this.deviceForm.get('name').value);  //nije neophodno jer se generise automatski u bazi po pravilu iz spec
    this.formData.append('address', this.deviceForm.get('address').value);

    this.formData.append('coordinates', '0'); //da li se generise na osnovu adrese?
    
  }

  submitForm() {
    if(this.deviceForm.valid) {
      this.fillFormData();
      this.deviceService.AddDevice(this.formData).subscribe(
      (response: any) => {
        this.showToastrSuccess();
      },
      (err) => {
        console.log(err);
        this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
      }
      );
    } else {
      this.showToastrError();
    }
  }

  showToastrSuccess() {
    this.toastr.success('Device added.', 'Success.');
  }

  showToastrError() {
    this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }
  
 
}

 /*$(function() {
  
  $('#deviceSelect').change(function(){
      changeValues(this.value);
  });
}); 

//Get the value from selected option 
//Convert it to string to get substring after
function changeValues(selectedValue) {
  var allSelects = $('select');
  $.each(allSelects, function(index, dropDown) {
      $('#' + dropDown.id).val(selectedValue);
  });
  
  var selectString = $("#deviceSelect option:selected").text();
  var sub = (selectString.substring(0, 3)).toUpperCase(); 
  //var upp = sub.toUpperCase();
  $('#deviceName').val(sub + '+id');
} */
