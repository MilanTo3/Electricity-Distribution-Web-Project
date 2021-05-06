import { Component, NgZone, AfterViewInit, Input, OnInit } from '@angular/core';
import olMap from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Layer, Tile as TileLayer, Vector, Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style';
import { getVectorContext } from 'ol/render';
import Geometry from 'ol/geom/Geometry';
import Source from 'ol/source/Source';
import { Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  @Input('width') width = 930;
  @Input('height') height = 500;
  map: olMap;
  view: View = new View();
  vectorSource = new VectorSource({});
  vectorLayer = new VectorLayer({ source: this.vectorSource });
  overlayPopup = new Overlay({ element: document.getElementById('tooltip') });

  constructor() { }

  addPoint(lat: number, lon: number) {

    let newPoint = new Feature({ geometry: new Point(fromLonLat([lon, lat])) });
    newPoint.set('teamid', '1');

    newPoint.setStyle(new Style({
      image: new Icon(({
        crossOrigin: 'anonymous',
        src: 'assets/Images/pin.png',
        imgSize: [512, 512],
        scale: 0.07,
      })),
      text: new Text({
        font: '10px Georgia',
        text: 'Test text.',
        offsetY: 23,
        fill: new Fill({ color: '#ec7729' })
      }),
    }));

    this.vectorSource.addFeature(newPoint);

  }

  clearMap() {
    this.map.removeLayer(this.vectorLayer);
  }

  ngOnInit() {

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
      view: this.view,
      overlays: [this.overlayPopup],
    });

    this.map.addLayer(this.vectorLayer);
    this.addPoint(45.2396, 19.8227);
    this.addPoint(45.2396, 19.9227);
    
    this.overlayPopup.setElement(document.getElementById('tooltip'));

    let mapElement = document.getElementById("map")!;
    mapElement.style.width = this.width.toString() + "px";
    mapElement.style.height = this.height.toString() + "px";

    this.map.on('click', (evt) => {
      let item = document.getElementById('tooltip');

      let feature = this.map.forEachFeatureAtPixel(
        evt.pixel,
        function (ft, layer) { return ft; }
      );
      if (feature) {
        this.overlayPopup.setPosition(evt.coordinate);
        item.hidden = false;
      }else{
        item.hidden = true;
        this.overlayPopup.setPosition(undefined);
      }

    });

  }

}
