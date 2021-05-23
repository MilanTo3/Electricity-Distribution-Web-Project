import { LocationService } from './../../../Services/location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MapComponentComponent } from '../../map-page/map-component/map-component.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-street',
  templateUrl: './add-street.component.html',
  styleUrls: ['./add-street.component.css']
})
export class AddStreetComponent implements OnInit {
  formdata = new FormData();

  locationForm = this.fb.group({
    id:[''],
    name: ['', Validators.required],
    street: ['', Validators.required],
    priority: ['Low', Validators.required],
    longitude: ['', [Validators.required, Validators.pattern('[0-9]+[.]{1}[0-9]+')]],
    latitude: ['', [Validators.required, Validators.pattern('[0-9]+[.]{1}[0-9]+')]]
  });

  constructor(private fb: FormBuilder, private locationService: LocationService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  fillFormData(){
    this.formdata = new FormData();
    this.formdata.append('name', this.locationForm.get('name').value);
    this.formdata.append('street', this.locationForm.get('street').value);
    this.formdata.append('priority', this.locationForm.get('priority').value);
    this.formdata.append('longitude', this.locationForm.get('longitude').value);
    this.formdata.append('latitude', this.locationForm.get('latitude').value);
    this.formdata.append('id', '0');

  }
  setValues(event){

    this.locationForm.get('longitude').setValue(event[0]);
    this.locationForm.get('latitude').setValue(event[1]);

  }

  submitForm(){
    if (this.locationForm.valid) {
      this.fillFormData();
      this.locationService.AddLocation(this.formdata).subscribe(
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
    this.toastr.success('Stret added.', 'Success.');
  }
  showToastrError() {
    this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }

}
