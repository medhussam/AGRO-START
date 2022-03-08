import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-line',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsLineComponent implements  OnDestroy,OnChanges {
  options: any = {};
  themeSubscription: any;
  @Input() data;
  array: any[] = []
  constructor(private theme: NbThemeService) {
  }
  ngOnChanges(){
    console.log(this.data)
    this.array = this.data
    let times = [];
    let values = [];
 
    let max;
    let min;

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
            end: 40
        },
        {
            type: 'slider',
            show: false,
            yAxisIndex: [0],
            left: '90%',
            start: 40,
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
          data: ['Température (C°)' , 'Moyenne sur 24h (C°)' , 'Min sur 24h (C°)' , 'Max sur 24h (C°)'],
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
            name: 'Température (C°)',
            type: 'line',
            smooth: true,
            lineStyle: {
             width: 4,
             
            },
            itemStyle: {
              borderWidth: 7,
            color: colors.info
            },
            data: values,
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
