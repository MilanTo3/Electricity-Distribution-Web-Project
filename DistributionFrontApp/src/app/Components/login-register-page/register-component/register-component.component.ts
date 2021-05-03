import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { customFormValidators } from '../../../Models/customValidators';
import { pictureModel } from '../../../Models/pictureModel.model';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  teamSelected = false;
  onDefault = true;
  defpicurl = '/assets/Images/defimage3.jpg';
  picurl: any = this.defpicurl;
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    lastname: ['', [Validators.required, Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    confirmedPassword: ['', Validators.required],
    birthday: ['', Validators.required],
    address: ['', [Validators.required, Validators.maxLength(100)]],
    userType: ['Potrošač'],
    filePicture: [''], team: ['']
  },
  { 
    validator: Validators.compose([customFormValidators.passwordConfirmCheck('password', 'confirmedPassword', { 'confirmError': true })])
  }
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {

    if (event.target.files.length > 0) {
      var reader = new FileReader();
      let this_ = this;
  
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        let item = new pictureModel(event.target.files[0].name, e.target.result);
        this_.picurl = e.target.result;
        this_.onDefault = false;
      }
    }
  }

  clearImage(){
    this.picurl = this.defpicurl;
    this.onDefault = true;
  }

  onChange(SelectValue: string){
    if(SelectValue === 'Član ekipe'){
      setTimeout(() => { this.teamSelected = true; }, 400);
    }else{
      this.teamSelected = false;
    }
  }

  get emailForm(){
    return this.registerForm.get('email') as FormControl;
  }

  get passwordForm(){
    return this.registerForm.get('password') as FormControl;
  }

}
