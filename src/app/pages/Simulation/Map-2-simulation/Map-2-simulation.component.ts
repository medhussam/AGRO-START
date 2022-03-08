import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

 import '../../../../../node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js';
 import '../../../../../node_modules/leaflet.browser.print/dist/leaflet.browser.print.min.js';
 import '../../../../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src.js';
 import '../../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
 
declare var HeatmapOverlay;
import { ParcelleService } from 'app/_services/parcelle.service';

import { CapteureService } from 'app/_services/capteure.service';


import 'leaflet';
import { ExploitationService } from 'app/_services/exploitation.service.js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { VapoService } from 'app/_services/vapo.service.js';
declare let L;
@Component({
  selector: 'ngx-Map-2-simulation',
  styleUrls: ['./Map-2-simulation.component.scss'],
 template: `
  
    <nb-select   [(ngModel)]="currentMsgToParent" [(selected)]="selectedDateMap"  style="position:absolute;z-index:997;margin:12px;right: 6px; top: 3px;width: 250px;" placeholder="Dernier date" class="float-right"      status="primary">
    <nb-option   *ngFor="let date of daates,let i = index" [value]="Dates[i]" (click)="changeDate(Layers[i])"   >
    {{date}} </nb-option>
      </nb-select>
      <img src="../../assets/images/Capture0.png" alt="legend" class="legentIndex">
 <nb-card>
 <nb-card-body> 
 
 <div style="height: 450px  !important;" leaflet [leafletOptions]="options" (leafletMapReady)="onMapReady($event)"></div>
 
</nb-card-body>
 </nb-card> 
 `,
})
export class Map2simulationComponent implements OnInit,OnChanges {

  @Input() ExploitationEvent;
  @Input() IndiceEvent;
  @Input() DateEvent;
  @Input() selectedParcelle;

  @Input() ImageryData;
  @Input() date0;
  daates : any[] = [];
  Layers : any[] = []; 
  Dates: any[] = [];

  @Input() parceletcImagery;
  @Output() tiimes = new EventEmitter<string>();


  SoilTemperatureIcon: string;
  SoilHumidityIcon: string;
  SoilConductivityIcon: string;
  capteurs: any[];
  selectedDate: any;
  
 
  constructor(
    private exploitationService: ExploitationService,private parcelleService: ParcelleService,private capteureService: CapteureService) {
    this.SoilTemperatureIcon = '../../../../../assets/images/soil_temperature.png'
    this.SoilHumidityIcon = '../../../../../assets/images/soil_humidity.png'
    this.SoilConductivityIcon = '../../../../../assets/images/soil_conductivity.png'
  }



  map : L.Map

  allExploitationsInGeoJson : any
  exploitations : any[] = [];


  allImageryData : any
  dates : any[] = []
  daate0 : any
  selectedDateMap: any
  tile : any;
  tile_parcelle : any[] = [];
  parcelles : any[] = [];
  
  overlayMaps : any
  controlelayer : any
  baseMaps : any
  Layer : any



  ngOnInit(): void {

    
  }
  currentMsgToParent = 'null';
  changeDate(event){

    this.tiimes.emit(this.currentMsgToParent);



    this.Layer = event

    console.log(this.Layer)

    // if(this.ExploitationEvent!=undefined && this.selectedDate!=undefined && this.selectedParcelle!=undefined){

      if(this.tile != undefined){
          this.map.removeLayer(this.tile)
      }    

      this.tile = L.tileLayer.wms("http://10.10.100.66:8080/geoserver/agro/wms",{
        layers :  this.Layer ,
        format : 'image/png',
        transparent : true ,
        styles : 'ETc_palette'
      }).addTo(this.map)


      // this.tile.forEach(element => {
      //   this.overlayMaps["NDWI"] = element
      // });
      // this.overlayMaps["ETC"] = this.tile

      // if(this.controlelayer!=undefined){
      //   this.map.removeControl(this.controlelayer);
      // }

      // if(this.overlayMaps!=undefined){

      //   this.controlelayer = L.control.layers(this.baseMaps, this.overlayMaps)
      //   this.controlelayer.addTo(this.map);

      // }else{
      //   this.controlelayer = L.control.layers(this.baseMaps)
      //   this.controlelayer.addTo(this.map);
      // }      
    // } 
  }
  ngOnChanges(){

    this.daates = []
     this.Layers = []
    this.Dates = []
    this.parceletcImagery.map(element => {

      this.daates.push(this.convert(element.time))
      this.Layers.push(element.layer_name)
      this.Dates.push(element.time)

     // console.log(element.layer_name)
      
    });
    this.selectedDateMap = this.Dates[0]; 
    this.changeDate(this.Layers[0])
    
    if(this.exploitations!=undefined){
      this.exploitations.forEach(element => {
        if(element.id_exploitation == this.ExploitationEvent){
         element.feature.setStyle({
           "color" : "#00FFFF",
           "weight" : 2,
           "opacity" : 1,
           "fillOpacity" : 0
         }); 
        }else{
         element.feature.setStyle({
           "color" : "#FFF",
           "weight" : 3,
           "opacity" : 1,
           "fillOpacity" : 0
         }); 
        }   
      });
    }

    if(this.parcelles!=undefined){
      this.parcelles.forEach(element => {
        if(element.id_parcelle == this.selectedParcelle){
         element.feature.setStyle({
           "color" : "yellow",
           "weight" : 2,
           "opacity" : 1,
           "fillOpacity" : 0
         }); 
         this.map.fitBounds(element.feature.getBounds()); 

        }else{
         element.feature.setStyle({
           "color" : "#000",
           "weight" : 3,
           "opacity" : 1,
           "fillOpacity" : 0
         }); 
        }   
      });
    }


      if(this.tile != undefined){
          this.map.removeLayer(this.tile)
      }    

      this.tile = L.tileLayer.wms("http://10.10.100.66:8080/geoserver/agro/wms",{
        layers :  this.Layer ,
        format : 'image/png',
        transparent : true ,
        styles : 'ETc_palette'
      }).addTo(this.map)


    // if(this.selectedParcelle!=undefined){

    //   var dates :any[]= []
    //   // this.ImageryData.forEach(all => {
    //   //   if(all.id_parcelle == this.selectedParcelle){
    //   //     if(all["tiles"][0]!=undefined){
    //   //       all["tiles"].forEach(tiles => {
    //   //         dates.push({"time" :tiles.time, "cloud_coverage" : tiles.cloud_coverage})
    //   //       });
    //   //     }
    //   //      this.daate0 = all["tiles"][0].time
    //   //   } 
    //   // });
    //   // this.dates = dates
    //   // this.selectedDateMap = dates[0].cloud_coverage;
    //   // this.changeDate(this.daate0);
    // } 

//     if(this.ExploitationEvent!=undefined && this.selectedDate!=undefined && this.selectedParcelle!=undefined){

//       if(this.tile!= undefined){
//           this.map.removeLayer(this.tile)
//       }
     
//       this.parceletcImagery.forEach(all => {
        
//         console.log(all.time +'=='+ this.selectedDate);
//         if(all.time == this.selectedDate){
           

//               this.tile.push(L.tileLayer.wms("http://10.10.100.66:8080/geoserver/agro/wms",{
//                 layers :  all.layer_name ,
//                 format : 'image/png',
//                 transparent : true ,
//                 styles : 'ETc_palette'
//               }))
//               this.tile.addTo(this.map)

//         }

// });
// // this.tile.forEach(element => {
// //   this.overlayMaps["NDWI"] = element
// // });
// this.overlayMaps["ETC"] = this.tile

//       if(this.controlelayer!=undefined){
//         this.map.removeControl(this.controlelayer);
//       }

//       if(this.overlayMaps!=undefined){

//         this.controlelayer = L.control.layers(this.baseMaps, this.overlayMaps)
//         this.controlelayer.addTo(this.map);

//       }else{
//         this.controlelayer = L.control.layers(this.baseMaps)
//         this.controlelayer.addTo(this.map);
//       }
//     }
  }

 options = {
   layers: [
     L.tileLayer("https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=ar-MA&gl=MA", {
       subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
     })
   ],
 };

 onMapReady(map: L.Map) {
  this.map = map
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

  this.exploitationService.getExploitations().subscribe((json: any) => {
    this.allExploitationsInGeoJson = L.geoJSON(json, {
      onEachFeature: (feature, layer) => {
        let popupContent = `<p> id_exploitation: ${feature.properties.id_exploitation}</p>
        <p> region: ${feature.properties.region}</p>`;
        layer.bindPopup(popupContent);
        var element = L.geoJSON(feature,{
          onEachFeature: (feature, layer) => {
            let popupContent = `<p> id_exploitation: ${feature.properties.id_exploitation}</p>
            <p> region: ${feature.properties.region}</p>`;
            layer.bindPopup(popupContent);
          },
          style: function (feature) {
            return {
              color: '#fff',
              opacity : 1,
              fillOpacity : 0
            };
          }
        }).addTo(map);
        this.exploitations.push({'id_exploitation': feature.properties.id_exploitation,'feature':element})

      },
      style: function (feature) {
        return {
          color: '#fff'
        };
      },
      pointToLayer: function (feature, layer) {
        return {
          color: '#000'
        };
      }
    })
   
    map.fitBounds(this.allExploitationsInGeoJson.getBounds());

  })

  var parcelle
  this.parcelleService.getParcelles().subscribe((json: any) => {
    parcelle = L.geoJSON(json , {
      onEachFeature: (feature, layer) => {
        var element = L.geoJSON(feature , {
          onEachFeature: (feature, layer) => {
            layer.bindTooltip(
              feature.properties.id_parcelle,
              {
                  permanent:true,
                  direction:'center',
                  className: 'countryLabel'
              }  
            )
          },
          style: function (feature) {
            return {
              color: '#000'
            };
          },
        }).addTo(map);
      this.parcelles.push({'id_parcelle': feature.properties.id_parcelle,'feature':element})

      },
    })
  });

 



  var SoilTemperature = L.icon({
    iconUrl: this.SoilTemperatureIcon,
  });
  var SoilHumidity = L.icon({
    iconUrl: this.SoilHumidityIcon,
  });
  var SoilConductivity = L.icon({
    iconUrl: this.SoilConductivityIcon,
  });

    var capteur
    var capteursList = []
    var capteursGroupe
    var capteursListgroupe=[]

    this.capteureService.getCapteures().subscribe((json: any) => {
      capteur = L.geoJSON(json, {
        onEachFeature: function (features, layer) {
          if(features.properties.mesure == 'soil_temperature' || features.properties.mesure == 'soil_humidity' || features.properties.mesure == 'soil_conductivity'){
            var element = L.geoJSON(features,{
              onEachFeature: (feature, layer) => {
                if(feature.properties.mesure == 'soil_temperature'){
                  let popupContent = `<p> Id_capteur : ${feature.properties.id_capteur}</p>
                  <p> Type de mesure : Température du sol, Humidité du sol et Conductivité du sol </p>`;
  
                  layer.bindPopup(popupContent)
                  layer.setIcon(SoilTemperature);
                }else if(feature.properties.mesure == 'soil_humidity'){
                  let popupContent = `<p> Id_capteur : ${feature.properties.id_capteur}</p>
                  <p> Type de mesure : Température du sol, Humidité du sol et Conductivité du sol </p>`;
  
                  layer.bindPopup(popupContent)
                  layer.setIcon(SoilHumidity);
                }else if(feature.properties.mesure == 'soil_conductivity'){
                  let popupContent = `<p> Id_capteur : ${feature.properties.id_capteur}</p>
                  <p> Type de mesure : Température du sol, Humidité du sol et Conductivité du sol </p>`;
  
                  layer.bindPopup(popupContent)
                  layer.setIcon(SoilConductivity);
                }
              }
            }).addTo(map);
  
          }
          capteursList.push({'id_capteur': features.properties.id_capteur,'mesure': features.properties.mesure,'id_exploitation': features.properties.id_exploitation,'feature':element, 'alert_level': features.properties.alert_level, 'alert_type': features.properties.alert_type,'coordinates':features.geometry.coordinates})
          capteursListgroupe.push(element)  
        },
      })

      this.capteurs = capteursList
      capteursGroupe = L.layerGroup(capteursListgroupe)
    })
  var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=ar-MA&gl=MA',{
    subdomains:['mt0','mt1','mt2','mt3']
  });
  var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=ar-MA&gl=MA',{
    subdomains:['mt0','mt1','mt2','mt3']
  });

  var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=ar-MA&gl=MA',{
    subdomains:['mt0','mt1','mt2','mt3']
  });

  var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&hl=ar-MA&gl=MA',{
    subdomains:['mt0','mt1','mt2','mt3']
  });
  this.baseMaps = {
    "Open Street Map" : googleStreets,
    "Hybrid" : googleHybrid,
    "satellite" : googleSat,
    "Terrain" : googleTerrain
  };
  map.attributionControl.addAttribution('Agro-Concept/SA');
}



convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    year_ = date.getFullYear()
  switch (mnth) {
    case "01": {
      return [day,"Janvier ",year_].join(" ");
      break;
    }
    case "02": {
      return [day,"Février ",year_].join(" ");
      break;
    }
    case "03": {
      return [day,"Mars ",year_].join(" ");
      break;
    }
    case "04": {
      return [day,"Avril ",year_].join(" ");
      break;
    }
    case "05": {
      return [day,"Mai ",year_].join(" ");
      break;
    }
    case "06": {
      return [day,"Juin ",year_].join(" ");
      break;
    }
    case "07": {
      return [day,"Juillet ",year_].join(" ");
      break;
    }
    case "08": {
      return [day,"Août ",year_].join(" ");
      break;
    }
    case "09": {
      return [day,"Septembre ",year_].join(" ");
      break;
    }
    case "10": {
      return [day,"Octobre ",year_].join(" ");
      break;
    }
    case "11": {
      return [day,"Novembre ",year_].join(" ");
      break;
    }
    case "12": {
      return [day,"Décembre",year_].join(" ");
      break;
    }
  }}
}