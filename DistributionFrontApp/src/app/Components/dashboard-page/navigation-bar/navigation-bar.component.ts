import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { menuList } from './menuList';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  title = 'AngularMaterialGettingStarted';

  events: string[] = [];
  opened: boolean = true;
  expand = false;
  showFields = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToNotifications() {
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

  returnTrue() {
    return true;
  }

}
