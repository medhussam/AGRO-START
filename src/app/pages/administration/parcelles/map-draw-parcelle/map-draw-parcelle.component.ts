import { Component, OnInit } from '@angular/core';
import { DrawEvents, featureGroup, FeatureGroup, icon, latLng, tileLayer } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import '../../../../../../node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import '../../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
import '../../../../../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src.js';
import '../../../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';

import 'leaflet';
import { PopupParcelleService } from '../addmodal-parcelle/popup-parcelle.service';
declare let L;
@Component({
  selector: 'ngx-map-draw-parcelle',
  templateUrl: './map-draw-parcelle.component.html',
  styleUrls: ['./map-draw-parcelle.component.scss']
})
export class MapDrawParcelleComponent implements OnInit {

  constructor(private modalService: PopupParcelleService) { }
  drawnItems: FeatureGroup = featureGroup();
  map : L.Map
  ngOnInit(): void {
  }
  options = {
    layers: [
     L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=ar-MA&gl=MA',{
       subdomains:['mt0','mt1','mt2','mt3']
     })
    ],
   zoom: 5,
   center: [ 31.791702,  -7.09262 ],
   contextmenu: true,
   contextmenuWidth: 140,
     // contextmenuItems: [{
     //     text: 'Show coordinates',
     //     callback: this.showCoordinates
     // }, {
     //     text: 'Center map here',
     //     callback: this.centerMap
     // }, '-', {
     //     text: 'Zoom in',
     //     callback: this.zoomIn
     // }, {
     //     text: 'Zoom out',
     //     // icon: 'images/zoom-out.png',
     //     callback: this.zoomOut
     // }]
  };
   
 drawOptions = {
  position: 'topleft',

  draw: {
    polygon: {
     shapeOptions: {
       color: '#FF0000'
   },
    },
    
    marker: false,
    
    polyline: false,
    rectangle: false,
    circle: false,
    circlemarker: false,
  },
  edit: {
   featureGroup: this.drawnItems,
   remove: false
 }
  // draw: false,
  // edit: {featureGroup: this.editableLayers, remove: false}
};
drawLocal: any = {
  draw: {
    toolbar: {
      buttons: {
        polygon: 'Draw an awesome polygon!'
      }
    }
  }
};
public onDrawCreated(e: any) {
  this.drawnItems.addLayer((e as DrawEvents.Created).layer);
  const { layerType, layer } = e;
 let seeArea1 = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);

 let totalArea = seeArea1/10000;
 layer.addTo(this.map)
 let jeojsonExp = layer.toGeoJSON();
 
 this.modalService.open("add");
}
public onDrawStart(e: any) {
  //alert('Draw Started Event!')
}
closeModal(id: string) {
  this.modalService.close(id);
}
openModal(id: string) {
  this.modalService.open(id);
}
onMapReady(map: L.Map) {
  this.map = map
  const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
  provider: provider,
  autoClose: true
});
map.addControl(searchControl)
L.control.fullscreen({
  position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
  title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
  titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
  content: null, // change the content of the button, can be HTML, default null
  forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
  forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
  fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
}).addTo(map);



map.on('enterFullscreen', () => map.invalidateSize());
map.on('exitFullscreen', () => map.invalidateSize());

L.control.browserPrint({
title: 'Imprimer la carte',
printModesNames: {
Portrait: 'Portrait',
Landscape: 'Paysage',
Auto: 'Auto',
Custom: 'Séléctionnez la zone'
}
}).addTo(map);
L.control.coordinates().addTo(map);



var measureControl = L.control.measure(
{
 measureControl: true,
 position: 'topleft',
 primaryAreaUnit: 'hectares',
 activeColor: '#ABE67E',
 completedColor: '#C8F2BE',
 popupOptions: { className: 'leaflet-measure-resultpopup', autoPanPadding: [10, 10] },
 captureZIndex: 10000,
 labels: { "label": "Label translation" }
}

);
measureControl.addTo(map);

map.attributionControl.addAttribution('agroconcept');

}

}
