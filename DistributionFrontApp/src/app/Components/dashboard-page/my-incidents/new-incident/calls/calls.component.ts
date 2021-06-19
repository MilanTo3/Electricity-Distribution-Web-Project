import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {

  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  CreateNewCall() {
    this.router.navigate(['/new-call']);
  }

}
