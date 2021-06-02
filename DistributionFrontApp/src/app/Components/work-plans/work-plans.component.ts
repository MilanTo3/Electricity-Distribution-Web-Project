import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-plans',
  templateUrl: './work-plans.component.html',
  styleUrls: ['./work-plans.component.css']
})
export class WorkPlansComponent implements OnInit {
  option = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  createNewPlan(){
    this.router.navigateByUrl('/newWorkPlan');
  }

  changeOption(op){
    if(op=='All')
      this.option= false;
    else
      this.option=true; //show mine
  }
}
