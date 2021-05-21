import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent implements OnInit {

  hideElement = false;
  chosenId: number;

  constructor(public router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/newIncident/crew') {
          this.hideElement = true;
        }  else {
          this.hideElement = false;
        }
      }
    });
  }

  setTeamId(event){
    this.chosenId = event;
    sessionStorage.setItem('chosenId', JSON.stringify(this.chosenId));
    alert(this.chosenId);
  }

  ngOnInit(): void {
  }

}
