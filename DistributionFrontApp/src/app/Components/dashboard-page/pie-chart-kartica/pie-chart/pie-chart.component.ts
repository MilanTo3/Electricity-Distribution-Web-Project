import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  dataList = [
    {
      "name": "Safety Docs",
      "value": 5001
    }, {
      "name": "Work Requests",
      "value": 7322
    }, {
      "name": "Work Plans",
      "value": 1726
    }
  ];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  view: [number, number] = [364, 300];

  // options
  showLegend: boolean = true;
  gradient: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#dd612c', '#EC7729', '#699fa1', '#a5d6d9', '#c3e5e7']
  };

  constructor() { }

  ngOnInit(): void {
  }

}
