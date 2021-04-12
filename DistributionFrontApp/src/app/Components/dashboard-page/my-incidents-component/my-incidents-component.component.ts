import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-incidents-component',
  templateUrl: './my-incidents-component.component.html',
  styleUrls: ['./my-incidents-component.component.css']
})
export class MyIncidentsComponentComponent implements OnInit {

  @Input('dashboardCardType') sidebarid:number = 0;
  contentTypes: string[][] = [
    ["My Incidents", "My Safety Docs"]
  ];

  contentRoutes: string[][] = [
    ["myIncidents", "mySafetyDocs"],
  ];
  sidebarMap: Map<string, string> = new Map();

  constructor(private router:Router) { }

  ngOnInit(): void {
    let textToPrint = this.contentTypes[this.sidebarid];
    let routesToApply = this.contentRoutes[this.sidebarid];
    this.zipTextandRoutesToMap(textToPrint, routesToApply);
  }

  zipTextandRoutesToMap(textToPrint: string[], routesToApply: string[]){
    
    let i;
    for(i = 0; i < textToPrint.length; i++){
      this.sidebarMap.set(textToPrint[i], routesToApply[i]);
    }

  }

}
