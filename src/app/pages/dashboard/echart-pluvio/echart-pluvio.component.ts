import { trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BarrageService } from 'app/_services/barrage.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ngx-echart-pluvio',
  template: `


<p class="legend_plu">Historiques de la pluviométrie cumulé sur 24h </p>
<div echarts [options]="options" class="echart echartpluv"></div>
 

  `,
})
export class EchartPluvioComponent implements OnInit ,OnChanges {
 
  @Input() data;


  
convert(str) {
   
 
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    hour = ("0" + date.getHours()).slice(-2),
    min = ("0" + date.getMinutes()).slice(-2),
     year = (date.getFullYear());

  switch (mnth) {
    case "01": {
      return [ day,"Jan",year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "02": {
      return [ day,"Fév",year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "03": {
      return [ day,"Mar",year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "04": {
      return [ day,"Apr", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "05": {
      return [ day,"May", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "06": {
      return [ day,"Jun", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "07": {
      return [ day,"Jul", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "08": {
      return [ day,"Aout", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "09": {
      return [ day,"Sep", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "10": {
      return [ day,"Oct", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "11": {
      return [ day,"Nov", year,(hour + "h:" +min)].join(" ");
      break;
    }
    case "12": {
      return ["Déc", day,(hour + "h:" +min)].join(" ");
      break;
    }
  }}




options: any = {};
themeSubscription: any;

constructor(private theme: NbThemeService) {
}
  ngOnInit()  {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    let name;
        let values = [];
        let times = [];
      
      
      //  console.log(this.data)
         this.data['rain']['data'].map(element => {
        times.push(this.convert(element.time))
        values.push(element.mean)
        name = element
        //console.log(element)

    });
     
      setTimeout(() => {
        
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const xAxisData = [];
          const data1 = [];
          const data2 = [];
      
          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;
      
          this.options = {
            tooltip : {
              trigger : 'axis',
              axisPointer : {
                  type:'shadow'
              },
              formatter : (params) => {
                return params[0].name+"<br>Pluviométrie : <b>"+params[0].data+" mm</b>  "
              }
            },
            backgroundColor: echarts.bg,
            color: [colors.primaryLight, colors.infoLight],
            legend: {
              data: ['PLuviométrie (mm) cumulée sur 24h '],
              align: 'left',
              textStyle: {
                color: echarts.textColor,
              },
            },
            xAxis: [
              {
                data: times,
                silent: true,
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
                min : 0,
               
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
                name: 'Pluviométrie',
                type: 'bar',
                data: values,
                animationDelay: idx => idx * 10,
              },
              
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: idx => idx * 5,
          };
      
          
        });
    
     }, 1000);
  }

ngAfterViewInit() {
  
}

ngOnDestroy(): void {
 // this.themeSubscription.unsubscribe();
}

}
