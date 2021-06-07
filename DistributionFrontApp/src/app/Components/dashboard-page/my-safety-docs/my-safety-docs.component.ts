import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleCheckerService } from 'src/app/Services/role-checker.service';

@Component({
  selector: 'app-my-safety-docs',
  templateUrl: './my-safety-docs.component.html',
  styleUrls: ['./my-safety-docs.component.css']
})
export class MySafetyDocsComponent implements OnInit {

  serviceRef;
  constructor(private router: Router, private checker: RoleCheckerService) { this.serviceRef = checker; }

  ngOnInit(): void {
  }

  openNewMySafetyDoc() {
    this.router.navigate(['/newMySafetyDoc']);
  }

}
