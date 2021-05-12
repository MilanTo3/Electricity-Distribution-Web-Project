import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MapComponentComponent } from '../../map-page/map-component/map-component.component';

@Component({
  selector: 'app-add-street',
  templateUrl: './add-street.component.html',
  styleUrls: ['./add-street.component.css']
})
export class AddStreetComponent implements OnInit {

  locationForm = this.fb.group({
    name: ['', Validators.required],
    street: ['', Validators.required],
    priority: ['Low', Validators.required],
    longitude: ['', [Validators.required, Validators.pattern('[0-9]+[.]{1}[0-9]+')]],
    latitude: ['', [Validators.required, Validators.pattern('[0-9]+[.]{1}[0-9]+')]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  setValues(event){

    this.locationForm.get('longitude').setValue(event[0]);
    this.locationForm.get('latitude').setValue(event[1]);

  }

  submitForm(){
    
  }

}
