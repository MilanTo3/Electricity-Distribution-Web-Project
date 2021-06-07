import { NotificationService } from 'src/app/Services/notifications/notification.service';

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader, slider, transformer } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader]
})
export class AppComponent {
  title = 'DistributionFrontApp';

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(){
    this.notificationService.startConnection();
    this.notificationService.addNotificationListener();
  }

  checkPath(){
        
    if(this.router.url === "/login-register"){
      return true;
    }

    return false;
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData;
  }

}


