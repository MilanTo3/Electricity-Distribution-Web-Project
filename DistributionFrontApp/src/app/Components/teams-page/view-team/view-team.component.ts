import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/User.model';
import { TeamsServiceService } from '../../../Services/teams-service.service';
import { TeamMember } from '../../../Models/TeamMember.model';
import * as moment from 'moment';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {

  usedMem: TeamMember[] = [];
  dateCreated;
  incidentId;
  parameter;
  name;

  constructor(private route: ActivatedRoute, private teamService: TeamsServiceService) { }

  async ngOnInit(): Promise<void> {

    this.parameter = this.route.snapshot.paramMap.get('teamId');

    let teamInfo = await this.teamService.getTeam(this.parameter).toPromise();
    this.name = teamInfo["name"];
    this.dateCreated = moment(teamInfo["dateCreated"]).format('YYYY-MM-DD');
    this.incidentId = teamInfo["incidentId"];

    this.usedMem = await this.teamService.getTeamMembers(this.parameter).toPromise();
  }

}
