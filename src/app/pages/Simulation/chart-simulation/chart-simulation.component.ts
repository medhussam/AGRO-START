import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-chart-simulation',
  styleUrls: ['./chart-simulation.component.scss'],
  
  templateUrl: './chart-simulation.component.html',
  
})

export class chartsimulationComponent implements OnInit ,OnChanges{


  options: any = {};
  themeSubscription: any;
   
  @Input() Statistics;
  array: any[] = []
  constructor(private theme: NbThemeService) {}
  ngOnInit(){}
  ngOnChanges() {
    let legendD ;
    let typeOfChart;
    let mean;
    let times = [];
   
    let val_min = [];
    let val_max = [];
    let values = [];
    let val_mean = [];
    let minMesure :any;
    let maxMesure :any;
    let Color ="#598bff";
    let ColorMoyen ="#ffaa00";



    if (this.Statistics) {
      legendD = 'Graphique d\'evolution des statistiques';
      mean = 'Moyenne journalière '
      typeOfChart = 'bar';
      // minMesure = 10;
      // maxMesure = 100;
      // if(this.Statistics['humidity']){
      this.Statistics.forEach(element => {
        // times.push(this.convert(element.time))
        // values.push(element.value)
        // val_mean.push(element.mean.toFixed(2))

        
       // this.array.push(this.convert(element.time))
        times.push(this.convert(element.time))
        // values.push(element.value.toFixed(2))
        val_mean.push(element.mean.toFixed(2))
      
      val_max.push(element.max.toFixed(2))
        if(element.min<0){
          val_min.push(0)
        }else{
          val_min.push(element.min.toFixed(2))
        }
     


      });
    // }
}
// if (this.luminosite) {
//   legendD = 'Luminosite (lux)';
//   mean = 'Moyenne journalière '
//   typeOfChart = 'bar';
//    Color ="#ffc94d";
//    ColorMoyen ="#598bff";
//   if(this.luminosite['light']){
//   this.luminosite['light']['data'].forEach(element => {
//       let a = new Date(element.time);
//     times.push(this.convert(element.time))
//     values.push(element.value)
//     if (element.mean) {
//       val_mean.push(element.mean.toFixed(2))
//     } else {
//       val_mean.push(element.mean)
//     }
  
//   });}
// } 


// if (this.UV) {
//   legendD = 'UV';
//   mean = 'Moyenne journalière '
//   typeOfChart = 'bar';
//    Color ="#6f42c1a1";
//    ColorMoyen ="#598bff";
//   if(this.UV['uv']){
//   this.UV['uv']['data'].forEach(element => {
//       let a = new Date(element.time);
//     times.push(this.convert(element.time))
//     values.push(element.value)
//     if (element.mean) {
//       val_mean.push(element.mean.toFixed(2))
//     } else {
//       val_mean.push(element.mean)
//     }
  
//   });}
// } 



// if (this.Vent) {
//   legendD = 'Vent';
//   mean = 'Moyenne journalière '
//   typeOfChart = 'bar';
//    Color ="#20c9979c";
//    ColorMoyen ="#598bff";
//   if(this.Vent['wind_speed']){
//   this.Vent['wind_speed']['data'].forEach(element => {
//       let a = new Date(element.time);
//     times.push(this.convert(element.time))
//     values.push(element.value)
//     if (element.mean) {
//       val_mean.push(element.mean.toFixed(2))
//     } else {
//       val_mean.push(element.mean)
//     }
  
//   });}
// } 






    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const xAxisData = [];
      const data1 = [];
      const data2 = [];
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
    
        this.options = {
          backgroundColor: echarts.bg,
          color: [Color],
          legend: {
          //   data: ['legendD','mean'],
            align: 'right',
          },
          // tooltip: {
          //   trigger: 'axis',
          //   axisPointer: {
          //     type: 'cross',
          //     label: {
          //       backgroundColor: echarts.tooltipBackgroundColor,
          //     },
          //   },
          // },
          tooltip : {
            trigger : 'axis',
            axisPointer : {
                type:'shadow'
            },
            // formatter : (params) => {
            //   return params[0].name+"<br>Pluviométrie : <b>"+params[0].data+" mm</b>  "
            // }
          },
          xAxis: {
            inverse: true,
            
            data: times,
            silent: false,
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            // min: minMesure,
            // max: maxMesure
          },
          series: [
          
           
          {
            name: 'Moyenne',
            type: 'line',
            smooth: true,
            symbol: "triangle",
            symbolSize: 3,
            lineStyle: {
              width: 3,
              type: "deshed"
             },
            itemStyle: {color: '#ffaa00'},
            data: val_mean,
          },
         
          {
            name: 'Min',
            type: 'line',
            smooth: true,
            symbol: "triangle",
            symbolSize: 3,
            lineStyle: {
            
         
            
             },
            itemStyle: {color: '#00d68F'},
            data: val_min,
          },
          {
            name: 'Max',
            type: 'line',
            symbol: "triangle",
            symbolSize: 3,
            lineStyle: {
            
            width:2
   
             },
            itemStyle: {color: '#ff3d71'},
            smooth: true,
            data: val_max,
          },
       
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx) => idx * 5,
        };
      
   

      for (let i = 0; i < 100; i++) {
        xAxisData.push('Category ' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }
    });
    
  } 
  convert(str) {
   
    
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      min = ("0" + date.getMinutes()).slice(-2);
    
    switch (mnth) {
      case "01": {
        return ["jan", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "02": {
        return ["Fev", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "03": {
        return ["Mar", day,hour ,min].join(" ");
        break;
      }
      case "04": {
        return ["Avr", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "05": {
        return ["Mai", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "06": {
        return ["Jui", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "07": {
        return ["juil", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "08": {
        return ["Aout", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "09": {
        return ["Sep", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "10": {
        return ["Oct", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "11": {
        return ["Nov", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "12": {
        return ["Dec", day,(hour + "h:" +min)].join(" ");
        break;
      }
    }}
  ngAfterViewInit() {}
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

} 

