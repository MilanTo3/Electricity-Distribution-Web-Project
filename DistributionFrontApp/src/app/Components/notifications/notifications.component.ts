import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  filterOptions = ["All notifications", "Unread notifications", "Errors", "Info", "Success", "Warnings"];

  constructor() { }

  ngOnInit(): void {
  }

}
