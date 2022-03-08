import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar-animation',
  template: `
    <div echarts [options]="options" class="echart echartLIGHT"></div>
  `,
})
export class EchartsBarAnimationComponent implements AfterViewInit, OnDestroy,OnInit, OnChanges {
  options: any = {};
  themeSubscription: any;
  
  @Input() humidity;
  @Input() luminosite;
  @Input() UV;
  @Input() Vent;
  array: any[] = []
  constructor(private theme: NbThemeService) {}
  ngOnInit(){}
  ngOnChanges() {
    let legendD ;
    let typeOfChart;
    let mean;
    let times = [];
    let values = [];
    let val_mean = [];
    let minMesure :any;
    let maxMesure :any;
    let Color ="#598bff";
    let ColorMoyen ="#ffaa00";



    if (this.humidity) {
      legendD = 'Humidité (%)';
      mean = 'Moyenne journalière '
      typeOfChart = 'bar';
      minMesure = 10;
      maxMesure = 100;
      if(this.humidity['humidity']){
      this.humidity['humidity']['data'].forEach(element => {
        times.push(this.convert(element.time))
        values.push(element.value)
       if(element.mean){val_mean.push(element.mean.toFixed(2))} 
      });}
}
if (this.luminosite) {
  legendD = 'Luminosite (lux)';
  mean = 'Moyenne journalière '
  typeOfChart = 'bar';
   Color ="#ffc94d";
   ColorMoyen ="#598bff";
  if(this.luminosite['light']){
  this.luminosite['light']['data'].forEach(element => {
      let a = new Date(element.time);
    times.push(this.convert(element.time))
    values.push(element.value)
    if (element.mean) {
      val_mean.push(element.mean.toFixed(2))
    } else {
      val_mean.push(element.mean)
    }
  
  });}
} 


if (this.UV) {
  legendD = 'UV';
  mean = 'Moyenne journalière '
  typeOfChart = 'bar';
   Color ="#6f42c1a1";
   ColorMoyen ="#598bff";
  if(this.UV['uv']){
  this.UV['uv']['data'].forEach(element => {
      let a = new Date(element.time);
    times.push(this.convert(element.time))
    values.push(element.value)
    if (element.mean) {
      val_mean.push(element.mean.toFixed(2))
    } else {
      val_mean.push(element.mean)
    }
  
  });}
} 



if (this.Vent) {
  legendD = 'Vent';
  mean = 'Moyenne journalière '
  typeOfChart = 'bar';
   Color ="#20c9979c";
   ColorMoyen ="#598bff";
  if(this.Vent['wind_speed']){
  this.Vent['wind_speed']['data'].forEach(element => {
      let a = new Date(element.time);
    times.push(this.convert(element.time))
    values.push(element.value)
    if (element.mean) {
      val_mean.push(element.mean.toFixed(2))
    } else {
      val_mean.push(element.mean)
    }
  
  });}
} 






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
            data: [legendD,mean],
            align: 'right',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: echarts.tooltipBackgroundColor,
              },
            },
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
            min: minMesure,
            max: maxMesure
          },
          series: [
          
            {
              name: legendD,
              type: typeOfChart,
              data: values,
              animationDelay: (idx) => idx * 10,
            },
            {
              name: mean,
              type: 'line',
              smooth: true,
              symbol: "triangle",
              symbolSize: 3,
              lineStyle: {
              
                width: 2
               },
              itemStyle: {color: ColorMoyen},
              data: val_mean,
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
        return ["Feb", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "03": {
        return ["mar", day,hour ,min].join(" ");
        break;
      }
      case "04": {
        return ["apr", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "05": {
        return ["may", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "06": {
        return ["jun", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "07": {
        return ["jul", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "08": {
        return ["aug", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "09": {
        return ["sep", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "10": {
        return ["oct", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "11": {
        return ["nov", day,(hour + "h:" +min)].join(" ");
        break;
      }
      case "12": {
        return ["dec", day,(hour + "h:" +min)].join(" ");
        break;
      }
    }}
  ngAfterViewInit() {}
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}


