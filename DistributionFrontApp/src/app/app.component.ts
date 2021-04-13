import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DistributionFrontApp';

  constructor(private router: Router) {}

  checkPath(){
        
    if(this.router.url === "/login-register"){
      return true;
    }

    return false;
  }

}


