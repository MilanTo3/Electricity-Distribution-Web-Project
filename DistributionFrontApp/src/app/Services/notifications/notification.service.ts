import { ToastrService } from 'ngx-toastr';
import { Notification } from './../../Models/notification.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
//import * as signalR from "@microsoft/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
   data: any;
   //private hubConnection: signalR.HubConnection;
   notificationMessages= [
    { type: "Success", content: 'Notification text', seen: true },
    { type: "Info", content: 'Notification text', seen: true },
    { type: "Warning", content: 'Notification text' , seen: true},
    { type: "Error", content: 'Notification text', seen: true },
    { type: "Error", content: 'Notification text', seen: false },
    { type: "Info", content: 'Notification text', seen: false },
    { type: "Success", content: 'Notification text', seen: false}
  ];
  constructor(private tostr: ToastrService, private http: HttpClient) { 
  }
 // public startConnection = () => {
    /* this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:24885/notifikacije')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err)) */
 // }
  //public addNotificationListener = () => {
    // this.hubConnection.on('notif', (data) => {
    //   this.data = data;
    //   console.log(this.data);
    //   this.tostr.info(this.data.content, this.data.type);
      //this.notificationMessages.push({type: this.data.type, content: this.data.details, seen: this.data.seen});
    //});
  //}

  GetUserNotifications(username){
    //const notifications = of(this.notificationMessages);
   // return notifications;
   return this.http.get('http://localhost:24885/api/Notification/GetUserNotifications?username=' + username);
  }
  getUnreadNotifications(username){
    return this.http.get('http://localhost:24885/api/Notification/GetUnreadNotifications?username=' + username);

  }
  setMarkAsRead(username){
    /*var unreadNotifications = this.notificationMessages.filter(i => i.seen == false);
    for (var notification of unreadNotifications) 
    {
      notification.seen=true;
    }
    unreadNotifications = this.notificationMessages.filter(i => i.seen == false);
    const notifications = of(unreadNotifications);
    return notifications;*/
    return this.http.post('http://localhost:24885/api/Notification/MarkAsSeen', username);

  }
  clearAll(username) {
    /*this.notificationMessages = [];
    const notifications = of(this.notificationMessages);
    return notifications;*/
    return this.http.post('http://localhost:24885/api/Notification/ClearAllNotifications', username);

  }
} 
