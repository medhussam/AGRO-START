import { Component, Input, OnChanges, OnInit } from '@angular/core';

 import 'leaflet-fullscreen';
 import 'leaflet.browser.print/dist/leaflet.browser.print.min';
 import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
 import 'leaflet.fullscreen';
 
import { ParcelleService } from 'app/_services/parcelle.service';

import 'leaflet';
import { ExploitationService } from 'app/_services/exploitation.service.js';

declare let L;
@Component({
  selector: 'ngx-agroMonitoringMap',
  styleUrls: ['./agroMonitoringMap.component.scss'],
  template: `
 <nb-card>
 <nb-card-body>
 <div style="height: 450px  !important;" leaflet [leafletOptions]="options" (leafletMapReady)="onMapReady($event)"></div>
 <div class="zero">0</div><div class="one">1</div><img  class="legent" width="200x" height="15px"  [src]="'../../../../../assets/images/palette.png'" />

 </nb-card-body>
 </nb-card>
 `,
})
export class agroMonitoringMapComponent implements OnInit,OnChanges {
  @Input() ExploitationEvent;
  @Input() IndiceEvent;
  @Input() DateEvent;
  @Input() selectedParcelle
  @Input() allImageryData


  constructor(
    private exploitationService: ExploitationService,private parcelleService: ParcelleService) {
  }


  map : L.Map

  allExploitationsInGeoJson : any
  exploitations : any[] = [];
  parcelles : any[] = [];
 

  tile : any
  tilesGroupe: any
  tile_parcelle : any[] = [];

  overlayMaps : any
  controlelayer : any
  baseMaps : any

  parcellesInExploitation : any[] = [];


  

  ngOnInit(): void {

    this.tilesGroupe = L.layerGroup()


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

  

    if(this.ExploitationEvent!=undefined && this.IndiceEvent!=undefined && this.DateEvent!=undefined && this.selectedParcelle!=undefined){ 

      if(this.tile!= undefined){
          this.map.removeLayer(this.tile)
      }
      this.allImageryData.forEach(all => {
        if(all.id_exploitation == this.ExploitationEvent && all.id_parcelle == this.selectedParcelle){  
          if(all["tiles"][0]!=undefined){
            all["tiles"].forEach(tiles => {
              if(tiles.time == this.DateEvent){
                if(this.IndiceEvent == "tile_truecolor"){
                  if(tiles.tile_truecolor != undefined){
                    this.tile = L.tileLayer(tiles.tile_truecolor+"&paletteid=4")
                    this.tile.addTo(this.map)

                    
                    this.overlayMaps = {
                      "False Color" : this.tile,
                    };


                  }
                }else if(this.IndiceEvent == "tile_falsecolor"){
                  if(tiles.tile_falsecolor != undefined){

                    this.tile = L.tileLayer(tiles.tile_falsecolor+"&paletteid=4")
                    this.tile.addTo(this.map)

                    this.overlayMaps = {
                      "True Color" : this.tile,
                    };
                  } 
                }else if(this.IndiceEvent == "tile_ndvi"){
                  if(tiles.tile_ndvi != undefined){


                    this.tile = L.tileLayer(tiles.tile_ndvi+"&paletteid=4")
                    this.tile.addTo(this.map)


                    this.overlayMaps = {
                      "NDVI" : this.tile,
                    };


                  } 
                }else if(this.IndiceEvent == "tile_evi"){
                  if(tiles.tile_evi != undefined){

                    this.tile = L.tileLayer(tiles.tile_evi+"&paletteid=4")
                    this.tile.addTo(this.map)

                   
                    this.overlayMaps = {
                      "EVI" : this.tile,
                    };
                  } 
                }else if(this.IndiceEvent == "tile_evi2"){
                  if(tiles.tile_evi2 != undefined){


                    this.tile = L.tileLayer(tiles.tile_evi2+"&paletteid=4")
                    this.tile.addTo(this.map)


                    this.overlayMaps = {
                      "EVI2" : this.tile,
                    };

                  } 
                }else if(this.IndiceEvent == "tile_nri"){
                  if(tiles.tile_nri != undefined){

                    this.tile = L.tileLayer(tiles.tile_nri+"&paletteid=4")
                    this.tile.addTo(this.map)


                  
                    this.overlayMaps = {
                      "NRI" : this.tile,
                    };

                  } 
                }else if(this.IndiceEvent == "tile_dswi"){
                  if(tiles.tile_dswi != undefined){

                    this.tile = L.tileLayer(tiles.tile_dswi+"&paletteid=4")
                    this.tile.addTo(this.map)

                    this.overlayMaps = {
                      "DSWI" : this.tile,
                    };


                  } 
                }else if(this.IndiceEvent == "tile_ndwi"){
                  if(tiles.tile_ndwi != undefined){

                    this.tile = L.tileLayer(tiles.tile_ndwi+"&paletteid=4")
                    this.tile.addTo(this.map)

                    this.overlayMaps = {
                      "NDWI" : this.tile,
                    };

                  } 
                }
              }
            });
          }
        } 
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
}