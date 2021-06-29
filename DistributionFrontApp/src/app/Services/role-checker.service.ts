import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUser } from '../Models/LoggedUser.model';

@Injectable({
  providedIn: 'root'
})
export class RoleCheckerService {

  roles = ["Administrator", "Dispatcher", "DataAnalyst", "TeamMember", "Consumer", "Guest"]
  routeMap: Map<string, string[]> = new Map<string, string[]>([
    ["/dashboard", this.roles.slice(0, 4)],
    ["/profile", this.roles.slice(0, 5)],
    ["/myIncidents", this.roles.slice(0, 4)],
    ["/mySafetyDocs", this.roles.slice(0, 4)],
    ["/workRequests", this.roles.slice(0, 4)],
    ["/workRequestForm", this.roles.slice(0, 4)],
    ["/newIncident", this.roles.slice(0, 4)],
    ["/workPlans", this.roles.slice(0, 4)],
    ["/newWorkPlan", this.roles.slice(0, 4)],
    ["/teamsPage", ["Administrator"]],
    ["/createTeam", ["Administrator"]],
    ["/adminPanel", ["Administrator"]],
    ["/notifications", ["Guest"]],
    ["/consumers", ["Administrator"]],
    
  ]);

  constructor(private router: Router) { }

  checkRole(roleIndices: number[]) {
    if (sessionStorage.getItem('loggedUser') !== null) {

      let loggedUser: LoggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
      let requiredRoles = this.getRolesFromIndices(roleIndices);
      if (requiredRoles.includes(loggedUser.role)) {
        return true;
      }
    }
    return false;
  }

  checkPageRole() { // vracam true ako je permisija okej.
    if (sessionStorage.getItem('loggedUser') !== null && this.routeMap.has(window.location.pathname)) {
      let loggedUser: LoggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

      let array: string[] = this.routeMap.get(window.location.pathname);
      if (array.includes(loggedUser.role)) {
        return true;
      }
    }
    return false;
  }

  getRolesFromIndices(indexes: number[]) {
    let requiredRoles: string[] = [];
    for (var i = 0; i < indexes.length; i++){
      if(this.roles.length > indexes[i]){
        requiredRoles.push(this.roles[i]);
      }
    }
    
    return requiredRoles;
  }

}
