import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarrageComponent } from './barrage/barrage.component';
import { MarcheComponent } from './marche/marche.component';
import { BarrageRoutingModule } from './barrage/barrage-routing.module';
import { InfosDashboardComponent } from './infos-dashboard/infos-dashboard.component';
import { PhytoComponent } from './phyto/phyto.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from '../charts/charts.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineChartBComponent } from './line-chart-b/line-chart-b.component';
import { Datepicker1Component } from './datepicker/datepicker.component';
import { IgxDatePickerModule } from "igniteui-angular";
import { HistorychartComponent } from './historychart/historychart.component';

@NgModule({

  imports: [
    CommonModule,
    BarrageRoutingModule,
    NbCardModule,
    NgxChartsModule,
    Ng2SmartTableModule,
    NbSelectModule,
    ChartsModule,
    HighchartsChartModule,
    NbTabsetModule,
    IgxDatePickerModule,

  ],
  declarations: [
    BarrageComponent,
    MarcheComponent,
    InfosDashboardComponent,
    PhytoComponent,
    LineChartComponent,
    LineChartBComponent,
    Datepicker1Component,
    HistorychartComponent
  ],
})
export class InfoUtilesModule { }
