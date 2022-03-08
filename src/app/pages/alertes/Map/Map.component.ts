import { Component, Input, OnChanges, OnInit } from '@angular/core';

 import 'leaflet-fullscreen';
 import 'leaflet.browser.print/dist/leaflet.browser.print.min';
 import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
 import 'leaflet.fullscreen';
 
declare var HeatmapOverlay;
import { ParcelleService } from 'app/_services/parcelle.service';

import { CapteureService } from 'app/_services/capteure.service';
import { AlertesService } from 'app/_services/alertes.service';





import 'leaflet';
import { ExploitationService } from 'app/_services/exploitation.service.js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare let L;
@Component({
  selector: 'ngx-Map',
  styleUrls: ['./Map.component.scss'],
 template: `

 <nb-card>
 <nb-card-body>
 <div leaflet [leafletOptions]="options" (leafletMapReady)="onMapReady($event)"></div>
 <div class="legent"><p> <i class="fas fa-circle critical"  ></i> Critique </p> <p><i class="fas fa-circle ok"  ></i> Résolu</p> <p><i class="fas fa-circle warning"  ></i> Avertissement</p></div>


</nb-card-body>
 </nb-card>
 `,
})
export class MapComponent implements OnInit,OnChanges {
 @Input() AlertseventExp;
 @Input() AlertseventCap;
 @Input() AlertseventMes;
 @Input() AlertseventLevel;
 @Input() AlertseventType;
 
 



 TemperatureIcon: string;
 HumidityIcon: string;
 LightIcon: string;
 SoilTemperatureIcon: string;
 SoilHumidityIcon: string;
 SoilConductivityIcon: string;
 UltrasonicLevelIcon: string;
 new: any[] = []

 constructor(
   private exploitationService: ExploitationService,private parcelleService: ParcelleService,private capteureService: CapteureService,private alerteService: AlertesService) {
   this.TemperatureIcon = '../../../../../assets/images/temperature.png'
   this.HumidityIcon = '../../../../../assets/images/humidity.png'
   this.LightIcon = '../../../../../assets/images/light.png'
   this.SoilTemperatureIcon = '../../../../../assets/images/soil_temperature.png'
   this.SoilHumidityIcon = '../../../../../assets/images/soil_humidity.png'
   this.SoilConductivityIcon = '../../../../../assets/images/soil_conductivity.png'
   this.UltrasonicLevelIcon = '../../../../../assets/images/ultrasonic_level.png'
 }


 map : L.Map


 capteurs : any
 exploitations : any
 parcelles : any
 allexploitations : any

 filterResult : any


 ngOnInit(): void {}



 
 ngOnChanges(){


  if(this.exploitations!=undefined){
    this.exploitations.forEach(element => {
      if(element.id_exploitation == this.AlertseventExp){
        element.feature.setStyle({
          "color" : "#00FFFF",
          "weight" : 2,
          "opacity" : 1,
          "fillOpacity" : 0
        }); 
        this.map.fitBounds(element.feature.getBounds()); 
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



  if(this.capteurs!=undefined){
    this.filterResult = this.capteurs

    this.capteurs.forEach(element => {
      if(element.alertcircle0 != null){
        this.map.removeLayer(element.alertcircle0)
      }
      if(element.alertcircle != null){
        this.map.removeLayer(element.alertcircle)
      }
    });

    if (this.AlertseventExp != undefined && this.AlertseventExp != "all"){
        
      this.filterResult = this.filterResult.filter(u => 
        u.id_exploitation == this.AlertseventExp ); 
    }else{
      this.map.fitBounds(this.allexploitations.getBounds());
    }
    if (this.AlertseventCap != undefined && this.AlertseventCap != "all"){
      this.filterResult = this.filterResult.filter(u => 
        u.id_capteur== this.AlertseventCap ); 
    }
    if (this.AlertseventMes != undefined && this.AlertseventMes != "all"){
      this.filterResult = this.filterResult.filter(u => 
        u.mesure== this.AlertseventMes ); 
    }
    if (this.AlertseventType != undefined && this.AlertseventType != "all"){
      this.filterResult = this.filterResult.filter(u => 
        u.alert_type== this.AlertseventType ); 
    }
    if (this.AlertseventLevel != undefined && this.AlertseventLevel != "all"){
      this.filterResult = this.filterResult.filter(u => 
        u.alert_level== this.AlertseventLevel ); 
    }   
  }


  this.filterResult.forEach(element => {
    if((this.AlertseventExp!=undefined && this.AlertseventExp!="all") && (this.AlertseventMes==undefined || this.AlertseventMes=="all") && (this.AlertseventCap==undefined || this.AlertseventCap=="all")){
      this.filterResult.forEach(elemen => {
        if(elemen.id_exploitation == this.AlertseventExp){
          if(elemen.alertcircle0 != null){
            elemen.alertcircle0.addTo(this.map)
          }


          if(this.AlertseventLevel!=undefined && this.AlertseventLevel!="all"){
            if(this.AlertseventLevel == element.alert_level){
              if(element.alertcircle != null){
                element.alertcircle.addTo(this.map)
              }
            }
            
          }


        }



      });
    }else if((this.AlertseventExp!=undefined && this.AlertseventExp!="all") && (this.AlertseventMes==undefined || this.AlertseventMes=="all") && (this.AlertseventCap!=undefined && this.AlertseventCap!="all")){
      this.filterResult.forEach(elemen => {
        if(elemen.id_capteur == this.AlertseventCap && elemen.id_exploitation == this.AlertseventExp){
          if(elemen.alertcircle0 != null){
            elemen.alertcircle0.addTo(this.map)
          }

          if(this.AlertseventLevel!=undefined && this.AlertseventLevel!="all"){
            if(this.AlertseventLevel == element.alert_level){
              if(element.alertcircle != null){
                element.alertcircle.addTo(this.map)
              }
            }
            
          }

        }
      });
    }else if((this.AlertseventExp==undefined || this.AlertseventExp=="all") && (this.AlertseventMes==undefined || this.AlertseventMes=="all") && (this.AlertseventCap!=undefined && this.AlertseventCap!="all")){
      this.filterResult.forEach(elemen => {
        if(elemen.id_capteur == this.AlertseventCap){
          if(elemen.alertcircle0 != null){
            elemen.alertcircle0.addTo(this.map)
          }

          if(this.AlertseventLevel!=undefined && this.AlertseventLevel!="all"){
            if(this.AlertseventLevel == element.alert_level){
              if(element.alertcircle != null){
                element.alertcircle.addTo(this.map)
              }
            }
            
          }

        }
      });
    }else if((this.AlertseventExp==undefined || this.AlertseventExp=="all") && (this.AlertseventMes==undefined || this.AlertseventMes=="all") && (this.AlertseventCap==undefined || this.AlertseventCap=="all")){
  
      this.filterResult.forEach(elemen => {  
          if(elemen.alertcircle0 != null){
            elemen.alertcircle0.addTo(this.map)
          }
          if(this.AlertseventLevel!=undefined && this.AlertseventLevel!="all"){
            if(this.AlertseventLevel == element.alert_level){
              if(element.alertcircle != null){
                element.alertcircle.addTo(this.map)
              }
            }
            
          }

      });
    }else{
      if(element.alertcircle != null){
        element.alertcircle.addTo(this.map)
      }
    }








  });

    

 
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





  var exploitationsList = []
  var exploitationsGroupe
  var exploitationsListgroupe=[]
  this.exploitationService.getExploitations().subscribe((json: any) => {

    this.allexploitations = L.geoJSON(json, {
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
        exploitationsList.push({'id_exploitation': feature.properties.id_exploitation,'feature':element})
        exploitationsListgroupe.push(element)

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
   
    map.fitBounds(this.allexploitations.getBounds());
    this.exploitations = exploitationsList


    exploitationsGroupe = L.layerGroup(exploitationsListgroupe);


  })


   
  var parcelle
  this.parcelleService.getParcelles().subscribe((json: any) => {
    parcelle = L.geoJSON(json , {
      onEachFeature: (feature, layer) => {
        let popupContent = `<p> id_parcelle: ${feature.properties.id_parcelle}</p>
        <p> superficie: ${feature.properties.superficie}</p>
        <p> matricule: ${feature.properties.matricule}</p>`;
        layer.bindPopup(popupContent);
    },
    style: function (feature) {
      return {
        color: '#000',
        opacity : 1,
        fillOpacity : 0

      };
    },
  }).addTo(map);
  });

  var Temperature = L.icon({
    iconUrl: this.TemperatureIcon,
  });

  var Humidity = L.icon({
    iconUrl: this.HumidityIcon,
  });

  var Light = L.icon({
    iconUrl: this.LightIcon,
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

  var UltrasonicLevel = L.icon({
    iconUrl: this.UltrasonicLevelIcon,
  });

    var capteur
    var capteursList = []
    var capteursGroupe
    var capteursListgroupe=[]

    this.capteureService.getCapteures().subscribe((json: any) => {
      capteur = L.geoJSON(json, {
        onEachFeature: function (features, layer) {
          var element = L.geoJSON(features,{
            onEachFeature: (feature, layer) => {
              if(feature.properties.mesure == 'temperature'){
                let popupContent = `<p> Id_capteur : ${feature.properties.id_capteur}</p>
                <p> Type de mesure : Humidité et Température</p>`;
                layer.bindPopup(popupContent)
                layer.setIcon(Temperature);
              }
              else if(feature.properties.mesure == 'humidity'){
                let popupContent = `<p> Id_capteur : ${feature.properties.id_capteur}</p>
                <p> Type de mesure : Humidité et Température</p>`;
                layer.bindPopup(popupContent)
                layer.setIcon(Humidity);
              }else if(feature.properties.mesure == 'light'){
                let popupContent = `<p> Id_capteur : ${feature.properties.id_capteur}</p>
                <p> Type de mesure : Luminosité </p>`;
                layer.bindPopup(popupContent)
                layer.setIcon(Light);
              }else if(feature.properties.mesure == 'soil_temperature'){
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
              }else if(feature.properties.mesure == 'ultrasonic_level'){
                let popupContent = `<p> Id_capteur : ${feature.properties.id_capteur}</p>
                <p> Type de mesure : Ultrasonic level </p>`;
                 
                layer.bindPopup(popupContent)
                layer.setIcon(UltrasonicLevel);
              }
            }
          }).addTo(map);

          

          var alertcircle0
          if(features.properties.alert != null){
            alertcircle0 = L.circle([features.geometry.coordinates[1], features.geometry.coordinates[0]], {
              color: "#00FFFF",
              fillColor: "#00FFFF",
              fillOpacity: 1,
              radius: 50.0
            }).addTo(map)
          }else{
            alertcircle0 = null
          }




          var alertcircle
          if(features.properties.alert == "OK"){
            alertcircle = L.circle([features.geometry.coordinates[1], features.geometry.coordinates[0]], {
              color: "green",
              fillColor: "green",
              fillOpacity: 1,
              radius: 50.0
            })
          }else if(features.properties.alert == "CRITICAL"){

            alertcircle = L.circle([features.geometry.coordinates[1], features.geometry.coordinates[0]], {
              color: "red",
              fillColor: "red",
              fillOpacity: 1,
              radius: 50.0
            })
          }else if(features.properties.alert == "WARNING"){

            alertcircle = L.circle([features.geometry.coordinates[1], features.geometry.coordinates[0]], {
              color: "yellow",
              fillColor: "yellow",
              fillOpacity: 1,
              radius: 50.0
            })
          }else if(features.properties.alert == "INFO"){

            alertcircle = L.circle([features.geometry.coordinates[1], features.geometry.coordinates[0]], {
              color: "blue",
              fillColor: "blue",
              fillOpacity: 1,
              radius: 50.0
            })
          }else if(features.properties.alert==null || features.properties.alert==undefined ){
            alertcircle = null 
          }
         

          capteursList.push({'id_capteur': features.properties.id_capteur,'mesure': features.properties.mesure,'id_exploitation': features.properties.id_exploitation,'feature':element, 'alert_level': features.properties.alert_level, 'alert_type': features.properties.alert_type,'alertcircle0': alertcircle0, 'alertcircle': alertcircle,'coordinates':features.geometry.coordinates})
          capteursListgroupe.push(element)
          
            
        },
      })

      this.capteurs = capteursList
      capteursGroupe = L.layerGroup(capteursListgroupe)



    })
    
    setTimeout(function ggg() {

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
      var baseMaps = {
        "Open Street Map" : googleStreets,
        "Hybrid" : googleHybrid,
        "satellite" : googleSat,
        "Terrain" : googleTerrain
      };


      var overlayMaps = {};
      overlayMaps["Exploitation"]= exploitationsGroupe
      overlayMaps["Parcelles"]= parcelle
      overlayMaps["Capteurs"]= capteursGroupe
      capteursList.forEach(element1 => {
        var groupe = []
        capteursList.forEach(element2 => {
          if(element1.mesure == element2.mesure){
            groupe.push(element1.feature)
            groupe.push(element2.feature)
          }
        });
        if(element1.mesure == 'temperature'){
          overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/temperature.svg" /> Température']= L.layerGroup(groupe)
        }else if(element1.mesure == 'humidity'){
          overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/humidity.svg" /> Humidité']= L.layerGroup(groupe)
        }else if(element1.mesure == 'light'){
          overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/light.svg" /> Luminosité']= L.layerGroup(groupe)
        }else if(element1.mesure == 'soil_temperature'){
          overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/soil_temperature.svg" /> Température du sol']= L.layerGroup(groupe)
        }else if(element1.mesure == 'soil_humidity'){
          overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/soil_humidity.svg" /> Humidité du sol']= L.layerGroup(groupe)
        }else if(element1.mesure == 'soil_conductivity'){
          overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/soil_conductivity.svg" /> Conductivité du sol']= L.layerGroup(groupe)
        }else if(element1.mesure == 'ultrasonic_level'){
          overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/ultrasonic_level.svg" /> niveau ultrasonique']= L.layerGroup(groupe)
        }

           
      });


      L.control.layers(baseMaps,overlayMaps).addTo(map);
    }, 4000)

    map.attributionControl.addAttribution('Agro-Concept/SA');

}


}
