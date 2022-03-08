import { DatePipe } from '@angular/common';
import { Component, VERSION ,OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AgroMonitoringService } from 'app/_services/agro_monitoring.service';
import { ExploitationService } from 'app/_services/exploitation.service';
import { ParcelleService } from 'app/_services/parcelle.service';
import * as Highcharts from 'highcharts';
import { IgxOverlayService } from 'igniteui-angular';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

import $ from 'jquery';

@Component({
 selector: 'ngx-soil_data',
 styleUrls: ['./soil_data.component.scss'],
 templateUrl: './soil_data.component.html',
 
})
export class SoilDataComponent  implements OnInit {
 
  public activity;
  public xData;
  public xData_monitoring;
  public label;
  satellite_SOL: any;
    
constructor(private theme: NbThemeService,public datepipe: DatePipe,
  private agro_monitoringService: AgroMonitoringService, private exploitationService: ExploitationService ,  private parcelleService  :ParcelleService,
  public element: ElementRef,private overlayService: IgxOverlayService){
   
    if(this.mnthSearch == "00"){
      this.mnthSearch = "12";
      this.yearSearch = this.DatefinString.getFullYear()-1;
      
    }

    
    if(this.daySearch == "31"){
      this.daySearch = "30";
     
      
    }
    this.Datedebut = this.yearSearch+'-'+this.mnthSearch+'-'+this.daySearch;
    
    this.Datedebut_ = new Date(this.Datedebut);
   // console.log(this.DatedebutString);
    console.log(this.Datedebut);
    console.log(this.DatefinString);
    console.log(this.Datefin);
  }
 

  
  Capteur_SOL_time : any[] = [];
  Capteur_SOL_time_temperateur : any[] = [];
  Capteur_SOL : any[] = [];
  Capteur_SOL_value : any[] = [];
  Capteur_SOL_value_temperateur : any[] = [];
  satellite_SOL_time : any[] = [];
  satellite_SOL_value_t10 : any[] = [];
  satellite_SOL_value_moisture : any[] = [];
  satellite_SOL_value_t0 : any[] = [];
  

  
  selectedValue: any;
  selectedParcelle: any;
  selected: any;
  exploitetion : any[] = [];
 
  Capteurs_Parcelle_data : any[] = [];
  Carto_current_data : any[] = [];
  selectedID_EXP: any;
  dateNOW = this.convert(new Date());
  measurement = 'dswi';
  Datedebut = '2021-04-30T00:00:00.000Z';
  DatefinString  = new Date(); 
  
  Datedebut_ = new Date('2021-04-18');
  Datefin_  = new Date(); 
  Parcelle :any[] = [];

  
  Datefin =this.datepipe.transform(this.DatefinString, 'yyyy-MM-dd');
 
mnthSearch = ("0" + (this.DatefinString.getMonth())).slice(-2);
daySearch =("0" + (this.DatefinString.getDate())).slice(-2);
yearSearch  = this.DatefinString.getFullYear();
  date0: any;
  daates: any[] = [];

  ngOnInit(){



    this.parcelleService.getParcellesImagery().subscribe((item) => {
      this.ImageryData = item
    })


    this.getExploitation();
   
    this.exploitationService.getExploitationsImagery().subscribe((item)=> {
      this.allImageryData = item
      item.forEach(element => {
        });
    }) 
       


    setTimeout(() => {
     this.getParcelle_par_Exploitation(this.selectedID_EXP);
     this.getgetparcelle_data(this.selectedParcelle);
     }, 3000);




    setTimeout(() => {


    this.SETCHART();



},6000);





  }

 // Exploitations DATA
 getExploitation() { 
  this.exploitationService.getExploitations().subscribe(item => {
    let sel = true;
    this.allImageryData = item
    item['features'].forEach(element => {
        this.exploitetion.push(element);
        this.exploitations.push({"id_exploitation":element.properties.id_exploitation, "matricule" :element.properties.matricule})
       
        if(sel == true){
          this.selectedID_EXP  = element.properties.id_exploitation;
          this.ExploitationEvent  = element.properties.id_exploitation;
          this.selectedValue = element.properties.matricule;
          sel = false;
        } 
    });
  })

}

getparcelle_data : any[] = [];
getgetparcelle_data(selectedParcelle) { 
  this.getparcelle_data = [];
  
  this.parcelleService.getparcelle_data(selectedParcelle).subscribe(item => {
    this.getparcelle_data = item;  
   
  })
};


getParcelle_par_Exploitation(id_selectedID_EXP) { 
  this.parcelleService.getParcelles_exp(id_selectedID_EXP).subscribe(item => {
    let sel = true;
    this.Parcelle = item;  
    item.forEach(element => {
         if(sel == true){
           this.selectedParcelle = element.id_parcelle;
           sel = false;

           this.parcelleService.getparcelle_data(this.selectedParcelle).subscribe(item => {
              this.getparcelle_data = item;  
            })
           this.getCapteurs_Parcelle_data(this.selectedParcelle,this.Datedebut,this.Datefin);
         } 
    });
  })
}
myTestDATA :any;
MyitemsforALL :any[] = [];
TEMP = false;
getCapteurs_Parcelle_data(parcelle,debut,fin){
  this.Capteur_SOL = [];
  this.Capteur_SOL_time = [];
  this.Capteur_SOL_value = [];
  this.Capteur_SOL_time_temperateur = [];
  this.Capteur_SOL_value_temperateur = [];
  this.satellite_SOL_time = [];
  this.satellite_SOL_value_t10 = [];
  this.satellite_SOL_value_moisture = [];
  this.satellite_SOL_value_t0 = [];
 
  this.parcelleService.getCapteurs_Parcelle_data(parcelle,debut,fin).subscribe(item => {
    
     this.MyitemsforALL = item["satellite"];

     this.MyitemsforALL.forEach(element => { 

      this.satellite_SOL_time.push(this.convert(element.time));
      this.satellite_SOL_value_t10.push( parseFloat(parseFloat(element.t10).toFixed(2)));
      this.satellite_SOL_value_moisture.push( parseFloat(parseFloat(element.moisture).toFixed(2)) );
      this.satellite_SOL_value_t0.push(  parseFloat(parseFloat(element.t0).toFixed(2)));  
       });

this.TEMP = false; 

if(!this.isEmptyObject(item["capteurs"].results[0])){
     this.Capteurs_Parcelle_data = item["capteurs"].results[0].series[0].values;
     this.myTestDATA             = item["capteurs"].results[0].series[1].values;
   
this.TEMP = true; 
    
    }
    
 this.Capteurs_Parcelle_data.forEach(element => { 
 this.Capteur_SOL_time.push(this.convert(element[0]));
 this.Capteur_SOL_value.push(parseFloat(parseFloat( element[1]).toFixed(2))); 
 });

   
 this.myTestDATA.forEach(element => { 
  this.Capteur_SOL_time_temperateur.push(this.convert(element[0]));
  this.Capteur_SOL_value_temperateur.push(parseFloat(parseFloat( element[1]).toFixed(2))); 
  });
   }) 
}
 
public date: Date = new Date(Date.now());
@Output() dateFrom = new EventEmitter<Date>();
@Output() dateTo = new EventEmitter();
private dayFormatter = new Intl.DateTimeFormat("fr", { weekday: "long" });
private monthFormatter = new Intl.DateTimeFormat("fr", { month: "long" });

public formatterFrom = (date: Date) => {
  this.dateFrom.emit(date)
  return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  
}
public formatterTo = (date: Date) => {
  this.dateTo.emit(`${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`)
  return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  
}

dataTable : any[] = [];
settings:any;

exploitations : any[] = [];

dates : any[] = [];
indices : any[] = [{indice : "tile_truecolor", name: "true color"}, {indice : "tile_falsecolor", name: "false color"}, 
{indice : "tile_ndvi", name: "ndvi"}, {indice : "tile_evi", name: "evi"}, {indice : "tile_evi2", name: "evi2"}, {indice : "tile_nri", name: "nri"},
{indice : "tile_dswi", name: "dswi"}, {indice : "tile_ndwi", name: "ndwi"}];
allImageryData;  
ImageryData; 
ExploitationEvent;
IndiceEvent;
DateEvent;

changeParcelle(event){
  var daates = []
  this.ImageryData.forEach(all => {
    if(all.id_parcelle == this.selectedParcelle){
      if(all["tiles"][0]!=undefined){
        all["tiles"].forEach(tiles => {
          daates.push(tiles.time)
        });
        this.date0 = all["tiles"][0].time
      }
    } 
  });
  this.daates = daates
  this.getparcelle_data = [];
  this.selectedParcelle = event
  this.getgetparcelle_data(this.selectedParcelle);

  setTimeout(() => { 
    this.getCapteurs_Parcelle_data(this.selectedParcelle,this.Datedebut,this.Datefin);
  }, 1000);
  
  setTimeout(() => {
    var    element = document.getElementById("container");
    element.parentNode.removeChild(element); 
    var chartDiv_ = document.createElement('div');
    chartDiv_.id = 'container';
    document.getElementById('container_x').appendChild(chartDiv_);
    this.SETCHART();
  }, 3000);
}

changeExploitation(event){
  this.ExploitationEvent = event
  var dates = []
  this.allImageryData.forEach(element => {
    if(element.id_exploitation==this.ExploitationEvent){
      this.getParcelle_par_Exploitation(element.id_exploitation);

      element.tiles.forEach(tiles => {
        dates.push(tiles.time)
      });
    }
  });
  this.changeParcelle(this.selectedParcelle);
}
 

changeDate(event){
  this.DateEvent = event
}

selectFrom(event){
this.Datedebut = this.convertdateSearh(event); 
 console.log(this.Datedebut);
 this.getCapteurs_Parcelle_data(this.selectedParcelle,this.Datedebut,this.Datefin);
 setTimeout(() => {
  var    element = document.getElementById("container");
  element.parentNode.removeChild(element); 
  var chartDiv_ = document.createElement('div');
  chartDiv_.id = 'container';
  document.getElementById('container_x').appendChild(chartDiv_);
  this.SETCHART();
  this.getCapteurs_Parcelle_data(this.selectedParcelle,this.Datedebut,this.Datefin);
}, 4000); 
}

selectTo(event){
  this.Datefin = this.convertdateSearh(event); 
   console.log(this.Datefin);
   
  
   
   this.getCapteurs_Parcelle_data(this.selectedParcelle,this.Datedebut,this.Datefin);

   setTimeout(() => {


    var    element = document.getElementById("container");
    element.parentNode.removeChild(element); 
    var chartDiv_ = document.createElement('div');
    chartDiv_.id = 'container';
    document.getElementById('container_x').appendChild(chartDiv_);
    this.getCapteurs_Parcelle_data(this.selectedParcelle,this.Datedebut,this.Datefin);
this.SETCHART();
  }, 3000); 
}


convertdateSearh(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    year_ = date.getFullYear();
      return [year_,mnth,day+'T00:00:00.000Z'].join("-");
     }



isEmptyObject(obj){
  return (obj && (Object.keys(obj).length === 0))
}


convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    year_ = date.getFullYear(),
    timez_Hour = ("0" + date.getHours()).slice(-2),
timez_min =  ("0" + date.getMinutes()).slice(-2);


  switch (mnth) {
    case "01": {
      return [day,"Janvier ",year_,timez_Hour+':'+timez_min].join(" ");
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
      return [day,"Avril ",timez_Hour+':'+timez_min].join(" ");
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

checkINDICE(indice){
  if(indice == "tile_truecolor" || indice == "tile_falsecolor" || indice == "tile_ndvi"){
    this.measurement = 'ndvi';
  }else if(indice == "tile_evi"){
    this.measurement = 'evi';
  }else if(indice == "tile_evi2"){
    this.measurement = 'evi2';
  }else if(indice == "tile_nri"){
    this.measurement = 'nri';
  }else if(indice == "tile_dswi"){
    this.measurement = 'dswi';
  }else if(indice == "tile_ndwi"){
    this.measurement = 'ndwi';
}
}

        SETCHART(){
    
['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
  document.getElementById('container').addEventListener(
      eventType,
      function (e) {
          var chart,
           point,
           i,
           event;
      
       for (i = 0; i < Highcharts.charts.length; i = i + 1) {
           chart = Highcharts.charts[i];
           event = chart.pointer.normalize(e); // Find coordinates within the chart
      
           event.chartX = (event.chartX + 3 * $('.chart').width()) % $('.chart').width();
      
           point = chart.series[0].searchPoint(event, true); // Get the hovered point
           if (point) {
               point.highlight(e);
           }
       }
      }
  );
});

  function syncExtremes(e) {
  var thisChart = this.chart;

  if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
      Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
              if (chart.xAxis[0].setExtremes) { // It is null while updating
                  chart.xAxis[0].setExtremes( e.min,   e.max,   undefined,   false,    { trigger: 'syncExtremes' }    );
              }
          }
      });
  }
}
Highcharts.Pointer.prototype.reset = function () {
  return undefined;
};
Highcharts.Point.prototype.select  = function (event) {
  event = this.series.chart.pointer.normalize(event);
  this.onMouseOver(); // Show the hover marker
  this.series.chart.tooltip.refresh(this); // Show the tooltip
  this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

this.activity  = {
"xData":this.Capteur_SOL_time,
"xData_monitoring":this.satellite_SOL_time,
"datasets": [{
    "name": "Capteurs du sol ",
    "name_temperature": "Capteur de la température du sol ",
    "name_h": "Capteur  de la humidité du sol ",
          "data": [],
          "data_temperature":[],
      "unit": " %",
      "unit_temperature": " C",
    "type": "spline",
}, {
  "name": "Capteurs Agro Surveillance (capteurs virtuel)",
  "name_moisture": "Humidité du sol",
  "name_t0": "T0",
  "name_t10": "T10",
    "data_moisture": this.satellite_SOL_value_moisture ,
    "data_t0": this.satellite_SOL_value_t0,
    "data_t10": this.satellite_SOL_value_t10,
     "unit_moisture": "%",
     "unit_t0": " °C",
     "unit_t10": " °C",
    "type": "spline",
}]
};
 
  this.xData = this.activity.xData;
  this.xData_monitoring = this.activity.xData_monitoring;
  let that = this;

  if( this.activity){
  this.activity.datasets.forEach(
    
    function (dataset, i) {
var chartDiv = document.createElement('div');
chartDiv.className = 'chart chart'+i;
document.getElementById('container').appendChild(chartDiv);

if(i == 0){ 
          Highcharts.chart(chartDiv, {
              chart: {
                  marginLeft: 40, // Keep all charts left aligned
                  spacingTop: 20,
                  spacingBottom: 20,
                  height:400,                  
              },   
              xAxis: { },
              yAxis: [], 
              series: []
          });
 chartDiv.setAttribute("style","display:none") ;

         }
       
        if(i == 1){
         

           dataset.data_moisture = Highcharts.map(dataset.data_moisture, function (val, j) {
             return [that.xData_monitoring[j], val];
         });
         dataset.data_t0 = Highcharts.map(dataset.data_t0, function (val, j) {
           return [that.xData_monitoring[j], val];
       });
       dataset.data_t10 = Highcharts.map(dataset.data_t10, function (val, j) {
         return [that.xData_monitoring[j], val];
     });
          Highcharts.chart(chartDiv, {
              chart: {
                  marginLeft: 40, // Keep all charts left aligned
                  spacingTop: 20,
                  spacingBottom: 20,
                  height:400,
              },
              plotOptions: {
                line: {
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: true
              },
            },
              title: {
                  text: dataset.name,
                  align: 'left',
                  margin: 0,
                  x: 40
              },
              credits: {
                  enabled: true
              },
              legend: {
                  enabled: true
              },
              xAxis: {
                  crosshair: true,
                  events: {
                      setExtremes: syncExtremes
                  },
                  type: 'category',
                  labels: {
                      format: '{value} '
                  }
              },
              yAxis: [{ // Primary yAxis
                min : 0,
                max:25,
                labels: {
                    format: '{value}°C',
                    style: {
                        color: "#dc3545"
                    }
                },
                title: {
                    text: 'Température',
                    style: {
                        color: "#dc3545"
                    }
                },
                opposite: true
        
            }
            , { // Secondary yAxis
              min:0,
              max:50,
              gridLineWidth: 0,
                title: {
                    text: 'Humidité',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
        
            }
          ],
              tooltip: {
            
              shared: true,
              useHTML: true,
                  pointFormat: "<span style='color:{point.series.userOptions.color}'>&#9679;</span> {series.name}: {point.y}  <br/>",
                  headerFormat: "<b>{point.key}</b><br>",
                  valueDecimals: 2,
                 
              },
              series: [{
                data: dataset.data_moisture,
                name: dataset.name_moisture,
                type: dataset.type,
                
                color: "#0296ff",
                fillOpacity: 1,
                yAxis:1,
                tooltip: {
                    valueSuffix: ' ' + dataset.unit_moisture
                   
                }
            },{
              data:  dataset.data_t0,
              name: dataset.name_t0,
              type: dataset.type,
              
              color: "#dc3545",
              fillOpacity: 0.7,
              
              tooltip: {
                  valueSuffix: ' ' + dataset.unit_t0
                 
              }
          },{
              data:  dataset.data_t10,
              name: dataset.name_t10,
              type: dataset.type,
              
              color: Highcharts.getOptions().colors[i],
              fillOpacity: 0.3,
              
              tooltip: {
                  valueSuffix: ' ' + dataset.unit_t10
                 
              }
          }]
          });
        }   
      }
      ); 
}


}

  


SHowComparChart(){
  var    element = document.getElementById("container");
  element.parentNode.removeChild(element); 
  var chartDiv_ = document.createElement('div');
  chartDiv_.id = 'container';
  document.getElementById('container_x').appendChild(chartDiv_);
    
  ['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
    document.getElementById('container').addEventListener(
        eventType,
        function (e) {
            var chart,  point,  i,  event;
        
         for (i = 0; i < Highcharts.charts.length; i = i + 1) {
             chart = Highcharts.charts[i];
             event = chart.pointer.normalize(e); // Find coordinates within the chart
        
             event.chartX = (event.chartX + 3 * $('.chart').width()) % $('.chart').width();
        
             point = chart.series[0].searchPoint(event, true); // Get the hovered point
             if (point) {
                 point.highlight(e);
             }
         } 
        }
    );
  });
  
    function syncExtremes(e) {
    var thisChart = this.chart;
  
    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes( e.min,   e.max,   undefined,   false,    { trigger: 'syncExtremes' }    );
                }
            }
        });
    }
  }
  Highcharts.Pointer.prototype.reset = function () {
    return undefined;
  };
  Highcharts.Point.prototype.select  = function (event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver(); // Show the hover marker
    this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
  };
  
  console.log(this.Capteur_SOL_value_temperateur)
  
  this.activity  = {
  "xData":this.Capteur_SOL_time,
  "xData_monitoring":this.satellite_SOL_time,
  "datasets": [{
      "name": "Capteurs du sol ",
      "name_temperature": "Capteur de la température du sol ",
      "name_h": "Capteur  de la humidité du sol ",
            "data": this.Capteur_SOL_value,
            "data_temperature": this.Capteur_SOL_value_temperateur,
        "unit": " %",
        "unit_temperature": " C",
      "type": "spline",
      "valueDecimals": 1
  }, {
    "name": "Capteurs Agro Surveillance (capteurs virtuel)",
    "name_moisture": "Humidité du sol",
    "name_t0": "T0",
    "name_t10": "T10",
      "data_moisture": this.satellite_SOL_value_moisture ,
      "data_t0": this.satellite_SOL_value_t0,
      "data_t10": this.satellite_SOL_value_t10,
       "unit_moisture": "%",
       "unit_t0": " °C",
       "unit_t10": " °C",
      "type": "spline",
      "valueDecimals": 0
  }]
  };
   console.log(this.activity);
    this.xData = this.activity.xData;
    this.xData_monitoring = this.activity.xData_monitoring;
    let that = this;
  
   
  
    if(this.activity){

  

    this.activity.datasets.forEach(
      
      function (dataset, i) {
  
           
       
  var chartDiv = document.createElement('div');
  
  chartDiv.className = 'chart  chart'+i;
  
  document.getElementById('container').appendChild(chartDiv);
  
  if(i == 0){
    dataset.data = Highcharts.map(dataset.data, function (val, j) {
      return [that.xData[j], val];
    });
  
  dataset.data_temperature = Highcharts.map(dataset.data_temperature, function (val, j) {
    return [that.xData[j], val];
  });
  
            Highcharts.chart(chartDiv, {
                chart: {
                    marginLeft: 40, // Keep all charts left aligned
                    spacingTop: 20,
                    spacingBottom: 20,
                    height:400,
                    
                },  
                 plotOptions: {
                  line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                },
                 
              },
              title: {
                text: dataset.name,
                align: 'left',
                margin: 0,
                x: 30
            },
                credits: {
                    enabled: true
                },
                legend: {
                    enabled: true
                },
                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: syncExtremes
                    },
                    type: 'category',
                    reversed: true,
                    labels: {
                        format: '{value} ',
                        
                    }
                },
                yAxis: [{ // Primary yAxis
                  labels: {
                      format: '{value}°C',
                      style: {
                          color: "#dc3545"
                      }
                  },
                  min:0,
                  max:25,
                  title: {
                      text: 'Température',
                      style: {
                          color: "#dc3545"
                      }
                  },
                  
                  opposite: true
              }
              , { // Secondary yAxis
                  gridLineWidth: 0,
                  min:0,
                  max:50,
                  title: {
                      text: 'Humidité',
                      style: {
                          color: Highcharts.getOptions().colors[0]
                      }
                  },
                  labels: {
                      format: '{value}',
                      style: {
                          color: Highcharts.getOptions().colors[0]
                      }
                  },
                 
              }
            ],
                tooltip: {
                  shared: true,
                  useHTML: true,
                      pointFormat: "<span style='color:{point.series.userOptions.color}'>&#9679;</span> {series.name}: {point.y}  <br/>",
                      headerFormat: "<b>{point.key}</b><br>",
                      valueDecimals: 2,
                },
                series: [{
                  data:  dataset.data ,
                  name: dataset.name_h,
                  type: dataset.type,
                  color: Highcharts.getOptions().colors[i],
                 yAxis:1,
                  fillOpacity: 0.3,
                  
                  tooltip: {
                      valueSuffix: ' ' + dataset.unit
                     
                  },
              },{
                data:  dataset.data_temperature ,
                name: dataset.name_temperature,
                type: dataset.type,
                color: "#dc3545",
               yAxis:1,
                fillOpacity: 0.3,
                
                tooltip: {
                    valueSuffix: ' ' + dataset.unit
                   
                },
            }]
            });
           }
          
  
          if(i == 1){
           
  
             dataset.data_moisture = Highcharts.map(dataset.data_moisture, function (val, j) {
               return [that.xData_monitoring[j], val];
           });
           dataset.data_t0 = Highcharts.map(dataset.data_t0, function (val, j) {
             return [that.xData_monitoring[j], val];
         });
         dataset.data_t10 = Highcharts.map(dataset.data_t10, function (val, j) {
           return [that.xData_monitoring[j], val];
       });
            Highcharts.chart(chartDiv, {
                chart: {
                    marginLeft: 40, // Keep all charts left aligned
                    spacingTop: 20,
                    spacingBottom: 20,
                    height:400,
                 //   width:580,
                },
                plotOptions: {
                  line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                },
                 
              },
                title: {
                    text: dataset.name,
                    align: 'left',
                    margin: 0,
                    x: 30
                },
                credits: {
                    enabled: true
                },
                legend: {
                    enabled: true
                },
                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: syncExtremes
                    },
                    type: 'category',
                    labels: {
                        format: '{value} '
                    }
                },
                yAxis: [{ // Primary yAxis
                  min : 0,
                  max:25,
                  labels: {
                      format: '{value}°C',
                      style: {
                          color: "#dc3545"
                      }
                  },
                  title: {
                      text: 'Température',
                      style: {
                          color: "#dc3545"
                      }
                  },
                  opposite: true
          
              }
              , { // Secondary yAxis
                min:0,
                max:50,
                gridLineWidth: 0,
                  title: {
                      text: 'Humidité',
                      style: {
                          color: Highcharts.getOptions().colors[0]
                      }
                  },
                  labels: {
                      format: '{value}',
                      style: {
                          color: Highcharts.getOptions().colors[0]
                      }
                  }
          
              }
            ],
                tooltip: {
                shared: true,
                useHTML: true,
                    pointFormat: "<span style='color:{point.series.userOptions.color}'>&#9679;</span> {series.name}: {point.y}  <br/>",
                    headerFormat: "<b>{point.key}</b><br>",
                    valueDecimals: 2,
                },
                series: [{
                  data: dataset.data_moisture,
                  name: dataset.name_moisture,
                  type: dataset.type,
                  
                  color: "#0296ff",
                  fillOpacity: 1,
                  yAxis:1,
                  tooltip: {
                      valueSuffix: ' ' + dataset.unit_moisture
                     
                  }
              },{
                data:  dataset.data_t0,
                name: dataset.name_t0,
                type: dataset.type,
                
                color: "#dc3545",
                fillOpacity: 0.7,
                
                tooltip: {
                    valueSuffix: ' ' + dataset.unit_t0
                   
                }
            },{
                data:  dataset.data_t10,
                name: dataset.name_t10,
                type: dataset.type,
                
                color: Highcharts.getOptions().colors[i],
                fillOpacity: 0.3,
                
                tooltip: {
                    valueSuffix: ' ' + dataset.unit_t10
                }
            }]
            });
          }
        }    
  ); 
     } 
}
}