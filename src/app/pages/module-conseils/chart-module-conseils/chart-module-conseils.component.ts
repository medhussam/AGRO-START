import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'ngx-chart-module-conseils',
  templateUrl: './chart-module-conseils.component.html',
  styleUrls: ['./chart-module-conseils.component.scss']
})
export class ChartModuleConseilsComponent implements OnChanges {
  @Input() data;
  @Input() dataM;
  @Input() jourORmen;
  
  chart;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback;
  chartOptions;
  dataSeries = [];
  times = [];




  @Input() MethodeJ_Output: string;
  currentMethodeJ ="P";
  currentMethodeM ="T";
   





   // Declare height and width variables
   scrHeight:any;
   scrWidth:any;

   @HostListener('window:resize', ['$event'])
   getScreenSize(event?) {
         this.scrHeight = window.innerHeight;
         this.scrWidth = window.innerWidth;
         console.log(this.scrHeight, this.scrWidth);
   }
 
  constructor(private theme: NbThemeService) {
    this.chartCallback = chart => {
      this.chart = chart;
    };

    this.getScreenSize();
  }
  getToFixedNumbers(numbers) {
      let num;
      num = numbers.toFixed(2);
      return parseFloat(num);
  }
  getDataSeries(values,methode) {
      let numbers = [];
  values.forEach(element => {
      numbers.push(this.getToFixedNumbers(element[1]));
      this.times.push(methode == 'hargreaves' ||  methode == 'FAO_56'? this.convert(element[0]): this.convert2(element[0]));
  });
  return numbers;
  }
  ngOnChanges(): void {
      this.dataSeries = [];
      // console.log(this.data);
 

      if(this.MethodeJ_Output == 'P'){this.currentMethodeJ ="P";}
      if(this.MethodeJ_Output == 'H'){this.currentMethodeJ ="H";}
      if(this.MethodeJ_Output == 'B'){this.currentMethodeM ="B";}
      if(this.MethodeJ_Output == 'T'){this.currentMethodeM ="T";}
    if (this.data) {
        this.data.forEach(item => {
     item.series.forEach(element => {
      console.log(element.tags.methode);
      //   if (element.tags.methode == 'priestley_taylor') {
      //       console.log(element.values);
      //   }

      // if(element.tags.methode == "FAO_56" ||  element.tags.methode == "Blaney-Criddle"){
      //   this.dataSeries.push({
           
      //       name: element.tags.methode == 'FAO_56'? 'PEMAN-MONTEITH' : element.tags.methode,
      //       data: this.getDataSeries(element.values,element.tags.methode),
      //       color: element.tags.methode == 'hargreaves'? '#7f7f7f' : element.tags.methode == 'FAO_56' ? '#49a010' : element.tags.methode == 'Thornthwaite' ? '#7f7f7f': '#4f5e83',
      //   });
      // }

      if(this.currentMethodeJ == 'P'){
        if(element.tags.methode == "FAO_56"){
          this.dataSeries.push({
             
              name: element.tags.methode == 'FAO_56'? 'PEMAN-MONTEITH' : element.tags.methode,
              data: this.getDataSeries(element.values,element.tags.methode),
              color: element.tags.methode == 'hargreaves'? '#e9cb83' : element.tags.methode == 'FAO_56' ? '#49a010' : element.tags.methode == 'Thornthwaite' ? '#7f7f7f': '#4f5e83',
          });
        }
      }
      if(this.currentMethodeJ == 'H'){
        if(element.tags.methode == "hargreaves" ){
          this.dataSeries.push({
             
              name: element.tags.methode == 'FAO_56'? 'PEMAN-MONTEITH' : element.tags.methode,
              data: this.getDataSeries(element.values,element.tags.methode),
              color: element.tags.methode == 'hargreaves'? '#e9cb83' : element.tags.methode == 'FAO_56' ? '#49a010' : element.tags.methode == 'Thornthwaite' ? '#7f7f7f': '#4f5e83',
          });
        }
      }
      if(this.currentMethodeM == 'B'){
        if( element.tags.methode == "Blaney-Criddle"){
          this.dataSeries.push({
             
              name: element.tags.methode == 'FAO_56'? 'PEMAN-MONTEITH' : element.tags.methode,
              data: this.getDataSeries(element.values,element.tags.methode),
              color: element.tags.methode == 'hargreaves'? '#e9cb83' : element.tags.methode == 'FAO_56' ? '#49a010' : element.tags.methode == 'Thornthwaite' ? '#7f7f7f': '#4f5e83',
          });
        }
      }
      if(this.currentMethodeM == 'T'){
        if(element.tags.methode == "Thornthwaite"){
          this.dataSeries.push({
             
              name: element.tags.methode == 'FAO_56'? 'PEMAN-MONTEITH' : element.tags.methode,
              data: this.getDataSeries(element.values,element.tags.methode),
              color: element.tags.methode == 'hargreaves'? '#e9cb83' : element.tags.methode == 'FAO_56' ? '#49a010' : element.tags.methode == 'Thornthwaite' ? '#7f7f7f': '#4f5e83',
          });
        }
      }

     });
        });
    }


    if (this.dataM) {
  //     this.dataM.forEach(item => {
  //  item.series.forEach(element => {
  //   console.log(element.name);
  //   //   if (element.tags.methode == 'priestley_taylor') {
  //   //       console.log(element.values);
  //   //   }
  //     this.dataSeries.push({
         
  //         name: element.tags.methode == 'FAO_56'? 'PEMAN-MONTEITH' : element.tags.methode,
  //         data: this.getDataSeries(element.values,element.tags.methode),
  //         color: element.tags.methode == 'hargreaves'? '#7f7f7f' : element.tags.methode == 'FAO_56' ? '#49a010' : element.tags.methode == 'Thornthwaite' ? '#7f7f7f': '#4f5e83',
  //     })
  //  });
  //     });
  }




    this.chartOptions = {
      chart: {
      //  type: 'column',
        type: this.jourORmen == 'J'? 'line' : 'column', 
       // height: (9 / 16 * 100) + '%' // 16:9 ratio
      //  width:this.scrWidth-400
        
    },

      yAxis: [
        
        { 
          
           title: {
               text: this.jourORmen == 'J'? "<b>ET</b><p style='font-size:9px;'>0 </p> (mm/jour)" : "<b>ET</b><p style='font-size:9px;'>0 </p> (mm/mois)", 
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
         
       }
      ],
      title: {
        text: ' '
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
    xAxis: {
      reversed: true,
        categories: this.times,
    },
    // labels: {
    //     items: [{
    //         // html: 'Total fruit consumption',
    //         style: {
    //             left: '50px',
    //             top: '18px',
    //             color: ( // theme
    //                 Highcharts.defaultOptions.title.style &&
    //                 Highcharts.defaultOptions.title.style.color
    //             ) || 'black'
    //         }
    //     }]
    // },
    series: this.dataSeries,
    }
  }
  convert(str) {
   
 
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
  
    switch (mnth) {
      case "01": {
        return ["Jan", day].join(" ");
        break;
      }
      case "02": {
        return ["Fév", day].join(" ");
        break;
      }
      case "03": {
        return ["Mars",day].join(" ");
        break;
      }
      case "04": {
        return ["Avril", day].join(" ");
        break;
      }
      case "05": {
        return ["Mai", day].join(" ");
        break;
      }
      case "06": {
        return ["Juin", day].join(" ");
        break;
      }
      case "07": {
        return ["Juillet", day].join(" ");
        break;
      }
      case "08": {
        return ["Aout", day].join(" ");
        break;
      }
      case "09": {
        return ["Sep", day].join(" ");
        break;
      }
      case "10": {
        return ["Oct", day].join(" ");
        break;
      }
      case "11": {
        return ["Nov", day].join(" ");
        break;
      }
      case "12": {
        return ["Dec", day].join(" ");
        break;
      }
    }}
    convert2(str) {
   
 
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    
      switch (mnth) {
        case "01": {
          return "Jan";
          break;
        }
        case "02": {
          return "Fév";
          break;
        }
        case "03": {
          return "Mars";
          break;
        }
        case "04": {
          return "Avril";
          break;
        }
        case "05": {
          return "Mai";
          break;
        }
        case "06": {
          return "Juin";
          break;
        }
        case "07": {
          return "Juillet";
          break;
        }
        case "08": {
          return "Aout";
          break;
        }
        case "09": {
          return "Sep";
          break;
        }
        case "10": {
          return "Oct";
          break;
        }
        case "11": {
          return "Nov";
          break;
        }
        case "12": {
          return "Dec";
          break;
        }
      }}
}
