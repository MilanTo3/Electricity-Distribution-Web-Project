import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { customFormValidators } from '../../../Models/customValidators';
import { pictureModel } from '../../../Models/pictureModel.model';
import { RegistrationServiceService } from '../../../Services/registration-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  @Output() moveOverlay = new EventEmitter();
  teamSelected = false;
  onDefault = true;
  defpicurl = '/assets/Images/defimage3.jpg';
  picurl: any = this.defpicurl;
  registerForm = this.fb.group({
    Name: ['', [Validators.required, Validators.maxLength(100)]],
    Lastname: ['', [Validators.required, Validators.maxLength(100)]],
    Username: ['', [Validators.required, Validators.maxLength(50)]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    ConfirmedPassword: ['', Validators.required],
    Birthday: ['', Validators.required],
    Address: ['', [Validators.required, Validators.maxLength(100)]],
    UserType: ['Potrošač'],
    FilePicture: [''], TeamId: ['']
  },
    {
      validator: Validators.compose([customFormValidators.passwordConfirmCheck('Password', 'ConfirmedPassword', { 'confirmError': true })])
    }
  );

  constructor(private fb: FormBuilder, private registtration: RegistrationServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {

    if (event.target.files.length > 0) {
      var reader = new FileReader();
      let this_ = this;

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        let item = new pictureModel(event.target.files[0].name, e.target.result);
        this_.picurl = e.target.result;
        this_.onDefault = false;
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registtration.register(this.registerForm.value).subscribe(
        (response: any) => {
          if (response === "ok") {
            this.toastr.success('Thank you for joining smart energy.', 'Registration successful :)');
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

  clearImage() {
    this.picurl = this.defpicurl;
    this.onDefault = true;
  }

  onChange(SelectValue: string) {
    if (SelectValue === 'Član ekipe') {
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

}
