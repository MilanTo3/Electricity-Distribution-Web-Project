import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  availableMem: User[] = [];
  usedMem: User[] = [];
  teamsForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { this.addMockUsers(); }

  addMockUsers(){

    let user1 = new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Administrator", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg");
    let user2 = new User("Rukia", "Kuchiki", "kuchiki123@gmail.com", "Dispatcher", "username1", "2019-01-16", "fejkadresfda", "/assets/Images/colorpattern.jpg");
    let user3 = new User("Jordan", "Peterson", "jordanpeterson@gmail.com", "Consumer", "username3", "2019-01-16", "fejkfdadresa", "/assets/Images/colorpattern.jpg");
    let user4 = new User("Petar" , "Bojovic", "petarbojovic@gmail.com", "Administrator", "username4", "2019-01-16", "fejkfadresa", "/assets/Images/colorpattern.jpg");
    let user5 = new User("Zoe", "Castillo", "zoeDreamsCrow@gmail.com", "Consumer", "username4", "2021-2-15", "address", "/assets/Images/colorpattern.jpg");
    let user6 = new User("Corey", "Gil-Shuster", "coreyGilShuster@gmail.com", "Dispatcher", "username4", "2021-02-13", "address", "/assets/Images/colorpattern.jpg");
    
    this.availableMem.push(user1, user2, user3, user4, user5, user6);
    this.usedMem.push(user1, user2, user3, user4, user5, user6);
  }

  ngOnInit(): void {
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
