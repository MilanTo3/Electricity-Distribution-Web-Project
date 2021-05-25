import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { TeamsServiceService } from 'src/app/Services/teams-service.service';
import { TeamMember } from '../../../Models/TeamMember.model';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  availableMem: TeamMember[] = [];
  usedMem: TeamMember[] = [];
  dateCreated;
  incidentId;
  parameter;

  teamsForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private routerActivate: ActivatedRoute, private router: Router, private fb: FormBuilder, private teamService: TeamsServiceService, private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {

    this.parameter = this.routerActivate.snapshot.paramMap.get('teamId');

    let teamInfo = await this.teamService.getTeam(this.parameter).toPromise();
    this.teamsForm.get('name').setValue(teamInfo["name"]);
    this.dateCreated = moment(teamInfo["dateCreated"]).format('YYYY-MM-DD');
    this.incidentId = teamInfo["incidentId"];

    this.availableMem = await this.teamService.getAvailableTeamMembers().toPromise();
    this.usedMem = await this.teamService.getTeamMembers(this.parameter).toPromise();

  }

  submitTeamChange(){
    let i;
    let formdata: FormData = new FormData();
    formdata.append('team', this.teamsForm.get('name').value);
    for(i = 0 ; i < this.usedMem.length; i++){
      formdata.append('usernames', this.usedMem[i].username);
    }
    formdata.append('id', this.parameter);

    this.teamService.editTeam(formdata).subscribe(
      res => {
        this.router.navigateByUrl('/teamsPage');
        this.toastr.success('Team has been successfully edited.', 'Team edited.');
      }
    );
  }

  deleteTeam(){

    let formdata = new FormData();
    formdata.append('id', this.parameter);
    this.teamService.deleteTeam(formdata).subscribe(
      res => {
        this.router.navigateByUrl('/teamsPage');
        this.toastr.success('Team has been successfully deleted.', 'Team deleted.');
      }
    );

  }

  drop(event: CdkDragDrop<User[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
