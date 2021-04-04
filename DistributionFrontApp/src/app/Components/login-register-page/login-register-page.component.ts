import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit {

  show = true;
  toggleFormsVisibility = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleForms(){

    this.toggleFormsVisibility = !this.toggleFormsVisibility;
    this.show = !this.show;

  }

}
