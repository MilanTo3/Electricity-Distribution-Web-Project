import {Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef, OnInit, ɵresetJitOptions } from '@angular/core';
import olMap from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  @Input('width') width = 930;
  @Input('height') height = 500;
  map: any;
  view: View = new View();

  constructor() { }

  ngOnInit(){

    let convertedMapCoordinate = fromLonLat([19.8227, 45.2396]);

    const osmLayer = new TileLayer({
      source: new OSM()
    });
    
    const xyzLayer = new TileLayer({
      source: new XYZ({
        url: 'http://tile.osm.org/{z}/{x}/{y}.png'
      })
    });
    this.view = new View({
      center: convertedMapCoordinate, 
      zoom: 12
    });

    this.map = new olMap({
      target: 'map',
      layers: [
        osmLayer,
        // xyzLayer
      ],
      view: this.view
    });
    let mapElement = document.getElementById("map")!;
    mapElement.style.width = this.width.toString() + "px";
    mapElement.style.height = this.height.toString() + "px";

  }

}
