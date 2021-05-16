import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit {

  show = true;
  toggleFormsVisibility = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('loggedUser') != null){
      this.router.navigateByUrl('/dashboard');
    }
  }

  toggleForms(){

    this.toggleFormsVisibility = !this.toggleFormsVisibility;
    this.show = !this.show;
 
  }
  

}
