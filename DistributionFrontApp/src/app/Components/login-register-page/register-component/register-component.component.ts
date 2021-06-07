import { NotificationService } from 'src/app/Services/notifications/notification.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { customFormValidators } from '../../../Models/customValidators';
import { pictureModel } from '../../../Models/pictureModel.model';
import { UserService } from '../../../Services/registration-service.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/Services/location.service';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { TeamsServiceService } from 'src/app/Services/teams-service.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  @Output() moveOverlay = new EventEmitter();
  teamSelected = false;
  onDefault = true;
  fileToUpload: any = null;
  defpicurl = '/assets/Images/defimage3.jpg';
  picurl: any = this.defpicurl;
  formdata: FormData = new FormData();
  filteredRequests: Observable<string[]>;
  locations : any;
  teams: any;
  addedStreets = [];
  addedTeams = [];
  filteredStreets: Observable<string[]>;
  filteredTeams: Observable<string[]>;

  registerForm = this.fb.group({
    Name: ['', [Validators.required, Validators.maxLength(100)]],
    Lastname: ['', [Validators.required, Validators.maxLength(100)]],
    Username: ['', [Validators.required, Validators.maxLength(50)]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    ConfirmedPassword: ['', Validators.required],
    Birthday: ['', Validators.required],
    Address: ['', [Validators.required, Validators.maxLength(100)]],
    PhoneNumber: ['', [Validators.required, Validators.pattern('^[- +0-9]+$')]],
    UserType: ['Consumer'],
    FilePicture: [''],
    TeamId: ['none']
  },
    {
      validator: Validators.compose([customFormValidators.passwordConfirmCheck('Password', 'ConfirmedPassword', { 'confirmError': true }),
                                     customFormValidators.checkInclude(this.addedStreets, 'Address', { 'addressError': true })])
    }
  );

  constructor(private fb: FormBuilder, private registtration: UserService, private toastr: ToastrService, private notificationService: NotificationService, private locationService: LocationService, private teamsService: TeamsServiceService) { }

  ngOnInit(): void {

    this.locationService.GetLocations().subscribe(
      res => {
        this.locations = res;
        this.locations.forEach(element => {
          this.addedStreets.push(element["street"]);
        });
      }
    );

    this.teamsService.getAllTeams().subscribe(
      res => {
        this.teams = res;
        this.teams.forEach(element => {
          this.addedTeams.push(element["name"]);
        });
      }
    );

    this.filteredStreets = this.registerForm.get('Address').valueChanges.pipe(
      startWith(''),
      map(value => this._filterStreets(value))
    );

    this.filteredTeams = this.registerForm.get('TeamId').valueChanges.pipe(
      startWith(''),
      map(value => this._filterTeams(value))
    );
  }

  private _filterStreets(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.addedStreets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _filterTeams(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.addedTeams.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      var reader = new FileReader();
      let this_ = this;
      this.fileToUpload = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        this_.picurl = e.target.result;
        this_.onDefault = false;
      }
    }
  }

  onSubmit() {

    if (this.registerForm.valid) {
      this.fillFormData();
      this.registtration.register(this.formdata).subscribe(
        (response: any) => {
          if (response === "ok") {
            this.toastr.success('Thank you for joining smart energy.', 'Registration successful :)');
            
            this.notificationService.startConnection();
            this.notificationService.addNotificationListener();
            this.registerForm.reset();
            this.moveOverlay.emit();
            return;
          }
        },
        (err) => {
          try {
            if (err.error.startsWith('err')) {
              this.toastr.error(err.error.substring(3), 'Form Error');
            }
          } catch {
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
          }
        }
      );
    } else {
      this.toastr.warning('Oops, looks like some form fields are wrong, have a look at them again.', 'Form invalid');
    }
  }

  fillFormData(){
    this.formdata = new FormData();
    this.formdata.append('UserName', this.registerForm.get('Username').value);
    this.formdata.append('Name', this.registerForm.get('Name').value);
    this.formdata.append('Lastname', this.registerForm.get('Lastname').value);
    this.formdata.append('Email', this.registerForm.get('Email').value);
    this.formdata.append('Birthday', this.registerForm.get('Birthday').value);
    this.formdata.append('Address', this.registerForm.get('Address').value);
    this.formdata.append('UserType', this.registerForm.get('UserType').value);
    this.formdata.append('Password', this.registerForm.get('Password').value);
    if(this.registerForm.get('TeamId').value === ''){
      this.registerForm.get('TeamId').setValue('none');
    }
    this.formdata.append('TeamId', this.registerForm.get('TeamId').value);
    this.formdata.append('PhoneNumber', this.registerForm.get('PhoneNumber').value);
    if(this.fileToUpload !== null){
      this.formdata.append("FilePicture", this.fileToUpload, this.fileToUpload.name);
    }
  }

  clearImage() {
    this.picurl = this.defpicurl;
    this.onDefault = true;
    this.fileToUpload = null;
  }

  onChange(SelectValue: string) {
    if (SelectValue === 'TeamMember') {
      setTimeout(() => { this.teamSelected = true; }, 400);
    } else {
      this.teamSelected = false;
    }
  }

  get emailForm() {
    return this.registerForm.get('Email') as FormControl;
  }

  get passwordForm() {
    return this.registerForm.get('Password') as FormControl;
  }

  get phoneNumber(){
    return this.registerForm.get('PhoneNumber');
  }

}
