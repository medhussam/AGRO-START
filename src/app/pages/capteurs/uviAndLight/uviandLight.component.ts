import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from "highcharts";
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'uvi-light',
  template: `<highcharts-chart 
[Highcharts]="Highcharts"
[constructorType]="chartConstructor"
[options]="chartOptions"
[callbackFunction]="chartCallback"
[(update)]=updateFromInput
[oneToOne]="true"
  style="width: 100%; height: 400px; display: block;"
></highcharts-chart>
<ng-content></ng-content>`
})
export class UviAndLightComponent implements OnChanges {


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
  @Input() externalData2;
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
     times.push([Date.UTC(this.getYears(element.time),this.getMounth(element.time),this.getDay(element.time),this.getHours(element.time),this.getMinuts(element.time)), element.value])
   });
   return times
 }

UltravioletValue(values) {
    let data = [];
    values.forEach(element => {
      data.push([Date.UTC(this.getYears(element.time),this.getMounth(element.time),this.getDay(element.time),this.getHours(element.time),this.getMinuts(element.time)), element.uvi])
    });
    return data;
      }
      showLoading4(){
        this.chart.showLoading('Chargement ...');
      }
      hideLoading4(){
        this.chart.hideLoading();
      }
  ngOnChanges(): void {
    this.minmax = [];
    this.chartOptions = {};
     this.series = [];
     let index = 0;
    

  this.data.forEach((element) => {
    if( element.mesure == 'light' && element.id_capteur == this.eventCapteur){
        this.series.push(
            {
                name: element.id_capteur,
                type: 'column',
                 yAxis: 0,
                color: "#FF8C00",
                data: this.getValue(element.chartes_tables),
                tooltip: {
                    valueSuffix: ' LUX'
                }
            },
        )   
  }
  })
  this.externalData2.forEach(element => {
    if (element.mesure == 'uvi' && element.id_exploitation == this.eventExploitation) {
      this.series.push(
        {
            name: "Ultraviolet",
            type: 'column',
             yAxis: 1,
             color: "green",
            data: this.UltravioletValue(element.data),
            tooltip: {
                valueSuffix: 'ultra'
            }
        },
    )
    }
  });
  this.chartOptions = {
    chart: {
      
      zoomType: 'xy'
    },
    events: {
      load: function () {
        if (!this.renderer.forExport) {
          this.chart = this;
        }
      }
    },
    lang: {
      resetZoom: 'Annuler le zoom - Changed',

    },
      title: {
        text: 'Luminosité Vs Ultraviolet',
        align: 'center'
    },
 
    xAxis: [{
 
       type: 'datetime',
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
                color: "#FF8C00",
            }
        },
        title: {
            text: "Luminosité (LUX)",
            style: {
                color: "#FF8C00"
            }
        },
       

    },
     { // Secondary yAxis
        title: {
            text: "Ultraviolet",
            style: {
                color: "green"
            }
        },
        labels: {
            format: `{value} `,
            style: {
                color: "#FFB233"
            }
        },
        opposite: true,
    },
 
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