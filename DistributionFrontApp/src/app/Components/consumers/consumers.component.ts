import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.css']
})
export class ConsumersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  createNewConsumer(){
    this.router.navigate(['/new-consumer']);
  }
}
