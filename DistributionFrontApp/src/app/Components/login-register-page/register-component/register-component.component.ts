import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { customFormValidators } from '../../../Models/customValidators';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    lastname: ['', [Validators.required, Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    confirmedPassword: ['', Validators.required],
    birthday: ['', Validators.required],
    address: ['', [Validators.required, Validators.maxLength(100)]],
    userType: ['Potrošač']
  },
  { 
    validator: Validators.compose([customFormValidators.passwordConfirmCheck('password', 'confirmedPassword', { 'confirmError': true })])
  }
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get emailForm(){
    return this.registerForm.get('email') as FormControl;
  }

  get passwordForm(){
    return this.registerForm.get('password') as FormControl;
  }

}
