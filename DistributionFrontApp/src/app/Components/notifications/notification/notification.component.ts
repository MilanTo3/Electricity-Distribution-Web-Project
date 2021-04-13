import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input('type') type: string;
  @Input('content') content: string;
  @Input('seen') seen: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
