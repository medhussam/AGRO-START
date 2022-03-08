import { Component, OnInit,Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements   OnChanges{
  @Input() datagraph;
  @Input() nomProduit;
  @Input() nomMarche;
  // @Input() datamin;
  // @Input() datamax;
  // @Input() time;
  // @Input() graphbool;
  data = [];
  datamoy = [];
  datamin = [];
  datamax = [];
  time = [];
  graphbool = false;
  message ='';
  

  chart;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartOptions;

  chartCallback1;
  chartOptions1;

  DateD
  DateF
  time1;
  derdate;



  constructor(private theme: NbThemeService,
              ) { 
    this.chartCallback = chart => {
      this.chart = chart;
    };
  }
  Fermer(){
    this.graphbool = false;
    this.message = ''
  }

  ngOnInit(){
    this.datagraph.forEach(element => {
      this.time1.push(element.time.slice(0,10))
      
    });
    this.derdate = this.time1[this.time1.length -1]
    console.log(this.derdate)


  }
 ngOnChanges() {
  //  console.log(this.derdate)
  console.log(this.datagraph)
  this.graphbool=false
  this.datamax = []
  this.datamin = []
  this.datamoy = []
  this.time = []

  if (this.datagraph.length == 0) {
    this.message = 'les prix du produit : '+this.nomProduit +' dans le marché : '+this.nomMarche +' ne sont pas disponible pour la période choisie  '
  }
  
  this.datagraph.forEach(element => {
    this.datamoy.push(element.prix_moy);
    // this.datamax.series.push({name :element.time.slice(0,10) , value : element.prix_max})
    if (element.prix_max != 999.9){
      this.datamax.push(element.prix_max);
    }else {
      this.datamax.push('')
    }
    
    // this.datamin.series.push({name :element.time.slice(0,10) , value : element.prix_min})
    if (element.prix_min != 999.9){
      this.datamin.push(element.prix_min);
    }else {
      this.datamin.push('')
    } 
    this.time.push(element.time.slice(0,10));
    
  });
  // if (this.datamoy!=[]){
  //   this.data = [this.datamin, this.datamax , this.datamoy]
  // }

  // console.log(this.data)
  
  console.log(this.datagraph)
  if (this.datagraph.length === 0){  
    this.graphbool= false;
  }else {
    this.graphbool=true;
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
    //  resetZoom: 'Annuler le zoom',
    // resetZoomTitle: 'Annuler le zoom',
    // printChart: 'Imprimer le graphique',
    // viewFullscreen: 'Plein ecran',
    // downloadPNG: 'Telecharger png',
    // downloadJPEG: 'Telecharger JPEG',
    // downloadPDF: 'Telecharger PDF',
    // downloadSVG: 'Telecharger SVG',
    // separator: 'separator',
    // downloadCSV: 'Telecharger CSV',
    // downloadXLS: 'Telecharger XLS',
    // openInCloud: 'Ouvrir le cloud'
  },
title: {
    text: `Historique des prix enregistrés pour le produit : `+ this.nomProduit + `, Marché : ` + this.nomMarche+` <br> Dernière date :`+this.time[this.time.length -1]
  
},

xAxis: {
  categories : this.time,
    // type: 'datetime',
    // labels: {
    //   format: '{value:%e.%b}'
    // },
    // tickInterval: 24 * 3600 * 1000,
    // dateTimeLabelFormats: { // don't display the dummy year
    //     month: '%e. %b',
    //     year: '%b'
    // },

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
         text: 'Prix en euro (€)',
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
    series: {
      lineWidth: 1,
     
    }
},
colors: [ '#00FF00','#FF0000', '#0000FF'],
// Define the data points. All series have a dummy year
// of 1970/71 in order to be compared on the same x axis. Note
// that in JavaScript, months start at 0 for January, 1 for February etc.
series: [{
  name: 'Prix moyen',
  data: this.datamoy
  // [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
}, {
  name: 'Prix max',
  data: this.datamax
  // [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
}, {
  name: 'Prix min',
  data: this.datamin
  // [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
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

}
