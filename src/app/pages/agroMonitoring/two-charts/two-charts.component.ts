 
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Console } from 'console';
 
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ngx-chart-two-chart',
  template: `
 <highcharts-chart 
[Highcharts]="Highcharts"
[constructorType]="chartConstructor"
[options]="chartOptions"
[callbackFunction]="chartCallback"
[(update)]=updateFromInput
[oneToOne]="true"
  style="width: 100%; height: 400px; display: block;"
></highcharts-chart>


<!----> <highcharts-chart  *ngIf="TEMP"
[Highcharts]="Highcharts"
[constructorType]="chartConstructor"
[options]="chartOptions0"
[callbackFunction]="chartCallback"
[(update)]=updateFromInput
[oneToOne]="true"
  style="width: 100%; height: 400px; display: block;"
></highcharts-chart> 
  `,
})



export class TwoChartComponent implements OnChanges  {

  @Input() satellite_SOL_time;
  @Input() satellite_SOL_value_moisture;
  @Input() satellite_SOL_value_t0;
  @Input() satellite_SOL_value_t10;
  
  @Input() Capteur_SOL_time;
  @Input() Capteur_SOL_value;
  @Input() Capteur_SOL_value_temperateur;


  @Input() TEMP;
  
  
  chart;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartOptions;
  chartOptions0;
  constructor(private theme: NbThemeService) {
    const self = this;
    this.chartCallback = chart => {
      self.chart = chart;
    };
  }
  ngOnChanges() {
this.FUNCTION_TWOCHARTS();

  
  }
  ngOnInit() {

  }

  ChARt_INit(){
      

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
            render:function(){
                console.log("reflowed");
                this.reflow();
            },
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
            text: "Données Satellitaire",
            align: 'center'
        },
     
        xAxis: [{
          categories: this.satellite_SOL_time,
            reversed: false,
           type: 'category',
          labels: {
            format: '{value} '
        }
        }],
        yAxis: [
           { // Primary yAxis
            // min : 0,
            // max:30,
            labels: {
                format: `{value} `,
                style: {
                    color: "#62b4f9",
                }
            },
            title: {
                text: "Humidité (mm)",
                style: {
                    color: "#62b4f9"
                }
            },
           
    
        },
         { // Secondary yAxis
            min : 0,
            max:35,
            title: {
                text: "T0 (c)",
                style: {
                    color: "#000"
                }
            },
            labels: {
                format: `{value} `,
                style: {
                    color: "#000"
                }
            },
            opposite: true,
        },
         { // Tertiary yAxis
            
            title: {
                text: "T10 (c)",
                style: {
                    color: "#FF6C6C"
                }
            },
            labels: {
                format: `{value} `,
                style: {
                    color: "#FF6C6C"
                }
            },
             opposite: true
        }
       ],
        tooltip: {
            shared: true
        },
        series: [{
          name: 'Humidité ',
          type: 'column',
          yAxis: 0,
          tooltip: {
              valueSuffix: ' mm'
          }
  
      }, {
          name: 'T0',
          type: 'spline',
          yAxis: 1,
          marker: {
              enabled: false
          },
          dashStyle: 'shortdot',
          tooltip: {
              valueSuffix: ' °C'
          }
  
      }, {
          name: 'T10',
          type: 'spline',
          yAxis: 2,
          tooltip: {
              valueSuffix: ' °C'
          },
          color: "#FF6C6C"
      }],
     
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
  

        this.chartOptions0 = {
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
                render:function(){
                    console.log("reflowed");
                    this.reflow();
                },
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
                text: "Données des Capteurs",
                align: 'center'
            },
         
            xAxis: [{
              categories: this.Capteur_SOL_time,
                reversed: true,
               type: 'category',
              labels: {
                format: '{value} '
            }
            }],
            yAxis: [
               { // Primary yAxis
              
                labels: {
                    format: `{value} `,
                    style: {
                        color: "#62b4f9",
                    }
                },
                title: {
                    text: "Humidité",
                    style: {
                        color: "#62b4f9"
                    }
                },
               
        
            },
             { // Secondary yAxis             
                title: {
                  text: "Température",
                  style: {
                      color: "#000"
                  }
              },
              labels: {
                  format: `{value} `,
                  style: {
                      color: "#000"
                  }
              },
               opposite: true
            },
             
           ],
            tooltip: {
                shared: true
            },
            series: [{
              name: 'Humidité',
              type: 'column',
              //yAxis: 1,
              tooltip: {
                  valueSuffix: ' mm'
              }
      
          }, {
              name: 'Température',
              type: 'spline',
              yAxis: 1,
              marker: {
                  enabled: false
              },
              dashStyle: 'shortdot',
              tooltip: {  data: this.satellite_SOL_value_moisture,
                  valueSuffix: ' °C'
              }
      
          
          }],
         
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

  FUNCTION_TWOCHARTS(){
    this.ChARt_INit();
    this.chartOptions.series[0].data = this.satellite_SOL_value_moisture; 
    this.chartOptions.series[1].data = this.satellite_SOL_value_t0 ;
    this.chartOptions.series[2].data = this.satellite_SOL_value_t10 ;
    this.chartOptions0.series[1].data = this.Capteur_SOL_value_temperateur ;
    this.chartOptions0.series[0].data = this.Capteur_SOL_value ;
  }
}
