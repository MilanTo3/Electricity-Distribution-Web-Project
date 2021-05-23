import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { User } from '../../../Models/User.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamMember } from '../../../Models/TeamMember.model';
import { TeamsServiceService } from '../../../Services/teams-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  availableMem: TeamMember[] = [];
  usedMem: TeamMember[] = [];
  teamsForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private teamsService: TeamsServiceService, private toastr: ToastrService){
    this.addMockUsers();
  }

  async addMockUsers(){

    this.availableMem = await (await this.teamsService.getAvailableTeamMembers()).toPromise();
    
  }

  onSubmit(){

    let i;

    let formdata: FormData = new FormData();
    formdata.append('team', this.teamsForm.get('name').value);
    for(i = 0 ; i < this.usedMem.length; i++){
      formdata.append('usernames', this.usedMem[i].username);
    }

    this.teamsService.createTeam(formdata).subscribe(
      res => {
        this.router.navigateByUrl('/teamsPage');
        this.toastr.success('Team has been successfully created.', 'Team Created.');
      }
    );

  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<TeamMember[]>) {
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
