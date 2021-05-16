import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/registration-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private router: Router, private fb: FormBuilder, private logService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.logService.login(this.loginForm.value).subscribe(
        (response: any) => {
          sessionStorage.setItem('token', response.token);
          console.log(response.token);
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          if (err.status == 400)
            this.toastr.error(err.error.substring(3), 'Login Error');
          else
            this.toastr.error('Seems like our servers are down, our hamster mechanic is on it. Please try again later.', 'Server Error');
        }
      );
    } else {
      this.toastr.warning('Oops, looks like some form fields are wrong, have a look at them again.', 'Login invalid');
    }
  }

}
