import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AlertesService } from 'app/_services/alertes.service';


@Component({
  selector: 'ngx-echarts-pie-alert',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieCopyComponent implements AfterViewInit, OnDestroy ,OnChanges{
  options: any = {};
  themeSubscription: any;
  datalevels : any[] = [];
  datatypes : any[] = [];

  @Input() dataLevel :any[];
  @Input() dataDanger;
  @Input() dataWarning;
  @Input() dataOk;

  @Input() labelDanger;
  @Input() labelWarning;
  @Input() labelOk;

   myDATA :any
  constructor(private theme: NbThemeService,private alerteService: AlertesService) {

  }


  ngOnChanges(){
      
  this.myDATA = [
    { value: this.dataDanger, name: this.labelDanger },
    { value: this.dataWarning, name: this.labelWarning },
    { value: this.dataOk, name: this.labelOk },

  ] 


    
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const red =  "rgb(248 78 78)" 
      const green = "#6cc56c"
      const yellow = "#f8db4e"
      const colors = config.variables;
      const echarts: any = config.variables.echarts;
      this.options = {
        backgroundColor: echarts.bg,
        border : '10px',
       
        color: [ red , yellow, green, colors.infoLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [this.labelDanger, this.labelWarning, this.labelOk],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Alertes',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.myDATA,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}