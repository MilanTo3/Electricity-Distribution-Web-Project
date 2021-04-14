import { NotificationComponent } from './notification/notification.component';
import { Component, OnInit } from '@angular/core';
import { clearAllProjections } from 'ol/proj';
import { ToastrService } from 'ngx-toastr';

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
    { type: "Success", content: 'Notification text', seen: false}
  ];
  constructor( private toastr: ToastrService ) { }

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
  
  showToastrSuccess(){
    this.toastr.success('superiska', 'yay');

  }
  showToastrInfo(){
    this.toastr.info('hello', 'jako bitna informacija');

  }
  showToastrWarning(){
    this.toastr.warning('ne to ', 'zasto bre');

  }
  showToastrError(){
    this.toastr.error('oumajgad', 'ded');

  }
}
