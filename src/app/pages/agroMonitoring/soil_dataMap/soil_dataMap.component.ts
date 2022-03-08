import { Component, Input, OnChanges, OnInit } from '@angular/core';

 import 'leaflet-fullscreen';
 import 'leaflet.browser.print/dist/leaflet.browser.print.min';
 import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
 import 'leaflet.fullscreen';
 
import { ParcelleService } from 'app/_services/parcelle.service';

import 'leaflet';
import { ExploitationService } from 'app/_services/exploitation.service.js';
import { CapteureService } from 'app/_services/capteure.service';

declare let L;
@Component({
  selector: 'ngx-soil_dataMap',
  styleUrls: ['./soil_dataMap.component.scss'],
 template: `

 <nb-card>
 <nb-card-body>

 
       <nb-select [(selected)]="selectedDateMap"   style="position:absolute;z-index:999;margin:12px;right:0" class="float-right"  [placeholder]="convert(daate0)"  [(selected)]="daate0" status="primary">
       <nb-option   *ngFor="let date of dates" (click)="changeDate(date.time)"[value]="date.time" >
          {{convert(date.time)}} {{date.cloud_coverage}}%</nb-option>
     </nb-select>

     
 <div style="height: 450px  !important;" leaflet [leafletOptions]="options" (leafletMapReady)="onMapReady($event)"></div>
 <div class="indice">NDWI</div> <div class="zero">0</div><div class="one">1</div><img  class="legent" width="200x" height="15px"  [src]="'../../../../../assets/images/palette.png'" />

 </nb-card-body>
 </nb-card>

 `,
})
export class soil_dataMapMapComponent implements OnInit,OnChanges {
  @Input() ExploitationEvent;
  @Input() IndiceEvent;
  @Input() DateEvent;
  @Input() selectedParcelle;

  @Input() ImageryData;
  @Input() date0;
  @Input() daates;
  
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
  tile : any[] = [];
  tile_parcelle : any[] = [];
  parcelles : any[] = [];
  
  overlayMaps : any
  controlelayer : any
  baseMaps : any



  ngOnInit(): void {

    
  }

  changeDate(event){
    this.selectedDate = event



    if(this.ExploitationEvent!=undefined && this.selectedDate!=undefined && this.selectedParcelle!=undefined){

      if(this.tile[0] != undefined){
        this.tile.forEach(til => {
          this.map.removeLayer(til)
        });     
      }
      this.ImageryData.forEach(all => {
        if(all.id_exploitation == this.ExploitationEvent && all.id_parcelle == this.selectedParcelle){
          if(all["tiles"][0]!=undefined){
            all["tiles"].forEach(tiles => {
              if(tiles.time == this.selectedDate){
                  if(tiles.tile_ndwi != undefined){

                    this.tile.push(L.tileLayer(tiles.tile_ndwi+"&paletteid=4"))
                    this.tile[this.tile.length-1].addTo(this.map)

                  }  
              }
            });
          }
        } 
      });
      this.tile.forEach(element => {
        this.overlayMaps["NDWI"] = element
      });


      if(this.controlelayer!=undefined){
        this.map.removeControl(this.controlelayer);
      }

      if(this.overlayMaps!=undefined){

        this.controlelayer = L.control.layers(this.baseMaps, this.overlayMaps)
        this.controlelayer.addTo(this.map);

      }else{
        this.controlelayer = L.control.layers(this.baseMaps)
        this.controlelayer.addTo(this.map);
      }      
    } 
  }
  ngOnChanges(){

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

    if(this.selectedParcelle!=undefined){

      var dates :any[]= []
      this.ImageryData.forEach(all => {
        if(all.id_parcelle == this.selectedParcelle){
          if(all["tiles"][0]!=undefined){
            all["tiles"].forEach(tiles => {
              dates.push({"time" :tiles.time, "cloud_coverage" : tiles.cloud_coverage})
            });
          }
           this.daate0 = all["tiles"][0].time
        } 
      });
      this.dates = dates
      this.selectedDateMap = dates[0].cloud_coverage;
      this.changeDate(this.daate0);
    } 

    if(this.ExploitationEvent!=undefined && this.selectedDate!=undefined && this.selectedParcelle!=undefined){

      if(this.tile[0] != undefined){
        this.tile.forEach(til => {
          this.map.removeLayer(til)
        });     
      }
      this.ImageryData.forEach(all => {
        if(all.id_exploitation == this.ExploitationEvent && all.id_parcelle == this.selectedParcelle){
          if(all["tiles"][0]!=undefined){
            all["tiles"].forEach(tiles => {
              if(tiles.time == this.selectedDate){
                  if(tiles.tile_ndwi != undefined){

                    this.tile.push(L.tileLayer(tiles.tile_ndwi+"&paletteid=4"))
                    this.tile[this.tile.length-1].addTo(this.map)
                    this.tile_parcelle.push({"id_parcelle":all.id_parcelle,"tile":this.tile[this.tile.length-1]})

                  }  
              }
            });
          }
        } 
      });
      this.tile.forEach(element => {
        this.overlayMaps["NDWI"] = element
      });

      if(this.controlelayer!=undefined){
        this.map.removeControl(this.controlelayer);
      }

      if(this.overlayMaps!=undefined){

        this.controlelayer = L.control.layers(this.baseMaps, this.overlayMaps)
        this.controlelayer.addTo(this.map);

      }else{
        this.controlelayer = L.control.layers(this.baseMaps)
        this.controlelayer.addTo(this.map);
      }
    }
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