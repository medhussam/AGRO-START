import { Component, AfterViewInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-multiple-xaxis',
  template: `
    <div echarts [options]="options" class="echart echartT"></div>

   
  `,
})
export class EchartsMultipleXaxisComponent implements  OnDestroy,OnChanges {
  options: any = {};
  themeSubscription: any;
  @Input() temperature;
  @Input() listT;
  @Input() listH;
  @Input() listL;
  array: any[] = []
  constructor(private theme: NbThemeService) {
  }
  ngOnChanges(){
    this.array = this.temperature
    let times = [];
    let timesM = [];
    let values = [];
    let val_mean = [];
    let val_min = [];
    let val_max = [];
    let max;
    let min;
   
    
//console.log(this.array['temperature']['data']);

    if(this.array['temperature']){



    this.array['temperature']['data'].forEach(element => {

    //  console.log(element);
    if(element.time){  times.push(this.convert(element.time))}
    if(element.value){ values.push(element.value.toFixed(2))}
    if(element.mean){ val_mean.push(element.mean.toFixed(2))}
    if(element.min){ val_min.push(element.min.toFixed(2))}
    if(element.max){  val_max.push(element.max.toFixed(2))}
    
     
     
   
  
});
}
      max = this.getArrayMax(val_max);
      min = this.getArrayMin(val_min);
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: echarts.tooltipBackgroundColor,
            },
          },
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            start: 0,
            end: 100
        },
        {
            type: 'slider',
            show: false,
            yAxisIndex: [0],
            left: '90%',
            start: 0,
            end: 100
        },
        {
            type: 'inside',
     
            xAxisIndex: [0],
            top: '60%',
            start: 40,
            end: 50
        },
        {
            type: 'inside',
     
            yAxisIndex: [0],
            start: 40,
            end: 50
        }
        ],
        legend: {
          data: ['Température (C°)' , 'Moyenne journalière (C°)' , 'Min journalièr (C°)' , 'Max journalièr (C°)'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        //etirement / stretching
        grid: {
          top: 50,
          bottom: 20,
          left: 70,
          right: 70
        },
        xAxis: [
          {
           
            inverse: true,
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            splitLine: {
              show: true,
              
              interval : function(param) {
                return param % 2 === 0;
            },
              lineStyle: {
                color: echarts.splitLineColor,
              }
              },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
           
            data: times
          },
       
         
        ],
        yAxis: [
          {
            min: min ,
            max: max ,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,

              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
              series: [
          {
            name: 'Moyenne journalière (C°)',
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
            name: 'Température (C°)',
            type: 'line',
            smooth: true,
            lineStyle: {
             width: 4,
             
            },
            itemStyle: {
              borderWidth: 7,
            color: "#0095ff"
            },
            data: values,
          },
          {
            name: 'Min journalièr (C°)',
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
            name: 'Max journalièr (C°)',
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
      };
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
        return ["mar",day,(hour + "h:" +min)].join(" ");
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
    getArrayMax(array){
      return Math.max.apply(null, array);
    }
    getArrayMin(array){
      return Math.min.apply(null, array);
    }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}