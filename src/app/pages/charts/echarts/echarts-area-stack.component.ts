import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-area-stack',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsAreaStackComponent implements AfterViewInit, OnDestroy,OnChanges {
  options: any = {};
  themeSubscription: any;
  @Input() temperature;
  @Input() humidity;
  @Input() luminosite
  array: any[] = []
  constructor(private theme: NbThemeService) {
  }
  ngOnChanges(){
    this.array = this.temperature
    let times = [];
    let values = [];
    let val_mean = [];
    let val_min = [];
    let val_max = [];
    this.array['value'].forEach(element => {
      times.push(this.convert(element.time))
      values.push(element.value)
      val_mean.push(element.mean)
    val_min.push(element.min)
    val_max.push(element.max)
});


this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

  const colors: any = config.variables;
  const echarts: any = config.variables.echarts;

  this.options = {
    backgroundColor: echarts.bg,
    color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: echarts.tooltipBackgroundColor,
        },
      },
    },
    toolbox: {     show: true,
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
      }},
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 1,
        end: 100
    },
    {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '100%',
        start: 1,
        end: 100
    },
    {
        type: 'inside',
        xAxisIndex: [0],
        top: '100%',
        start: 1,
        end: 100
    },
    {
        type: 'inside',
        yAxisIndex: [0],
        start: 1,
        end: 100
    }
    ],
    legend: {
      data: ['temperature', 'mean', 'min', 'max'],
      textStyle: {
        color: echarts.textColor,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
     
      {
        
        inverse: true,
        type: 'category',
        boundaryGap: false,
        data: times,
       
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: echarts.axisLineColor,
          },
        },
        
        axisLabel: {
          textStyle: {
            color: echarts.textColor,
          },
        },
      },
   

    
    ],
    yAxis: [
      {
        type: 'value',
        min: 15,
        max: 30,
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
        name: 'mean',
        type: 'line',
        areaStyle: { normal: { opacity: echarts.areaOpacity } },
        data: val_mean,
      },
      {
        name: 'max',
        type: 'line',
        areaStyle: { normal: { opacity: echarts.areaOpacity } },
        data: val_max,
      },
      {
        name: 'min',
        type: 'line',
        areaStyle: { normal: { opacity: echarts.areaOpacity } },
        data: val_min,
      },
      {
        name: 'temperature',
        type: 'line',
        areaStyle: { normal: { opacity: echarts.areaOpacity } },
        data: values,
      },
      
    ],
  };
});
  }
  ngAfterViewInit() {

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
        return ["mar", day,(hour + "h:" +min)].join(" ");
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
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
