import { LocationService } from './../../Services/location.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/registration-service.service';
import { User } from '../../Models/User.model';
import { ToastrService } from 'ngx-toastr';
import { CallService } from 'src/app/Services/call.service';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnInit {

  users = [new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Dispatcher", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg"),
          new User("Drugi", "User", "efdg@squirel.com", "Admin", "username", "2019-01-16", "adresausera", "/assets/Images/colorpattern.jpg")];
  customerInfo: User;
  formdata = new FormData();

  user = new User("", "", "", "", "", "", "", "");
  locations : any;
  addedStreets = [];
  filteredStreets: Observable<string[]>;
  callForm = this.formBuilder.group({
    id:[''],
    location: ['', Validators.required],
    comment: ['', Validators.required],
    reason: ['', Validators.required],
    hazzard: ['', Validators.required]
    
  });
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService,
     private callService: CallService, private locationService: LocationService) { 
    this.customerInfo = this.user;
  }

  ngOnInit(): void {
    this.locationService.GetLocations().subscribe(
      res => {
        this.locations = res;
        this.locations.forEach(element => {
          this.addedStreets.push(element["street"]);
        });
        console.log(this.addedStreets);
      }
    );
    this.filteredStreets = this.callForm.get('location').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.addedStreets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }

  fillFormData(){
    this.formdata = new FormData();
    let loc = this.callForm.get('location').value;
    let index = this.addedStreets.indexOf(loc); // addedstreets redom popunjen ulicama, znaci imamo index preko kojeg mozemo naci id iz dobijenih lokacija :)
    let locationid = this.locations[index]["id"];
    this.formdata.append('comment', this.callForm.get('comment').value);
    this.formdata.append('reason', this.callForm.get('reason').value);
    this.formdata.append('hazzard', this.callForm.get('hazzard').value);  
    this.formdata.append('id', '0'); // ovo se salje samo zbog modela koji back ocekuje, svakako ce dobiti novi id
    this.formdata.append('locationId', locationid.toString());   
  }
  resetModal()
  {
    this.customerInfo = this.user;
  }
  selectCustomer()
  {
  }

  onSubmit(): void {
    // Process checkout data here
    if (this.callForm.valid) {
      this.fillFormData();
      console.log(this.formdata);
      this.callService.AddNewCall(this.formdata).subscribe(
        (response: any) => {
          this.showToastrSuccess();
        },
        (err) => {
          console.log(err);
            this.showToastrError();
        }
      );
    } else {
      this.showToastrError();
    }

  }
  showToastrSuccess() {
    this.toastr.success('Added a street successfully.', 'Yay!');
  }
  showToastrError() {
    this.toastr.error('Please check all the fields are filled out correctly.', 'Form not sent.');
  }

  getAndFill(id){

    this.callService.GetCall(id).subscribe(
      res => {
        this.callForm.get('comment').setValue(res["comment"]);
        this.callForm.get('hazzard').setValue(res["hazzard"]);
        this.callForm.get('reason').setValue(res["reason"]);
      
      }
    );

  }
}
