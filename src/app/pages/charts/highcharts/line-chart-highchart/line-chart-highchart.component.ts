import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
@Component({
  selector: 'ngx-line-chart-highchart',
  templateUrl: './line-chart-highchart.component.html',
  styleUrls: ['./line-chart-highchart.component.scss']
})
export class LineChartHighchartComponent implements OnInit ,OnChanges {
  @Input() data;
  @Input() NomBarrage;
  @Input() checkTAUX;
  
 
  constructor() { }
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options 

  ngOnInit(): void {

  }
  
  ngOnChanges(): void {
    let name;
    let values = [];
    let times = [];
    let title = '';
    let unite = ''
    let color ='';

 

    if(this.checkTAUX){
      if( this.data["taux_de_remplissage"]){
      this.data["taux_de_remplissage"].map(element => {
  
        times.push(this.convert(element.time))
          values.push(element.values)
           title = 'Taux de remplissage (%)  - ';
           unite = 'Taux %';
           color = '#3669ff6b'; 
    });}
    }else{
      if( this.data["capacite"]){
      this.data["capacite"].map(element => {
  
        times.push(this.convert(element.time))
        values.push(element.value)
        name = this.NomBarrage;
         
           title = 'Retenue (Mm³) - ';
           unite = 'Mm³';
           color = '#42aaff6b'; 
    });
    }
  }

name = this.NomBarrage;

this.chartOptions = {
  chart: {
     
     spacingLeft:0,
     spacingRight:1
},
  colors:[color],
  plotOptions: {
    series: {
        lineWidth: 3.5,       
          stacking: 'normal'
     
    }
},
  title: 
    name?
    {text: title+name}
    : {text: 'Aucune donnée fournie'},
  
  rangeSelector: {
   // floating: true,
   // y: -65,
    //verticalAlign: 'bottom',
   // inputDateFormat: 'yyyy/mm/dd',
  //selected: 1
  },
  xAxis: {
    categories: times
  },
  yAxis: {
    title: {
      text: unite
    }
  },

  series: 
  name?
  [ 
    
    { 
      name: name,
      type: 'area',
      data: values,
      tooltip: {
        valueDecimals: 2
      }
    } 
  ]:
  [ 
    
    {
  
      name: "Aucune donnée fournie",
      type: "line",
      data: [],
      tooltip: {
        valueDecimals: 2
      }
    } 
  ]
};

  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2)
    switch (mnth) {
      case "01": {
        return ["jan", day].join(" ");
        break;
      }
      case "02": {
        return ["Feb", day].join(" ");
        break;
      }
      case "03": {
        return ["mar", day].join(" ");
        break;
      }
      case "04": {
        return ["apr", day].join(" ");
        break;
      }
      case "05": {
        return ["may", day].join(" ");
        break;
      }
      case "06": {
        return ["jun", day].join(" ");
        break;
      }
      case "07": {
        return ["jul", day].join(" ");
        break;
      }
      case "08": {
        return ["aug", day].join(" ");
        break;
      }
      case "09": {
        return ["sep", day].join(" ");
        break;
      }
      case "10": {
        return ["oct", day].join(" ");
        break;
      }
      case "11": {
        return ["nov", day].join(" ");
        break;
      }
      case "12": {
        return ["dec", day].join(" ");
        break;
      }
    }}

}
