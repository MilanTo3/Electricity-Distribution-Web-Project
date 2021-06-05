import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit {

  show = true;
  toggleFormsVisibility = false;
  auth2: any;
  @ViewChild('googleRef', {static: true }) regEl: ElementRef;

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('loggedUser') != null){
      this.router.navigateByUrl('/dashboard');
    }
  }

  toggleForms(){

    this.toggleFormsVisibility = !this.toggleFormsVisibility;
    this.show = !this.show;
    this.googleInitialize();
 
  }

  googleInitialize() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '294447893252-04ntit75kidujm538u3q9bk8es5v1b9p.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareRegister();
      });
    }
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
  
  prepareRegister(){

    let name;
    let formdata = new FormData();
    this.auth2.attachClickHandler(this.regEl.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log(profile);
        this.show = true;
        formdata.append('fullname', profile["Ve"]);
        formdata.append('email', profile["ku"]);

      }, (error) => {
        this.toastr.error('Eh? Seems like there\'s been an error getting account info.', 'Error');
      });

  }

}
