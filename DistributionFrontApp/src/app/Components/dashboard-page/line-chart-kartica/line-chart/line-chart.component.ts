import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  dataList = [
    {
      "name": "Planned Incidents",
      "series": [
        {
          "name": "January",
          "value": 125
        }, {
          "name": "February",
          "value": 197
        }, {
          "name": "March",
          "value": 209
        }
      ]
    }, {
      "name": "Unplanned Incidents",
      "series": [
        {
          "name": "January",
          "value": 210
        }, {
          "name": "February",
          "value": 20
        }, {
          "name": "March",
          "value": 203
        }
      ]
    }
  ]

  view: [number, number] = [700, 370];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Incidents';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#dd612c', '#EC7729', '#699fa1', '#a5d6d9', '#c3e5e7']
  };

  constructor() { }

  ngOnInit(): void {
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
}

}
