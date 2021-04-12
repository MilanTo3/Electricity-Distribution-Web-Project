import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User.model';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.css']
})
export class NewCallComponent implements OnInit {

  users = [new User("Erik", "Hoffstad", "erikhoffstad123@squirel.com", "Dispatcher", "username2", "2019-01-16", "fejkadresa", "/assets/Images/colorpattern.jpg"),
          new User("Drugi", "User", "efdg@squirel.com", "Admin", "username", "2019-01-16", "adresausera", "/assets/Images/colorpattern.jpg")];
  customerInfo: User;
  
  user = new User("", "", "", "", "", "", "", "");
  
  constructor() { 
    this.customerInfo = this.user;
  }

  ngOnInit(): void {
  }

  resetModal()
  {
    this.customerInfo = this.user;
  }
  selectCustomer()
  {
  }
}
