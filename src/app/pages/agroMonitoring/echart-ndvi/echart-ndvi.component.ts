 
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
 
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ngx-chart-ndvi',
  template: `<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions"></highcharts-chart> 
<!--  {{ Carto_data | json }} -->

  `,
})
export class EchartNDVIComponent implements OnChanges {
    Highcharts: typeof Highcharts = Highcharts;
    @Input() Carto_data;
    @Input() measurement ;
    @Input() id_Parcelle ;

 
times_ : any[] = []
mean : any[] = []
minimum : any[] = []
maximum : any[] = []
cloudy : any[] = []
chartOptions: any 
  constructor(){}
  ngOnChanges() {
    this.times_ =  [];
    this.mean  =  [];
    this.minimum   =  [];
    this.maximum   = [];
    this.cloudy   = [];

    this.Carto_data.forEach(element => {
      this.times_.push(this.convert(element.time))
      this.mean.push(element.mean)

      if(element.maximum < element.minimum){
        this.minimum.push(element.maximum)
        this.maximum.push(element.minimum)
      }else{
        this.minimum.push(element.minimum)
        this.maximum.push(element.maximum)
      }
       
      this.cloudy.push((element.cloud_coverage))      
       
    });

    this.chartOptions = {
      
      chart: { type: 'spline',width:870 , height : 410 ,linearGradient: [0, 0, 500, 500],},
      tooltip: {
        xDateFormat: '%d/%m/%Y',
        shared: true,
        split: false,
        enabled: true
    },
      title: { text: 'Historique '+this.measurement.toUpperCase()+' Parcelle : '+this.id_Parcelle, },
      xAxis: { type: 'String' ,categories : this.times_ },
      
      series: [
        {
          name: 'cloud covrage',
          data: this.cloudy,
          color: '#d2d2d250',
          lineWidth: 3.5,
          type: 'area',
        },
        {
          name: 'Moyenne',
          data: this.mean,
          color: 'black',
        },
        {
          name: 'min',
          data: this.minimum,
        },{
          name: 'max',
          data: this.maximum,
          color: 'green',
        }
      ]
    }
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      year_ = date.getFullYear()
    switch (mnth) {
      case "01": {
        return [day,"Janvier "].join(" ");
        break;
      }
      case "02": {
        return [day,"Février "].join(" ");
        break;
      }
      case "03": {
        return [day,"Mars "].join(" ");
        break;
      }
      case "04": {
        return [day,"Avril "].join(" ");
        break;
      }
      case "05": {
        return [day,"Mai "].join(" ");
        break;
      }
      case "06": {
        return [day,"Juin "].join(" ");
        break;
      }
      case "07": {
        return [day,"Juillet "].join(" ");
        break;
      }
      case "08": {
        return [day,"Août "].join(" ");
        break;
      }
      case "09": {
        return [day,"Septembre "].join(" ");
        break;
      }
      case "10": {
        return [day,"Octobre "].join(" ");
        break;
      }
      case "11": {
        return [day,"Novembre "].join(" ");
        break;
      }
      case "12": {
        return [day,"Décembre"].join(" ");
        break;
      }
    }}



}