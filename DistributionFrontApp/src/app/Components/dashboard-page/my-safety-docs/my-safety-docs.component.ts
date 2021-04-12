import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-safety-docs',
  templateUrl: './my-safety-docs.component.html',
  styleUrls: ['./my-safety-docs.component.css']
})
export class MySafetyDocsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openNewMySafetyDoc() {
    this.router.navigate(['/newMySafetyDoc']);
  }

}
