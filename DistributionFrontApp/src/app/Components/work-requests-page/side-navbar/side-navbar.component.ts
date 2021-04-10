import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  @Input('sidebarType') sidebarid:number = 0;
  contentTypes: string[][] = [
    ["Basic Information", "History of State Changes", "Multimedia Attachments"],
    ["Basic Information", "Devices", "Resolution"],
    ["Basic information", "History of state changes", "Multimedia attachments", "Equipement", "Switching instructions"]
    ["Basic Information", "Devices", "Resolution", "Calls"]
  ];
  contentRoutes: string[][] = [
    ["basicInformation", "historyStateChanges", "multimediaAttachments"],
    ["basicInformation", "devices", "resolution", "calls", "crew", "multimediAttachments", "equipment"],
    ["basic-information", "history-of-state-changes", "multimedia-attachments", "equipement", "switching-instructions"]
  ];
  sidebarMap: Map<string, string> = new Map();

  constructor() { }

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
