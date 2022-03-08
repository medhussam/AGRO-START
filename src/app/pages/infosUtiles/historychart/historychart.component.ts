import { Component, OnInit,Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-historychart',
  templateUrl: './historychart.component.html',
  styleUrls: ['./historychart.component.scss']
})
export class HistorychartComponent implements OnInit {


  @Input() barrageinfo1;
  @Input() datagraph1;
  @Input() checktaux;
  @Input() titreY;

  chartCallback1;
  chartOptions1;
  chart1;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chart;

  color;

  time1=[]
  data1=[]
  constructor(theme : NbThemeService) { 

  }

  ngOnInit() {


    
    this.datagraph1.forEach(el => {
      this.time1.push(el.time.slice(0,10))
      this.data1.push(el.values == null? el.value : el.values);
    });

  }
  ngOnChanges(){
  this.time1=[]
  this.data1=[]
  this.color =''
  
  console.log("changes!!"+this.checktaux)  

  
  this.datagraph1.forEach(el => {
    this.time1.push(el.time.slice(0,10))
    this.data1.push(el.values == null? el.value : el.values);
  });


  if (this.checktaux == true) {
    this.color = '#42aaff6b'
  }else{
    this.color = '#3669ff6b'; 
  }

  
  this.chartOptions1 = {
    colors:[this.color],
    chart1: {
     
      zoomType: 'x',
      width: 1370,
      resetZoomButton: {
          theme: {
              fill: 'white',
              stroke: 'silver',
              r: 0,
              states: {
                  hover: {
                      fill: '#42aaff6b',
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
          this.chart1 = this;
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
      text: `Situation journalière du barrage : `+ this.barrageinfo1.nom + `, Dernière valeur enregistrée à la date du :`+ this.time1[this.time1.length -1]
    
  },
  
  xAxis: {
    categories : this.time1,

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
  },
  
  // Define the data points. All series have a dummy year
  // of 1970/71 in order to be compared on the same x axis. Note
  // that in JavaScript, months start at 0 for January, 1 for February etc.
  series: [{
   
    name: 'Situation du barrage',
    type: 'area',
    data: this.data1
  }, ],
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions1: {
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
