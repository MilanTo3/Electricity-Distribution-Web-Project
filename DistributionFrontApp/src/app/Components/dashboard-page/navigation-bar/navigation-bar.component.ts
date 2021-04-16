import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuList } from './menuList';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  title = 'AngularMaterialGettingStarted';

  sideMenu = menuList;
  collapse = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.collapse = !this.collapse;

  }

  redirectToNotifications(){
    this.router.navigateByUrl('/notifications');
  }

}
