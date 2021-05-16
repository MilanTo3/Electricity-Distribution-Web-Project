import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { menuList } from './menuList';
import { Notification } from 'src/app/Models/notification.model';
import { NotificationService } from 'src/app/Services/notifications/notification.service';

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

  notificationMessages: Notification[] = [];

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getUnreadNotifications()
        .subscribe(notificationMessages => this.notificationMessages = notificationMessages);
  }
  setMarkAsRead(): void {
    this.notificationService.setMarkAsRead()
        .subscribe(notificationMessages => this.notificationMessages = notificationMessages);
  }
  markAllAsRead(){
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

  logOut(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login-register');
  }

}
