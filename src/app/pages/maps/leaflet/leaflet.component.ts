import { Component, Input, OnChanges, OnInit } from '@angular/core';

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
import { id } from '@swimlane/ngx-charts';
declare let L;
@Component({
 selector: 'ngx-leaflet',
 styleUrls: ['./leaflet.component.scss'],
 template: `
 <nb-card>
 <nb-card-body>
 <div style="height: 450px  !important;" leaflet [leafletOptions]="options" (leafletMapReady)="onMapReady($event)"></div>
 <div class="legent"><p> </p><p *ngFor="let l of new" > <img width="22x" height="22px" [src]="'../../../../../assets/images/'+l.icon+''" /> {{l.mesure }}</p></div>

</nb-card-body>
 </nb-card>
 `,
})
export class LeafletComponent implements OnInit,OnChanges { 

 @Input() centerX;
 @Input() centerY;
 @Input() event_;
 @Input() ID;
 @Input() ID_capteur;
 // this events camme from dashboard capteur
 @Input() eventCapteur;
 @Input() eventExploiatation;
 @Input() eventPages
 @Input() id_parcelle



 
 TemperatureIcon: string;
 HumidityIcon: string;

 STAtionicon : string;
 LightIcon: string;
 SoilTemperatureIcon: string;
 SoilHumidityIcon: string;
 SoilConductivityIcon: string;
 UltrasonicLevelIcon: string;
 new: any[] = []

 constructor(
   private exploitationService: ExploitationService,private parcelleService: ParcelleService,private capteureService: CapteureService) {
   this.TemperatureIcon = '../../../../../assets/images/temperature.png'
   this.HumidityIcon = '../../../../../assets/images/humidity.png'
   this.LightIcon = '../../../../../assets/images/light.png'
   this.SoilTemperatureIcon = '../../../../../assets/images/soil_temperature.png'
   this.SoilHumidityIcon = '../../../../../assets/images/soil_humidity.png'
   this.SoilConductivityIcon = '../../../../../assets/images/soil_conductivity.png'
   this.UltrasonicLevelIcon = '../../../../../assets/images/ultrasonic_level.png'
   this.STAtionicon = '../../../../../assets/images/motion-sensor(1).png'
   
   this.icons  = [this.TemperatureIcon,this.HumidityIcon,this.LightIcon,this.TemperatureIcon,this.TemperatureIcon,this.TemperatureIcon,this.TemperatureIcon]
    
  }

 icons : any[] ;


 map : L.Map


 feature_ :any;
 capteurs : any
 exploitations : any
 parcelles : any




 ngOnInit(): void {

  
     this.capteureService.getCapteures().subscribe((json: any) => {
       json["features"].forEach(element => {
         console.log(element.properties.id_capteur);
         console.log("-------");
           if(this.icons.indexOf(element.properties.mesure)  == -1){
           if(element.properties.mesure=="temperature"){
             this.new.push({"mesure":"Température", "icon":element.properties.mesure+'.svg'})
           }else if(element.properties.mesure=="humidity"){
             this.new.push({"mesure":"Humidité", "icon":element.properties.mesure+'.svg'})
           }else if(element.properties.mesure=="soil_temperature"){
             this.new.push({"mesure":"Température du sol", "icon":element.properties.mesure+'.svg'})
           }else if(element.properties.mesure=="soil_humidity"){
             this.new.push({"mesure":"Humidité du sol", "icon":element.properties.mesure+'.svg'})
           }else if(element.properties.mesure=="soil_conductivity"){
             this.new.push({"mesure":"Conductivité du sol", "icon":element.properties.mesure+'.svg'})
           }else if(element.properties.mesure=="light"){
             this.new.push({"mesure":"Luminosité", "icon":element.properties.mesure+'.svg'})
           }else if(element.properties.mesure=="ultrasonic_level"){
            this.new.push({"mesure":"Niveau d'eau", "icon":element.properties.mesure+'.svg'})
          } 
           if(element.properties.id_capteur=="SNiP-A41_001" && element.properties.mesure=="temperature"){
            this.new.push({"mesure":"Station", "icon":"motion-sensor(1)"+'.png'})
          } 
           this.icons.push(element.properties.mesure);
         }
         console.log(this.new);
         console.log(this.icons);

       });
     });
 }

 hamza(mesure , idexploitaion = false){

 }
 
 ngOnChanges(){
  if(this.exploitations){

   this.exploitations.forEach(element => {
     if(element.id_exploitation == this.ID || element.id_exploitation == this.eventExploiatation){
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
 

  
  if (this.parcelles) {
    
    this.parcelles.forEach(element => {
      if (element.id_parcelle == this.id_parcelle) {
        element.feature.setStyle({
          "color" : "#FFFF00",
          "weight" : 2,
          "opacity" : 1,
          "fillOpacity" : 0
        }); 
        this.map.fitBounds(element.feature.getBounds()); 
      } else{
        element.feature.setStyle({
          "color" : "#000",
          "weight" : 3,
          "opacity" : 1,
          "fillOpacity" : 0
        }); 
      }
    });
  } 





     if(this.eventExploiatation){
      this.capteurs.forEach(element => {
        this.map.removeLayer(element.circle)
       
        if(element.mesure == this.eventPages && element.id_exploitation == this.eventExploiatation){
          element.circle.addTo(this.map)
          }
    
    })
     }else {
if(this.capteurs){
      this.capteurs.forEach(element => {
        this.map.removeLayer(element.circle)
       
        if(element.mesure == this.eventPages){
          element.circle.addTo(this.map)
          }
    
    })
     }
     }
    



   var geojsonMarkerOptions = {
     radius: 8,
     fillColor: "#ff7800",
     color: "#000",
     weight: 1,
     opacity: 1,
     fillOpacity: 0.8
   };

 }

 json;


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

  


       let info = new L.Control();
    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };



    const getColor = d => {
      return d == 'parcelles' ? '#000526' :
        d == 'parcelles' ? '#BD0026' :
          d == "200" ? '#E31A1C' :
            d == "100" ? '#FC4E2A' :
              d == "50" ? '#FD8D3C' :
                d == "exploitatios" ? '#FEB24C' :
                  d == "10" ? '#FED976' :
                    '#FFEDA0';
    }

    const style = name => {

      return {
        weight: 2,
        opacity: 1,
        background: 'green',
        color: 'green',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: '#000526'
      };
    }





    var exploitation
    var exploitationsList = []
    var exploitationsGroupe
    var exploitationsListgroupe=[]
    this.exploitationService.getExploitations().subscribe((json: any) => {
 
      exploitation = L.geoJSON(json, {
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
                color: '#fff'
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
     
      map.fitBounds(exploitation.getBounds());
      this.exploitations = exploitationsList


      exploitationsGroupe = L.layerGroup(exploitationsListgroupe);


    })


   
    var parcelle
    var parcellesList = []
    var parcellesGroupe;
    var parcellesListgroupe = []
    this.parcelleService.getParcelles().subscribe((json: any) => {
      console.log(json)
      parcelle = L.geoJSON(json , {
        onEachFeature: (feature, layer) => {
          let popupContent = `<p> id_parcelle: ${feature.properties.id_parcelle}</p>
          <p> superficie: ${feature.properties.superficie}</p>
          <p> matricule: ${feature.properties.matricule}</p>`;
          layer.bindPopup(popupContent);
          var test = L.geoJSON(feature,{
            onEachFeature: (feature, layer) => {
              let popupContent = `<p> id_parcelle: ${feature.properties.id_parcelle}</p>
              <p> superficie: ${feature.properties.superficie}</p>
              <p> matricule: ${feature.properties.matricule}</p>`;
              layer.bindPopup(popupContent);
            },
            style: function (feature) {
              return {
                color: '#000'
              };
            },
          }).addTo(map);
          parcellesList.push({'id_parcelle': feature.properties.id_parcelle,'feature':test});
          parcellesListgroupe.push(test)
      },
      style: function (feature) {
        return {
          color: '#000'
        };
      },
    });
    map.fitBounds(parcelle.getBounds());
    this.parcelles = parcellesList


    parcellesGroupe = L.layerGroup(parcellesListgroupe);
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

    var STAtionicon = L.icon({
      iconUrl: this.STAtionicon,
    });
  
      var capteur
      var capteursList = []
      var capteursGroupe
      var capteursListgroupe=[]
      var temperatureList = []  
      var humidityList = []  
      var lightList = []  
      var soil_temperatureList = []  
      var soil_humidityList = []  
      var soil_conductivityList = []  
      var ultrasonic_levelList = []  
      var temperatureListgroupe = []  
      var humidityListgroupe = []  
      var lightListgroupe = []  
      var soil_temperatureListgroupe = []  
      var soil_humidityListgroupe = []  
      var soil_conductivityListgroupe = []  
      var ultrasonic_levelListgroupe = []  
      var temperatureGroupe
      var humidityGroupe
      var lightGroupe
      var soil_temperatureGroupe
      var soil_humidityGroupe
      var soil_conductivityGroupe
      var ultrasonic_levelGroupe

      this.capteureService.getCapteures().subscribe((json: any) => {
        capteur = L.geoJSON(json, {
          onEachFeature: function (features, layer) {
            var element = L.geoJSON(features,{
              onEachFeature: (feature, layer) => {

//|| features.properties.id_capteur == "EM500-SMT_003" || features.properties.id_capteur == "EM500-SMT_004"|| features.properties.id_capteur == "UC11-T1_004"|| features.properties.id_capteur == "EM500-LGT_002"

                if(features.properties.id_capteur == "SNiP-A41_001"  ){

                 // if(features.properties.mesure == 'temperature'){
                    let popupContent = `<p> ID_STATION : ${features.properties.id_capteur}</p>
                    <p> </p>`;
                    layer.bindPopup(popupContent)
                    layer.setIcon(STAtionicon);
                // }
                  
                }else{




                if(features.properties.mesure == 'temperature'){
                  let popupContent = `<p> Id_capteur : ${features.properties.id_capteur}</p>
                  <p> Type de mesure : Humidité et Température</p>`;
                  layer.bindPopup(popupContent)
                  layer.setIcon(Temperature);
                }
                else if(features.properties.mesure == 'humidity'){
                  let popupContent = `<p> Id_capteur : ${features.properties.id_capteur}</p>
                  <p> Type de mesure : Humidité et Température</p>`;
                  layer.bindPopup(popupContent)
                  layer.setIcon(Humidity);
                }else if(features.properties.mesure == 'light'){
                  let popupContent = `<p> Id_capteur : ${features.properties.id_capteur}</p>
                  <p> Type de mesure : Luminosité </p>`;
                  layer.bindPopup(popupContent)
                  layer.setIcon(Light);
                }else if(features.properties.mesure == 'soil_temperature'){
                  let popupContent = `<p> Id_capteur : ${features.properties.id_capteur}</p>
                  <p> Type de mesure : Température du sol, Humidité du sol et Conductivité du sol </p>`;
                  layer.bindPopup(popupContent)
                  layer.setIcon(SoilTemperature);
                }else if(features.properties.mesure == 'soil_humidity'){
                  let popupContent = `<p> Id_capteur : ${features.properties.id_capteur}</p>
                  <p> Type de mesure : Température du sol, Humidité du sol et Conductivité du sol </p>`;
                  layer.bindPopup(popupContent)
                  layer.setIcon(SoilHumidity);
                }else if(features.properties.mesure == 'soil_conductivity'){
                  let popupContent = `<p> Id_capteur : ${features.properties.id_capteur}</p>
                  <p> Type de mesure : Température du sol, Humidité du sol et Conductivité du sol </p>`;
                  layer.bindPopup(popupContent)
                  layer.setIcon(SoilConductivity);
                }else if(features.properties.mesure == 'ultrasonic_level'){
                  let popupContent = `<p> Id_capteur : ${features.properties.id_capteur}</p>
                  <p> Type de mesure : Ultrasonic level </p>`;
                  layer.bindPopup(popupContent)
                  layer.setIcon(UltrasonicLevel);


                 
                }}

                console.log(features.properties.id_capteur);

               // layer.setIcon(STAtionicon);



              }
            }).addTo(map);

            if(features.properties.mesure == "temperature"){
              temperatureList.push({'id_capteur': features.properties.id_capteur,'feature':element})
              temperatureListgroupe.push(element)
            }else if(features.properties.mesure == "humidity"){
              humidityList.push({'id_capteur': features.properties.id_capteur,'feature':element})
              humidityListgroupe.push(element)
            }else if(features.properties.mesure == "light"){
              lightList.push({'id_capteur': features.properties.id_capteur,'feature':element})
              lightListgroupe.push(element)
            }else if(features.properties.mesure == "soil_temperature"){
              soil_temperatureList.push({'id_capteur': features.properties.id_capteur,'feature':element})
              soil_temperatureListgroupe.push(element)
            }else if(features.properties.mesure == "soil_humidity"){
              soil_humidityList.push({'id_capteur': features.properties.id_capteur,'feature':element})
              soil_humidityListgroupe.push(element)
            }else if(features.properties.mesure == "soil_conductivity"){
              soil_conductivityList.push({'id_capteur': features.properties.id_capteur,'feature':element})
              soil_conductivityListgroupe.push(element)
            }else if(features.properties.mesure == "ultrasonic_level"){
              ultrasonic_levelList.push({'id_capteur': features.properties.id_capteur,'feature':element})
              ultrasonic_levelListgroupe.push(element)
            }

            var circle = L.circle([features.geometry.coordinates[1], features.geometry.coordinates[0]], {
              color: "red",
              fillColor: "#f03",
              fillOpacity: 0,
              radius: 50.0
            })

            capteursList.push({'id_capteur': features.properties.id_capteur,'mesure': features.properties.mesure,'id_exploitation': features.properties.id_exploitation,'feature':element,'circle': circle, 'coordinates':features.geometry.coordinates})
            capteursListgroupe.push(element)
            
              
          },
        })

        this.capteurs = capteursList
        capteursGroupe = L.layerGroup(capteursListgroupe)

        temperatureGroupe = L.layerGroup(temperatureListgroupe)
        humidityGroupe = L.layerGroup(humidityListgroupe)
        lightGroupe = L.layerGroup(lightListgroupe)
        soil_temperatureGroupe = L.layerGroup(soil_temperatureListgroupe)
        soil_humidityGroupe = L.layerGroup(soil_humidityListgroupe)
        soil_conductivityGroupe = L.layerGroup(soil_conductivityListgroupe)
        ultrasonic_levelGroupe = L.layerGroup(ultrasonic_levelListgroupe)
        
      });




      
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
          // if(element1.mesure == 'temperature'){
          //   overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/STAtionicon.png" /> Température']= L.layerGroup(groupe)
          // }else if(element1.mesure == 'humidity'){
          //   overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/humidity.svg" /> Humidité']= L.layerGroup(groupe)
          // }else if(element1.mesure == 'light'){
          //   overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/light.svg" /> Luminosité']= L.layerGroup(groupe)
          // }else if(element1.mesure == 'soil_temperature'){
          //   overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/soil_temperature.svg" /> Température du sol']= L.layerGroup(groupe)
          // }else if(element1.mesure == 'soil_humidity'){
          //   overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/soil_humidity.svg" /> Humidité du sol']= L.layerGroup(groupe)
          // }else if(element1.mesure == 'soil_conductivity'){
          //   overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/soil_conductivity.svg" /> Conductivité du sol']= L.layerGroup(groupe)
          // }else if(element1.mesure == 'ultrasonic_level'){
          //   overlayMaps['<img width="20px" height="20px" src="../../../../../assets/images/ultrasonic_level.svg" /> niveau ultrasonique']= L.layerGroup(groupe)
          // }
  
        });
        L.control.layers(baseMaps,overlayMaps).addTo(map);
      }, 4000)

  map.attributionControl.addAttribution('agroconcept');

}

}