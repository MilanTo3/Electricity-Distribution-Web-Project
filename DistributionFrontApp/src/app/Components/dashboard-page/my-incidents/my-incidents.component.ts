import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-incidents',
  templateUrl: './my-incidents.component.html',
  styleUrls: ['./my-incidents.component.css']
})
export class MyIncidentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openNewIncident() {
    this.router.navigate(['/newIncident']);
  }

}
