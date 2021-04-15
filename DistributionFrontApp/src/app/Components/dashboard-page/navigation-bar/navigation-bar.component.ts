import { Component, OnInit } from '@angular/core';
import { menuList } from './menuList';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  title = 'AngularMaterialGettingStarted';

  constructor() { }

  ngOnInit(): void {
  }

  

}
