import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleCheckerService } from 'src/app/Services/role-checker.service';

@Component({
  selector: 'app-my-incidents',
  templateUrl: './my-incidents.component.html',
  styleUrls: ['./my-incidents.component.css']
})
export class MyIncidentsComponent implements OnInit {

  serviceRef;
  constructor(private router: Router, private checker: RoleCheckerService) { this.serviceRef = checker; }

  ngOnInit(): void {
  }

  openNewIncident() {
    this.router.navigate(['/newIncident']);
  }

}
