import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleCheckerService } from 'src/app/Services/role-checker.service';

@Component({
  selector: 'app-work-plans',
  templateUrl: './work-plans.component.html',
  styleUrls: ['./work-plans.component.css']
})
export class WorkPlansComponent implements OnInit {
  option = false;
  serviceRef;
  constructor(private router: Router, private checker: RoleCheckerService) { this.serviceRef = checker; }

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
