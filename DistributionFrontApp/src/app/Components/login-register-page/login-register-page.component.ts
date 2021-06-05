import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/registration-service.service';

declare var FB: any;
@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.css']
})
export class LoginRegisterPageComponent implements OnInit {

  show = true;
  toggleFormsVisibility = false;
  auth2: any;
  @ViewChild('googleRef', { static: true }) regEl: ElementRef;

  constructor(private router: Router, private toastr: ToastrService, private userService: UserService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('loggedUser') != null) {
      this.router.navigateByUrl('/dashboard');
    }
    this.googleInitialize();
    this.facebookInitialize();
  }

  toggleForms() {

    this.toggleFormsVisibility = !this.toggleFormsVisibility;
    this.show = !this.show;

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
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  facebookInitialize() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '866317027293539',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      this.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  registerFacebook() {

    let formdata = new FormData();
    FB.login((response) => {
      console.log(response);
      if (response.authResponse) {
        let data = this.userService.getUserData(response["authResponse"]["accessToken"]).subscribe(
          res => {
            console.log(res);
            formdata.append('fullname', res["name"]);
            formdata.append('imageUrl', res["picture"]["data"]["url"]);
            this.userService.registerSocialMedia(formdata).subscribe(
              res => {
                this.toastr.success('Yay! Thanks for joining Smart Energy.', 'Account registered');
              },
              err => {
                this.toastr.error('Eh? Seems like there\'s been an error sending data to server.', 'Error');
              }
            );
            this.toastr.success('Yay! Thanks for joining Smart Energy.', 'Account registered');
          }
        );
      }
      else {
        this.toastr.error('Eh? Seems like there\'s been an error sending data to server.', 'Error');
      }
    });

  }

  prepareRegister() {

    let formdata = new FormData();
    this.auth2.attachClickHandler(this.regEl.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log(profile);
        this.show = true;
        formdata.append('fullname', profile["Ve"]);
        formdata.append('email', profile["ku"]);
        formdata.append('imageUrl', profile["ZJ"]);
        this.userService.registerSocialMedia(formdata).subscribe(
          res => {
            this.toastr.success('Yay! Thanks for joining Smart Energy.', 'Account registered');
          },
          err => {
            this.toastr.error('Eh? Seems like there\'s been an error sending data to server.', 'Error');
          }
        );

      }, (error) => {
        this.toastr.error('Eh? Seems like there\'s been an error getting account info.', 'Error');
      });

  }

}
