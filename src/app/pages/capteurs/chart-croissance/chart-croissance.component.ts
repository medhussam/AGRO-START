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
  selector: 'ngx-chart-croissance',
  templateUrl: './chart-croissance.component.html',
 
})

export class ChartCroissanceComponent implements OnChanges,OnInit  {

  themeSubscription: any;
  sierie = [];
  minmax: number[] = [];
  ids: any [] = [];
  @Input() dataMesure;
  @Input() eventPages;
  @Input() eventExploitation;
  @Input() eventCapteur;

  chart;
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

  getDay(str){
    let test1;
    let date = new Date(str),
    day = ("0" + date.getDate()).slice(-2);
   return parseInt(day);
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
      return parseInt(mnth);
    }

   ngOnInit() {}
  getValue(values) {
    let data = [];
    let test = [];
    let freq = 0
    values.forEach((element) => {

       this.minmax.push(element[1]);

      data.push([Date.UTC(this.getYears(element[0]),this.getMounth(element[0]),this.getDay(element[0]),this.getHours(element[0]),this.getMinuts(element[0])), element[1]])
    });
    return data
  }

  showLoading1(){
    this.chart.showLoading('Chargement ...');
  }
  hideLoading1(){
    this.chart.hideLoading();
  }
  ngOnChanges(): void {
    
    const that = this
    this.minmax = [];
    this.sierie = [];
    let min,max,title,valueSuffix,colorYaxis,nameYaxis;
    switch (this.eventPages) {
      case 'temperature':
        title = 'Températures';
        valueSuffix = 'C°';
        colorYaxis = '#FF4C33';
        nameYaxis = 'Température (°C)';
        break;
      case 'humidity':
          title = 'Humidités';
          valueSuffix = '%';
          colorYaxis = '#0095ff';
          nameYaxis = 'Humidité (%)';
   
          break;
          case 'light':
            title = 'Luminosités';
            valueSuffix = 'LUX';
            colorYaxis = '#FF8C00';
            nameYaxis = 'Luminosités (LUX)';
    
            break;
            case 'soil_conductivity':
              title = 'Conductivités du sol';
              valueSuffix = 'µS/cm';
              colorYaxis = '#FFB233';
              nameYaxis = 'conductivité du sol (µS/cm)';
    
              break;
              case 'soil_humidity':
                title = 'Humidités du sol';
                valueSuffix = '%';
                colorYaxis = 'blue';
                nameYaxis = 'Humidité du sol (%)';
                break;
                case 'soil_temperature':
                  title = 'Températures du sol';
                  valueSuffix = 'C°';
                  colorYaxis = '#FF4C33';
                  nameYaxis = 'Température du sol °C';
        
                  break;
                  case 'solar':
                    title = 'Radiations solaires';
                    valueSuffix = 'W/m²';
                    colorYaxis = '#FFAE42';
                    nameYaxis = 'Radiation solaire en W/m²';
          
                    break;
                    case 'atmosphericPressure':
                      title = 'Pressions atmospheriques';
                      valueSuffix = 'kPa';
                      colorYaxis = '#C0DFEF';
                      nameYaxis = 'Pression atmospherique en kPa';
            
                      break;
                      case 'wind_speed':
                        title = 'Vitesses de vent';
                        valueSuffix = 'm/s';
                        colorYaxis = '#25FDE9';
                        nameYaxis = 'Vitesse de vent en m/s';
              
                        break;
                        case 'rain':
                          title = 'Pluviometrie';
                          valueSuffix = 'mm';
                          colorYaxis = '#00E5FF';
                          nameYaxis = 'Pluvimetrie en mm';
                
                          break;
                          case 'vapourPressure':
                            title = 'Pressions de la vapeur';
                            valueSuffix = 'kPa';
                            colorYaxis = '#C5D8E1';
                            nameYaxis = 'Pression de la vapeur en kPa';
                  
                            break;
                            case 'windDirection':
                              title = 'Directions du vent';
                              valueSuffix = '°';
                              colorYaxis = '#C5D8E1';
                              nameYaxis = 'Direction du vent en °';
                    
                              break;
                              case 'gustSpeed':
                                title = 'Vitesses des rafales';
                                valueSuffix = 'm/s';
                                colorYaxis = '#C5D8E1';
                                nameYaxis = 'Vitesse des rafales en m/s';
                      
                                break;
                              case 'strikes':
                                title = 'Coups de foudres';
                                valueSuffix = '';
                                colorYaxis = '#FFFF00';
                                nameYaxis = 'Nombre de coups de foudre ';
                      
                                break;
    } 
    
    this.dataMesure.forEach((element,index) => {
      
      this.sierie.push(
      {
        name: element.tags.capteur,
        data: this.getValue(element.values),
        type: this.eventPages == 'light' || this.eventPages == 'humidity' || this.eventPages == 'strikes' || this.eventPages == 'rain'? 'column': 'spline',
        color: element.name == 'atmosphericPressure' && element.tags.capteur == this.eventCapteur? '#c0dfef':element.name == 'wind_speed' && element.tags.capteur == this.eventCapteur? '#25fde9':element.name == 'rain' && element.tags.capteur == this.eventCapteur? '#00e5ff':element.name == 'vapourPressure' && element.tags.capteur == this.eventCapteur? '#c5d8e1':element.name == 'windDirection' && element.tags.capteur == this.eventCapteur? '#c5d8e1':element.name == 'strikes' && element.tags.capteur == this.eventCapteur? '#ffff00':element.name == 'temperature' && element.tags.capteur == this.eventCapteur? '#FF4C33': element.name == 'humidity' && element.tags.capteur == this.eventCapteur? '#0095ff': element.name == 'soil_humidity' && element.tags.capteur == this.eventCapteur? 'blue': element.name == 'soil_temperature' && element.tags.capteur == this.eventCapteur? '#FF4C33':element.name == 'soil_conductivity' && element.tags.capteur == this.eventCapteur? '#FFB233':element.name == 'light' && element.tags.capteur == this.eventCapteur? '#FF8C00': element.name == 'solar' && element.tags.capteur == this.eventCapteur? '#FFAE42':'#DCDCDC',
        
    })

    });
     max = this.getArrayMax(this.minmax);
     min = this.getArrayMin(this.minmax);
     
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
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
      text: `Historique des ${title} enregistrées au niveau des capteurs`
    
  },
  
  xAxis: {

      type: 'datetime',
      labels: {
        format: '{value:%e.%b}'
      },
      tickInterval: 24 * 3600 * 1000,
      dateTimeLabelFormats: { // don't display the dummy year
          // hour : '%b',
          month: '%e. %b',
          year: '%b'
      },
  
  },
  yAxis: {

    // Primary yAxis
      minRange: 0.1,
      labels: {
          format: `{value} `,
          style: {
              color: colorYaxis,
          }
      },
      title: {
          text: nameYaxis,
          style: {
              color: colorYaxis
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
      column : {
        grouping : false,
        shadow : true ,

      },
      series: {
        lineWidth: 1,
        pointWidth: 10,
        
       
      }
  },
  colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
  // Define the data points. All series have a dummy year
  // of 1970/71 in order to be compared on the same x axis. Note
  // that in JavaScript, months start at 0 for January, 1 for February etc.
  series: this.sierie,
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

    });

  }
  getTimeFormat(value: number) {
    return (
      new Date(value).toLocaleDateString("fr") +
      " " +
      new Date(value).toLocaleTimeString("fr", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      })
    );
  }
  getArrayMax(array){
    return Math.max.apply(null, array);
  }
  getArrayMin(array){
    return Math.min.apply(null, array);
  }
}

