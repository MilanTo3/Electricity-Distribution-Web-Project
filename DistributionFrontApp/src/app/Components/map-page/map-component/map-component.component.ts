import { Component, NgZone, AfterViewInit, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
import { transform } from 'ol/proj';
import { CallService } from 'src/app/Services/call.service';
import { LocationService } from 'src/app/Services/location.service';

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
  @Output() emitValues = new EventEmitter<[number, number]>();

  constructor(private callsGetter: CallService, private locationGetter: LocationService) { }

  addPoint(lat: number, lon: number, additionalInfo: string, type: string) {

    console.log(additionalInfo);
    let newPoint = new Feature({ geometry: new Point(fromLonLat([lon, lat])) });
    newPoint.set('addInfo', additionalInfo);
    newPoint.set('type', type);
    let picturePath: string = "assets/Images/pin.png";
    if(type.startsWith('Call')){
      picturePath = "assets/Images/phone-call.svg";
    }

    newPoint.setStyle(new Style({
      image: new Icon(({
        crossOrigin: 'anonymous',
        src: picturePath,
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

  async ngOnInit() {

    let mapElement = document.getElementById("map")!;
    mapElement.style.width = this.width.toString() + "px";
    mapElement.style.height = this.height.toString() + "px";
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
    this.addPoint(45.2396, 19.8227, "", "");
    this.addPoint(45.2396, 19.9227, "", "");
    let calls = await this.callsGetter.GetCalls().toPromise();

    let i;
    for(i = 0; i < calls["length"]; i++){
      let location = await this.locationGetter.GetLocation(calls[i]["id"]).toPromise();
      if(location !== null){
        this.addPoint(location["latitude"], location["longitude"], calls[i]["reason"], "Call in street: " + location["street"]);
      }
    }
    
    this.overlayPopup.setElement(document.getElementById('tooltip'));
    let popupContent = document.getElementById('popupContent');
    let popupCloser = document.getElementById('popupCloser');

    this.map.on('click', (evt) => {
      let item = document.getElementById('tooltip');

      let feature = this.map.forEachFeatureAtPixel(
        evt.pixel,
        function (ft, layer) { return ft; }
      );
      if (feature) {
        let info = feature.get('addInfo');
        let type = feature.get('type');
        this.overlayPopup.setPosition(evt.coordinate);
        item.hidden = false;
        popupContent.innerHTML = "<p>Reason: "+ info +"</p>";
        popupCloser.innerHTML = "<p>"+ type +"</p>";
      }else{
        item.hidden = true;
        this.overlayPopup.setPosition(undefined);
        let lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        this.emitValues.next([lonlat[0], lonlat[1]]);
      }

    });

  }

}
