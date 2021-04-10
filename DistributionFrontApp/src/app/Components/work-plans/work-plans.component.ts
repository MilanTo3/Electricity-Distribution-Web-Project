import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-plans',
  templateUrl: './work-plans.component.html',
  styleUrls: ['./work-plans.component.css']
})
export class WorkPlansComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  createNewPlan(){
    this.router.navigate(['/newWorkPlan']);
  }
}
