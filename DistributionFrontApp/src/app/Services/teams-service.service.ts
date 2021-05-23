import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamMember } from '../Models/TeamMember.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsServiceService {

  constructor(private http: HttpClient) { }

  getAllTeams(){
    return this.http.get('http://localhost:24885/api/Teams/getTeams');
  }

  createTeam(formdata: any){
    return this.http.post('http://localhost:24885/api/Teams/addTeam', formdata);
  }

  getAvailableTeamMembers(){
    return this.http.get<TeamMember[]>('http://localhost:24885/api/Teams/getAvailableTeamMembers');
  }

}
