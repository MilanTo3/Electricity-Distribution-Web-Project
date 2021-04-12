import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.css']
})
export class CardDashboardComponent implements OnInit {
  

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  openMyIncidentsTable() {
    this.router.navigate(['/myIncidents'])
  }

  openMySafetyDocsTable() {
    this.router.navigate(['/mySafetyDocs']);
  }
  
}
