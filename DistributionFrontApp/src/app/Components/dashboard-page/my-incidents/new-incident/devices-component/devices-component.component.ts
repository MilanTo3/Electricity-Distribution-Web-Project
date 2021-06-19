import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices-component',
  templateUrl: './devices-component.component.html',
  styleUrls: ['./devices-component.component.css']
})
export class DevicesComponentComponent implements OnInit {

  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addDevice() {
    this.router.navigate(['/newDevice']);
  }
}
