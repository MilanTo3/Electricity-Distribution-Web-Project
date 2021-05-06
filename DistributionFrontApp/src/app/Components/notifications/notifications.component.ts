import { NotificationComponent } from './notification/notification.component';
import { Component, OnInit } from '@angular/core';
import { clearAllProjections } from 'ol/proj';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/Services/notifications/notification.service';
import { Notification } from 'src/app/Models/notification.model';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  filterOptions = ["All notifications", "Unread notifications", "Errors", "Info", "Success", "Warnings"];
  test = 1;
  selectedFilter = "All notifications";
  notificationMessages: Notification[] = [];

  constructor( private toastr: ToastrService, private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }
  getUnreadNotifications(): void {
    this.notificationService.getUnreadNotifications()
        .subscribe(notificationMessages => this.notificationMessages = notificationMessages);
  }
  setMarkAsRead(): void {
    this.notificationService.setMarkAsRead()
        .subscribe(notificationMessages => this.notificationMessages = notificationMessages);
  }
  markAsRead(){
    this.setMarkAsRead();
  }
  getAllNotifications(){
    this.notificationService.getAllNotifications()
        .subscribe(notificationMessages => this.notificationMessages = notificationMessages);
  }

  onClick(filter:string){
    this.selectedFilter = filter;
    this.filter();
  }

  filter(){
    switch(this.selectedFilter){
      case 'Success': 
      {
       this.getAllNotifications();
       return this.notificationMessages.filter(i => i.type === 'Success');
      }
      case 'Info': 
      {
        this.getAllNotifications();
        return this.notificationMessages.filter(i => i.type === 'Info');
      }
      case 'Errors': 
      {
        this.getAllNotifications();
        return this.notificationMessages.filter(i => i.type === 'Error');
      }
      case 'Warnings': 
      {
        this.getAllNotifications();
        return this.notificationMessages.filter(i => i.type === 'Warning');
      }
      case 'Unread notifications': 
      {        
        this.getUnreadNotifications();
        return this.notificationMessages;
      }
      default: 
      {
        this.getAllNotifications();
        return this.notificationMessages;
      }
      
    }
  }
  clearAll(){
    this.notificationService.clearAll()
        .subscribe(notificationMessages => this.notificationMessages = notificationMessages);
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
