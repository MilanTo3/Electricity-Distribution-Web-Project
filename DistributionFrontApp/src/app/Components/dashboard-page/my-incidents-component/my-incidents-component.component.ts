import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-incidents-component',
  templateUrl: './my-incidents-component.component.html',
  styleUrls: ['./my-incidents-component.component.css']
})
export class MyIncidentsComponentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  openTable() {
    this.router.navigate(['/myIncidents'])
  }
}
