import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

  infoForm = this.fb.group({
    type: ['', Validators.required],
    address: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  async onSubmit() {

  }

 
}

$(function() {
  
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
}
