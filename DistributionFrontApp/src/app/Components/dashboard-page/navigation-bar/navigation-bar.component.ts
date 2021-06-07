import { LoggedUser } from './../../../Models/LoggedUser.model';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { menuList } from './menuList';
import { Notification } from 'src/app/Models/notification.model';
import { NotificationService } from 'src/app/Services/notifications/notification.service';
import { RoleCheckerService } from 'src/app/Services/role-checker.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  title = 'AngularMaterialGettingStarted';
  hiddenBadge = false;
  events: string[] = [];
  opened: boolean = true;
  expand = false;
  showFields = false;
  user: LoggedUser;
  formdata: FormData = new FormData();
  notificationMessages: any;
  serviceRef;

  constructor(private router: Router, private notificationService: NotificationService, private checker: RoleCheckerService) {
    this.serviceRef = checker;
  }
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.getNotifications();
  }

  async getNotifications() {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.formdata.append('username', this.user.username);
    let res = await this.notificationService.GetUserNotifications(this.user.username)
      .toPromise();
    this.notificationMessages =  res;
    
  }
  async setMarkAsRead() {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
    this.formdata.append('username', this.user.username);
    console.log(this.user.username);
    await this.notificationService.setMarkAsRead(this.formdata)
      .toPromise();
  }
  markAllAsRead() {
    this.hiddenBadge = true;
    this.setMarkAsRead();

  }
  redirectToNotifications() {
    this.hiddenBadge = true;
    this.router.navigateByUrl('/notifications');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  checkPath() {

    if (this.router.url === "/login-register") {
      return true;
    }

    return false;
  }

  toggleSidebar() {
    this.expand = !this.expand;
    if (this.expand) {
      setTimeout(() => { this.showFields = !this.showFields; }, 300);
    } else {
      this.showFields = false;
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login-register');
  }

}
