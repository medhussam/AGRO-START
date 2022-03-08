import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart echartTPie" style="width: 350px;height:400px !important;bottom: 0px;
    top: -14px;
    margin-bottom: -92px;
    margin-top: 0;
    left: -20px;"></div>
  `,
})
export class EchartsPieComponent implements OnChanges, OnDestroy {
  options: any = {};
  themeSubscription: any;
  @Input() lastElementTemperature;
  @Input() idcaptemm
  @Input() TypeT
  constructor(private theme: NbThemeService) {}
  ngOnChanges() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
       width: 320,
        tooltip: {
            formatter: 'Température <br/>{c} C°'
        },
        
        series: [
            {
              min : -5,
              max : 45,
                name: 'Temperature C°',
                type: 'gauge',
                  axisLine: {
            lineStyle: {
                width: 20,
                color: [
                    [0.2, '#0095ff'],
                    [0.7, '#41cc5d'],
                    [1, '#ff3d71']
                ]
            }
        },
                detail: { size:12 ,formatter: '{value} C°'},
                data: [{value: this.lastElementTemperature, name: 
                  this.TypeT != "externe"? this.idcaptemm 
                  : 'Capteur Externe'}]
            }
        ]
    };
    
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
