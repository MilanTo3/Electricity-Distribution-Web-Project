import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User.model';

@Component({
  selector: 'app-employed-list',
  templateUrl: './employed-list.component.html',
  styleUrls: ['./employed-list.component.css']
})
export class EmployedListComponent implements OnInit {

  teamMembers: User[] = [];

  constructor() { }

  ngOnInit(): void {
    this.addMockUsers();
  }

  addMockUsers(){

    let user1 = new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Administrator", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg");
    let user2 = new User("Rukia", "Kuchiki", "kuchiki123@gmail.com", "Dispatcher", "username1", "2019-01-16", "fejkadresfda", "/assets/Images/colorpattern.jpg");
    let user3 = new User("Jordan", "Peterson", "jordanpeterson@gmail.com", "Consumer", "username3", "2019-01-16", "fejkfdadresa", "/assets/Images/colorpattern.jpg");
    let user4 = new User("Petar" , "Bojovic", "petarbojovic@gmail.com", "Administrator", "username4", "2019-01-16", "fejkfadresa", "/assets/Images/colorpattern.jpg");
    let user5 = new User("Zoe", "Castillo", "zoeDreamsCrow@gmail.com", "Consumer", "username4", "2021-2-15", "address", "/assets/Images/colorpattern.jpg");
    let user6 = new User("Corey", "Gil-Shuster", "coreyGilShuster@gmail.com", "Dispatcher", "username4", "2021-02-13", "address", "/assets/Images/colorpattern.jpg");
    
    this.teamMembers.push(user1, user2, user3, user4, user5, user6);
  }



}
