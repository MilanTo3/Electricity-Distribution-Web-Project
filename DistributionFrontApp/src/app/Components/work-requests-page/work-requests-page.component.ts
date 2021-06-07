import { Component, OnInit } from '@angular/core';
import { RoleCheckerService } from 'src/app/Services/role-checker.service';

@Component({
  selector: 'app-work-requests-page',
  templateUrl: './work-requests-page.component.html',
  styleUrls: ['./work-requests-page.component.css']
})
export class WorkRequestsPageComponent implements OnInit {

  serviceRef;
  constructor(private checker: RoleCheckerService) { this.serviceRef = checker; }

  ngOnInit(): void {
  }

}
