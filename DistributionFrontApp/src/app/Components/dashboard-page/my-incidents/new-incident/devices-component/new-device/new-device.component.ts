import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/Services/device.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/Services/location.service';
import { map, startWith } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

  locations: any;
  addedStreets = [];
  filteredStreets: Observable<string[]>;

  deviceForm = this.fb.group({
    type: ['', Validators.required],
    address: ['', Validators.required],
    longitude: [''],
    latitude: ['']
   //name: [''],
   //id: ['']
  });

  //
  formData = new FormData();

  //
  constructor(private fb: FormBuilder, private router: Router, private deviceService: DeviceService, 
    private locationService: LocationService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.locationService.GetLocations().subscribe(
      res => {
        this.locations = res;
        this.locations.forEach(element => {
          this.addedStreets.push(element["street"]);      
        });
      }
    );
  
    this.filteredStreets = this.deviceForm.get('address').valueChanges.pipe(
      startWith(''),
      map(value => this._filterStreets(value))    
    );  

  }

  private _filterStreets(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    this.onStreetChanges(value);
    return this.addedStreets.filter(street => this._normalizeValue(street).includes(filterValue));
  }
  
  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }

  async onSubmit() {
  }

  fillFormData() {
    this.formData = new FormData();
    this.formData.append('type', this.deviceForm.get('type').value);
    //this.formData.append('id', this.deviceForm.get('id').value);  //nije neophodno jer se generise automatski u bazi po pravilu iz spec
    //this.formData.append('name', this.deviceForm.get('name').value);  //nije neophodno jer se generise automatski u bazi po pravilu iz spec
    this.formData.append('address', this.deviceForm.get('address').value);
    this.formData.append('longitude', this.deviceForm.get('longitude').value); 
    this.formData.append('latitude', this.deviceForm.get('latitude').value);
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
    this.router.navigateByUrl('/adminPanel/devices');   
  }

  showToastrSuccess() {
    this.toastr.success('Device added.', 'Success.');
  }

  showToastrError() {
    this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }

  onValueChanges(): void {
    this.deviceForm.valueChanges.subscribe(val => {
      sessionStorage.setItem("deviceForm", JSON.stringify(this.deviceForm.value));
      sessionStorage.setItem("deviceFormValid", JSON.stringify(this.deviceForm.valid));
    })
  }
  
  onStreetChanges(value): void {

    if(this.addedStreets.includes(value)){
      this.deviceForm.get('longitude').setValue(this.getLongitude(value));
      this.deviceForm.get('latitude').setValue(this.getLatitude(value));
    }
  }

  getLongitude(street):string
  {
    let index = this.addedStreets.indexOf(street);
    if (this.locations[index]["longitude"] != undefined)
      return this.locations[index]["longitude"];
    else
      return "Street does not have longitude value."
  }

  getLatitude(street):string
  {
    let index = this.addedStreets.indexOf(street);
    if (this.locations[index]["latitude"] != undefined)
      return this.locations[index]["latitude"];
    else
      return "Street does not have latitude value."
  }
 
}

