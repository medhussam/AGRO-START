import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as Highcharts from 'highcharts';
import HC_exporting from "highcharts/modules/exporting";
import  HighchartsMore from "highcharts/highcharts-more";
import  HighchartsExporting from "highcharts/modules/exporting";
import  HighchartsExportData from "highcharts/modules/export-data";
HC_exporting(Highcharts);
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
@Component({
    selector: 'ngx-chart-cpe',
    templateUrl: './chart-spe.component.html',
  })
  export class ChartSpeComponent implements OnChanges,OnInit {
 
    @Input() eventPages;
    @Input() eventExploitation;
    @Input() eventCapteur;
    @Input() tBase;
    @Input() capData;
    @Input() rainData;
    themeSubscription: any;
    series = [];
    chart;
    total = [];
    total2 = [];
    updateFromInput = false;
    Highcharts = Highcharts;
    chartConstructor = "chart";
    chartCallback;
    chartOptions;
    constructor(private theme: NbThemeService) {
     
      this.chartCallback = chart => {
        this.chart = chart;
      };
    }
 showLoading2(){
    this.chart.showLoading('Chargement ...');
  }
  hideLoading2(){
    this.chart.hideLoading();
  }
    ngOnInit(): void {}
    getDay(str){
      let test1;
      let date = new Date(str),
      day = ("0" + date.getDate()).slice(-2);
     test1 = parseInt(day)
     
     return test1;
    }
    getHours(str){
      let date = new Date(str),
      hour = ("0" + date.getHours()).slice(-2);
      
      return parseInt(hour)
    }
    getYears(str){
      let date = new Date(str),
      years = ("0" + date.getFullYear());
      
      return parseInt(years)
    }
    getMinuts(str){
      let date = new Date(str),
      min = ("0" + date.getMinutes()).slice(-2);
      
      return parseInt(min)
    }
    getMounth(str){
      let date = new Date(str),
       mnth = ("0" + date.getMonth()).slice(-2);
       let x = parseInt(mnth); 
      return x;
    }
    djour(value){
    this.total = [];
    this.total2 = [];
    let dateObj = new Date(Date.now());
let month = dateObj.getUTCMonth() + 1;
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let newdate = year + "/" + month + "/" + day;
let lastTime = new Date(value[0].time);
let month2 = lastTime.getUTCMonth() + 1;
let day2 = lastTime.getUTCDate();
let year2 = lastTime.getUTCFullYear();
let newdate2 = year2 + "/" + month2 + "/" + day2;
let bool = this.dateCompare(newdate,newdate2)
let reverse = []
if (bool) {
   reverse = value.reverse();
} else {
   reverse = value;
}
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    reverse.forEach(element => {
     let total = (element.max + element.min) / 2;
     let total2 = total - this.tBase;
   if (total2 < 0) {
           total2 = 0;
          }
   this.total.push(total2)
   this.total2.push([Date.UTC(this.getYears(element.time),this.getMounth(element.time),this.getDay(element.time),this.getHours(element.time),this.getMinuts(element.time)), this.total.reduce(reducer)])
    });
    return this.total2;
    }
    rainValue(values) {
  let data = [];
  
  values.forEach(element => {
    data.push([Date.UTC(this.getYears(element.time),this.getMounth(element.time),this.getDay(element.time),this.getHours(element.time),this.getMinuts(element.time)), element.rain])
  });
  return data;
    }
     dateCompare(d1, d2){
      const date1 = new Date(d1);
      const date2 = new Date(d2);
      let bool = false;
      if(date1.getTime() == date2.getTime()){
         bool = true;
      } 
      return bool
  }

    ngOnChanges(): void {
      this.series = [];
      this.chartOptions = {};
 if (this.rainData.length !== 0) {
  this.rainData.forEach(element => {
    if (element.id_exploitation == this.eventExploitation) {
      this.series.push(
        {
            name: "Pluviométrie (mm)",
            type: 'column',
             yAxis: 1,
             color: Highcharts.getOptions().colors[0],
             
            data: this.rainValue(element.data),
            tooltip: {
                valueSuffix: ' mm'
            }
        },
    )
    }
   });
 }       
       if (this.capData.length !== 0) {
        this.series.push(
          {
              name: this.eventCapteur,
              type: 'spline',
               yAxis: 0,
               color: Highcharts.getOptions().colors[1],
              data: this.djour(this.capData),
              tooltip: {
                  valueSuffix: ' °C'
              }
          },
      ) 
       }   
    

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
          text: 'Degré jour de croissance',
          align: 'center'
      },
      xAxis: [{
          type: 'datetime',
         
          dateTimeLabelFormats: { 
              month: '%e. %b',
              year: '%b',
          },
       

      }],
      yAxis: [
        { 
          labels: {
              format: '{value}',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: 'Temperature (°C)',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
         
      },
       { // Secondary yAxis
         
          title: {
              text: 'Pluviométrie (mm)',
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
          opposite: true
      },
      
  ],
      tooltip: {
          shared: true
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          x: 80,
          verticalAlign: 'top',
          y: 55,
          floating: true,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || // theme
              'rgba(255,255,255,0.25)'
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

  }

   
