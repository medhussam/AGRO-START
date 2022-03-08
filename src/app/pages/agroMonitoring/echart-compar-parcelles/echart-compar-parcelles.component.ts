
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Console } from 'console';
 
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ngx-chart-compar-parcelles',
  template: `<highcharts-chart 
  id="container" 
  [Highcharts]="Highcharts"
  [constructorType]="chartConstructor"
  [options]="chartOptions"
  [callbackFunction]="chartCallback"
  [(update)]=updateFromInput
  [oneToOne]="true"
    style="width: 100%; height: 400px; display: block;"
  ></highcharts-chart>
<!-- 
 ----------- {{ NombreParcelle| json }}  -->
  

  `,
})
export class EchartComparParcelleComponent implements OnChanges {
    
    @Input() parcelleIndexes;
    @Input() measurement ;
    @Input() id_Parcelle ;
    @Input() Parcelle ;
    @Input() NombreParcelle ;
    
 
times_: any[] = [];

chart;
updateFromInput = false;
Highcharts = Highcharts;
chartConstructor = "chart";
chartCallback;
chartOptions;
series_ = [];
  constructor(){}




isEmptyObject(obj){
  return (obj && (Object.keys(obj).length === 0))
}
dataSerie(value) {
  let data = []
  value.forEach(element => {
    data.push(element[1])
  });
  return data;
}
timeValue(times) {
  let time = [];
  times.forEach(element => {
    time.push(this.convert(element[0]))
  });
  return time;
}
  ngOnChanges() {


    this.chartOptions = [];

    this.series_ = [];
    this.times_ =  [];


if(!this.isEmptyObject(this.parcelleIndexes)){

    this.parcelleIndexes['results'].forEach(element => {


      element["series"].forEach(e => {
 
        

         
          if(e.name == this.checkINDICE(this.measurement) ){
            
            let mylist = [];
      
           
            this.times_ = this.timeValue(e.values);
            
            this.series_.push(
              {
                name: e.tags.id_parcelle,
                data: this.dataSerie(e.values),
                type: 'spline',
                marker: {
                  enabled: true,
                  radius:  2,
                }
              })
          }
     
      });
    });
    

}
  let mySeries = [];

    this.chartOptions = {
      chart: { type: 'spline',width:870},
      tooltip: {
        xDateFormat: '%d/%m/%Y',
        shared: true,
        split: false,
        enabled: true
    },
      title: { text: "Historique "+this.measurement.toUpperCase()+" de l'ensemble des parcelles"},
      xAxis: { type: 'String' ,categories : this.times_ ,reversed : true },
      series: this.series_,
    }
    setTimeout(() => {
    
    }, 6000);
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


    checkINDICE(indice){

      if(indice == "ndvi"){
        return 'stats_ndvi';
      }else if(indice == "evi"){
        return 'stats_evi';
      }else if(indice == "evi2"){
        return 'stats_evi2';
      }else if(indice == "nri"){
        return 'stats_nri';
      }else if(indice == "dswi"){
        return 'stats_dswi';
      }else if(indice == "ndwi"){
        return 'stats_ndwi';
    }
    }
    

}