import { NotificationComponent } from './notification/notification.component';
import { Component, OnInit } from '@angular/core';
import { clearAllProjections } from 'ol/proj';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  filterOptions = ["All notifications", "Unread notifications", "Errors", "Info", "Success", "Warnings"];
  test = 1;
  selectedFilter = "All notifications";
  notificationMessages = [
    { type: "Success", content: 'Notification text', seen: true },
    { type: "Info", content: 'Notification text', seen: true },
    { type: "Warning", content: 'Notification text' , seen: true},
    { type: "Error", content: 'Notification text', seen: true },
    { type: "Error", content: 'Notification text', seen: false },
    { type: "Info", content: 'Notification text', seen: false },
    { type: "success", content: 'Notification text', seen: false}
  ];
  constructor() { }

  ngOnInit(): void {
    console.log(this.notificationMessages);
  }
  onClick(filter:string){
    this.selectedFilter = filter;
    console.log(this.selectedFilter);
  }
  filter(){
    switch(this.selectedFilter){
      case 'Success': 
      {
      return this.notificationMessages.filter(i => i.type === 'Success');
      }
      case 'Info': 
      {
      return this.notificationMessages.filter(i => i.type === 'Info');
      }
      case 'Errors': 
      {
      return this.notificationMessages.filter(i => i.type === 'Error');
      }
      case 'Warnings': 
      {
      return this.notificationMessages.filter(i => i.type === 'Warning');
      }
      case 'Unread notifications': 
      {
      return this.notificationMessages.filter(i => i.seen == false);
      }
      default: return this.notificationMessages;
    }
  }
  markAsRead(){
    var unreadNotifications = this.notificationMessages.filter(i => i.seen == false);
    for (var notification of unreadNotifications) 
    {
      notification.seen=true;
    }
  }
  clearAll(){
    this.notificationMessages = [];
  }
}
