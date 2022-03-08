import { Component, OnInit,Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NbThemeService } from '@nebular/theme';
import { NbIconConfig } from '@nebular/theme';
import { BarrageService } from 'app/_services/barrage.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-line-chart-b',
  templateUrl: './line-chart-b.component.html',
  styleUrls: ['./line-chart-b.component.scss']
})
export class LineChartBComponent implements OnInit {
  @Input() datagraph;
  @Input() barrageinfo;
  checkTAUX = true;
  typedata = "taux_de_remplissage"
  chart;

  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartOptions;
  graphbool = false;
  
  barrageinfo1 : any;
  titreY = 'Retenue en % '



  datagraph1: any;

  time = [];
  data = [];



  Hiscon: NbIconConfig = { icon: 'history', pack: 'fa' };
  Rcon: NbIconConfig = { icon: 'calendar-alt', pack: 'fa' };

  DateD;
  DateF;

  datedebutSelected: Date = new Date('01-01-2015');
  dateFinSelected: Date = new Date(Date.now());


  constructor(private theme: NbThemeService,public datepipe : DatePipe,private bService: BarrageService,) { 
    this.chartCallback = chart => {
      this.chart = chart;
    };


  }


  ngOnInit() {
    this.barrageinfo1 = this.barrageinfo
    // this.datedebutSelected.setDate(this.dateFinSelected.getDate() - 30)
    this.DateD = this.datedebutSelected.toISOString()
    this.DateF = this.dateFinSelected.toISOString()


    
    this.bService.getChartBarragesByNameAndDate(this.barrageinfo.nom,this.DateD,this.DateF).subscribe(element=>{
      this.datagraph1 = element[this.typedata];

    })


  }

  ngOnChanges(){
    this.barrageinfo1 = this.barrageinfo
    
    this.time=[]
    this.data=[]

    this.datagraph.forEach(element => {
      
      this.time.push(element.time.slice(0,10))
      if(this.checkTAUX){
        this.data.push(element.values)
      }
      else {
        this.data.push( element.values*this.barrageinfo.capacite_normale/100 )
      }
      
    });
    console.log("data : ")
    console.log(this.data)

    this.bService.getChartBarragesByNameAndDate(this.barrageinfo.nom,this.DateD,this.DateF).subscribe(element=>{
      this.datagraph1 = element[this.typedata];

    })  


    this.graphbool = true

    this.chartOptions = {
  
      chart: {
        colors:["#3669ff6b"],
        zoomType: 'x',
        marginLeft : 100,
        // width: '1370',
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
        text: `Situation journalière du barrage : `+ this.barrageinfo.nom
      
    },
    
    xAxis: {
      categories : this.time,

    },
    yAxis: {
    
      // Primary yAxis
        minRange: 0.1,
        labels: {
            format: `{value} `,
            style: {
                // color: colorYaxis,
            }
        },
        title: {
             text: this.titreY,
            style: {
                // color: colorYaxis
            }
        },
       
    
    
       
    },
    
    navigation: {
    
      buttonOptions: {
          enabled: true,
        
          y: 20
      }
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        ]
    },
        series: {
          lineWidth: 1,
         
        }
    },
    
    // Define the data points. All series have a dummy year
    // of 1970/71 in order to be compared on the same x axis. Note
    // that in JavaScript, months start at 0 for January, 1 for February etc.
    series: [{
     
      name: 'Situation du barrage',
      type: 'area',
      data: this.data
    }, ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        marker: {
                            radius: 2.5
                        }
                    }
                }
            }
        }]
    }
    }


  }

  
  Fermer(){
    this.graphbool=false;
  }
  
  changeTAUX(){
    if(this.checkTAUX){
      this.checkTAUX = false;
      this.typedata = "capacite"  
      this.titreY = 'Retenue en Mm3'
      this.bService.getChartBarragesByNameAndDate(this.barrageinfo.nom,this.DateD,this.DateF).subscribe(element=>{        
        this.datagraph1 = element[this.typedata];
      })
      console.log("checktaux : ")
      console.log(this.datagraph1)      
    }else{
      this.checkTAUX = true; 
      this.typedata = "taux_de_remplissage" 
      this.titreY = 'Retenue en %'
      this.bService.getChartBarragesByNameAndDate(this.barrageinfo.nom,this.DateD,this.DateF).subscribe(element=>{        
        this.datagraph1 = element[this.typedata];
      })
      console.log("checktaux : ")
      console.log(this.datagraph1)
    }
    
    this.time =[]
    this.data =[]

    this.datagraph.forEach(element => {
      this.time.push(element.time.slice(0,10))
      if(this.checkTAUX){
        this.data.push(element.values)
      }
      else {
          
        this.data.push(element.values*this.barrageinfo.capacite_normale/100)
      }
      
    });
    console.log("checktaux1 : ")
    console.log(this.datagraph)
    this.chartOptions = {
  
      chart: {
        colors:["#3669ff6b"],
        zoomType: 'x',
        marginLeft : 100,
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
        text: `Situation journalière du barrage : `+ this.barrageinfo.nom
      
    },
    
    xAxis: {
      categories : this.time,

    },
    yAxis: {
    
      // Primary yAxis
        minRange: 0.1,
        labels: {
            format: `{value} `,
            style: {
                // color: colorYaxis,
            }
        },
        title: {
             text: this.titreY,
            style: {
                // color: colorYaxis
            }
        },
       
    
    
       
    },
    
    navigation: {
    
      buttonOptions: {
          enabled: true,
        
          y: 20
      }
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        ]
    },
        series: {
          lineWidth: 1,
         
        }
    },
    
    // Define the data points. All series have a dummy year
    // of 1970/71 in order to be compared on the same x axis. Note
    // that in JavaScript, months start at 0 for January, 1 for February etc.
    series: [{
     
      name: 'Situation du barrage',
      type: 'area',
      data: this.data
    }, ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        marker: {
                            radius: 2.5
                        }
                    }
                }
            }
        }]
    }
    }
 
  }


      dateTo(event){
        this.dateFinSelected = event;
        this.DateF = this.dateFinSelected.toISOString()
        this.bService.getChartBarragesByNameAndDate(this.barrageinfo.nom,this.DateD,this.DateF).subscribe(element=>{        
          this.datagraph1 = element[this.typedata];
        })

      }

      dateFrom(event){
        this.datedebutSelected = event;
        this.DateD = this.datedebutSelected.toISOString()
        this.bService.getChartBarragesByNameAndDate(this.barrageinfo.nom,this.DateD,this.DateF).subscribe(element=>{

          
          this.datagraph1 = element[this.typedata];

        })

      }


    }


