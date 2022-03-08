import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from "highcharts";
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-multip-y-axis',
  templateUrl: './multip-y-axis.component.html',
  styleUrls: ['./multip-y-axis.component.scss']
})
export class MultipYAxisComponent implements OnInit, OnChanges {
  ngOnInit(): void {}

  width = 100;
  height =  100;
  times: any[] = [];
  minmax: any[] = [];
  series: any[] = [];
  themeSubscription: any;
  @Input() data;
  @Input() eventPages;
  @Input() eventExploitation;
  @Input() eventCapteur;
  @Input() externalData;
  chart;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartOptions;
  constructor(private theme: NbThemeService) {
    const self = this;
    this.chartCallback = chart => {
      self.chart = chart;
    };
  }

  getDay(str){
    let date = new Date(str),
    day = date.getDate();
   return day;
  }
    getHours(str){
      let date = new Date(str),
      hour =date.getHours();
      return hour
    }
    getYears(str){
      let date = new Date(str),
      years =   date.getFullYear();
      return years
    }
    getMinuts(str){
      let date = new Date(str),
      min =  date.getMinutes();
      return min
    }
    getMounth(str){
      let date = new Date(str),
       mnth = date.getMonth();
      return mnth;
    }
  getValue(values) {
  let times = [];

   values.forEach(element => {
     times.push(element.value)
      this.minmax.push(element.value);
      
   });
   return times
 }
 getTimes(Times) {
   var data = [];
   Times.forEach(element => {
     data.push(this.convert(element.time))
   });
   return data
 }
 showLoading3(){
  this.chart.showLoading('Chargement ...');
}
hideLoading3(){
  this.chart.hideLoading();
}
  ngOnChanges(): void {
    this.minmax = [];
    this.chartOptions = {};
     this.series = [];
     let index = 0;
     let valueSuffix1,valueSuffix2,valueSuffix3, type1,type2,name1,name2,name3,title,colorYaxis1,colorYaxis2,colorYaxis3;
     switch (this.eventPages) {
      case 'temperature':
        valueSuffix1 = 'C°';
        valueSuffix2 = '%';
        valueSuffix3 = '';
        colorYaxis1 = '#FF4C33';
        colorYaxis2 = '#0095ff'
        type1 = 'spline';
        type2 = 'column';
        name1 = 'Température (°C)';
        name2 = 'Humidité (%)';
        name3 = '';
        title = 'Température Vs Humidité'
        break;
      case 'humidity':
          valueSuffix1 = '%';
          valueSuffix2 = '°C';
          valueSuffix3 = '';
          colorYaxis1 = '#0095ff';
          colorYaxis2 = '#FF4C33'
          type1 = 'column';
          type2 = 'spline';
          name1 = 'Humidité (%)';
          name2 = 'Température (°C)';
          name3 = '';
          title = 'Humidité Vs Température';
          break;
          case 'light':
            valueSuffix1 = 'LUX';
            name1 = 'Luminusité (LUX)';
            valueSuffix3 = '';
            colorYaxis1 = '#FF8C00';
            type1 = 'column';
            type2 = 'spline';
            valueSuffix2 = 'Ultra';
            name2 = 'Ultra';
            name3 = '';
            title = 'Luminosité';
            break;
            case 'soil_conductivity':
              valueSuffix1 = 'µS/cm';
              valueSuffix2 = '%';
              valueSuffix3 = '°C';
              colorYaxis1 = '#FFB233';
              colorYaxis2 = 'blue';
              colorYaxis3 = '#FF4C33';
              type1 = 'spline';
              type2 = 'column';
              name1 = 'Conductivité du sol (µS/cm)';
              name2 = 'Humidité du sol (%)';
              name3 = 'Température du sol (°C)';
              title = 'Conductivité du sol Vs Humidité du sol Vs Température du sol';
              break;
              case 'soil_humidity':
                valueSuffix1 = '%';
                valueSuffix2 = '°C';
                valueSuffix3 = 'µS/cm';
                colorYaxis1 = 'blue';
                colorYaxis2 = '#FF4C33';
                colorYaxis3 = '#FFB233';
                type1 = 'column';
                type2 = 'spline';
                name1 = 'Humidité du sol (%)';
                name2 = 'Température du sol (°C)';
                name3 = 'Conductivité du sol (µS/cm)';
                title = 'Humidité du sol Vs Température du sol Vs Conductivité du sol';
                break;
                case 'soil_temperature':
                  valueSuffix1 = '°C';
                  valueSuffix2 = '%';
                  valueSuffix3 = 'µS/cm';
                  colorYaxis1 = '#FF4C33';
                  colorYaxis2 = 'blue';
                  colorYaxis3 = '#FFB233';
                  type1 = 'spline';
                  type2 = 'column';
                  name1 = 'Température du sol (°C)';
                  name2 = 'Humidité du sol (%)';
                  name3 = 'Conductivité du sol (µS/cm)';
                  title = 'Température du sol Vs Humidité du sol Vs Conductivité du sol';
                  break;
    } 
 this.data.forEach(element => {
 if (this.eventPages == 'temperature' || this.eventPages == 'humidity' || this.eventPages == 'light') {
  if ( element.id_capteur == this.eventCapteur) {
  
       if (element.mesure == this.eventPages) {
         this.series.push(
            {
               name: element.id_capteur,
               type: type1,
               yAxis: 0,
               pointWidth: 5,
               color: element.mesure == 'temperature'? '#FF4C33': element.mesure == 'humidity'? '#0095ff': '#FF8C00',
               data: this.getValue(element.chartes_tables),
               tooltip: {
                  valueSuffix: valueSuffix1
               }
            }
          )
      }else {
         this.series.push(
            {
               name: element.id_capteur,
               type: type2,
               yAxis: 1,
               pointWidth: 5,
               color: element.mesure == 'temperature'? '#FF4C33': element.mesure == 'humidity'? '#0095ff': '#FF8C00',
               data: this.getValue(element.chartes_tables),
               tooltip: {
                 
                  valueSuffix: valueSuffix2
               }
            }
          )
      }

       this.times = this.getTimes(element.chartes_tables)
     
     } 
 } 
 if (this.eventPages == 'soil_humidity' || this.eventPages == 'soil_temperature' || this.eventPages == 'soil_conductivity') {
  if (element.id_capteur == this.eventCapteur) {

    this.series.push(
       {
          name: element.id_capteur,
          type: element.mesure == 'soil_conductivity' || element.mesure == 'soil_temperature'? 'spline': 'column',
          yAxis: index,
          pointWidth: 5,
          color: element.mesure == 'soil_humidity'? 'blue': element.mesure == 'soil_temperature'? '#FF4C33': '#FFB233',
          data: this.getValue(element.chartes_tables),
          tooltip: {
             valueSuffix: element.mesure == 'soil_humidity'? '%': element.mesure == 'soil_temperature'? '°C': 'µS/cm',
          }
       }
     )
     index++
 }
 } 
 });
   this.chartOptions = {
    chart: {
      zoomType: 'x',
      resetZoomButton: {
          theme: {
              fill: 'white',
              stroke: 'silver',
              r: 0,
              states: {
                  hover: {
                      fill: '#41739D',
                      style: {
                          color: 'white'
                      }
                  }
              }
          }
      }
  },
    events: {
      load: function () {
        if (!this.renderer.forExport) {
          this.chart = this;
        }
      }
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["printChart",
                     "viewFullscreen",
                      "downloadPNG",
                      "downloadJPEG",
                      "downloadPDF",
                      "downloadSVG",
                      "separator",
                      "downloadCSV",
                      "downloadXLS",
                      "openInCloud"]
        }
      }
    },
    lang: {
       resetZoom: 'Annuler le zoom',
      resetZoomTitle: 'Annuler le zoom',
      printChart: 'Imprimer le graphique',
      viewFullscreen: 'Plein ecran',
      downloadPNG: 'Telecharger png',
      downloadJPEG: 'Telecharger JPEG',
      downloadPDF: 'Telecharger PDF',
      downloadSVG: 'Telecharger SVG',
      separator: 'separator',
      downloadCSV: 'Telecharger CSV',
      downloadXLS: 'Telecharger XLS',
      openInCloud: 'Ouvrir le cloud'
    },
      title: {
        text: title,
        align: 'center'
    },
 
    xAxis: [{
      categories: this.times,
        reversed: true,

       showLastLabel: false,
       labels: {
         format: '{value:%e.%b}'
       },
     
       dateTimeLabelFormats: { // don't display the dummy year
           month: '%e. %b',
           year: '%b'
       },
    }],
    yAxis: [
       { // Primary yAxis
      
        labels: {
            format: `{value} `,
            style: {
                color: colorYaxis1,
            }
        },
        title: {
            text: name1,
            style: {
                color: colorYaxis1
            }
        },
       

    },
     { // Secondary yAxis
        title: {
            text: name2,
            style: {
                color: colorYaxis2
            }
        },
        labels: {
            format: `{value} `,
            style: {
                color: colorYaxis2
            }
        },
        opposite: true,
    },
     { // Tertiary yAxis
        
        title: {
            text: name3,
            style: {
                color: colorYaxis3
            }
        },
        labels: {
            format: `{value} `,
            style: {
                color: colorYaxis3
            }
        },
         opposite: true
    }
   ],
    tooltip: {
        shared: true
    },

    series: this.series,
 
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    floating: false,
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    x: 0,
                    y: 0
                },
                yAxis: [{
                    labels: {
                        align: 'right',
                        x: 0,
                        y: -6
                    },
                    showLastLabel: false
                }, {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -6
                    },
                    showLastLabel: false
                }, {
                    visible: false
                }]
            }
        }]
    }
    }
 }
 convert(str) {
   
 
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    hour = ("0" + date.getHours()).slice(-2),
    min = ("0" + date.getMinutes()).slice(-2);

  switch (mnth) {
    case "01": {
      return ["jan", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "02": {
      return ["Feb", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "03": {
      return ["mar",day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "04": {
      return ["apr", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "05": {
      return ["may", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "06": {
      return ["jun", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "07": {
      return ["jul", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "08": {
      return ["aug", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "09": {
      return ["sep", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "10": {
      return ["oct", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "11": {
      return ["nov", day,(hour + "h:" +min)].join(" ");
      break;
    }
    case "12": {
      return ["dec", day,(hour + "h:" +min)].join(" ");
      break;
    }
  }}
}