import { Notification } from './../../Models/notification.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationMessages;

  constructor() { 
    this.notificationMessages= [
      { type: "Success", content: 'Notification text', seen: true },
      { type: "Info", content: 'Notification text', seen: true },
      { type: "Warning", content: 'Notification text' , seen: true},
      { type: "Error", content: 'Notification text', seen: true },
      { type: "Error", content: 'Notification text', seen: false },
      { type: "Info", content: 'Notification text', seen: false },
      { type: "Success", content: 'Notification text', seen: false}
    ];
  }
  getAllNotifications(): Observable<Notification[]>{
    const notifications = of(this.notificationMessages);
    return notifications;
  }
  getUnreadNotifications(): Observable<Notification[]>{
    const unreadNotifications = this.notificationMessages.filter(i => i.seen == false);
    const notifications = of(unreadNotifications);
    return notifications;
  }
  setMarkAsRead(): Observable<Notification[]>{
    var unreadNotifications = this.notificationMessages.filter(i => i.seen == false);
    for (var notification of unreadNotifications) 
    {
      notification.seen=true;
    }
    unreadNotifications = this.notificationMessages.filter(i => i.seen == false);
    const notifications = of(unreadNotifications);
    return notifications;
  }
  clearAll(): Observable<Notification[]>{
    this.notificationMessages = [];
    const notifications = of(this.notificationMessages);
    return notifications;
  }
}
