import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleConseilsRoutingModule } from './module-conseils-routing.module';
import { ConseilsComponent } from './module-conseils.component';
import { Datepicker2Component } from './datepicker/datepicker.component';
import { SelectExp2Component } from './select-exp/select-exp.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NbCardModule, NbDatepickerModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from 'app/@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsModule } from '../charts/charts.module';
import { MapsModule } from '../maps/maps.module';
import { NouisliderModule } from 'ng2-nouislider';
import { IgxDatePickerModule } from "igniteui-angular";
import { HighchartsChartModule } from 'highcharts-angular';
import { StatusCard2Component } from './status-card/status-card.component';
import { MatIconModule } from '@angular/material/icon';
import { ChartModuleConseilsComponent } from './chart-module-conseils/chart-module-conseils.component'; 
import { TableData } from './tableData/tableData.component';
@NgModule({
  declarations: [
    ConseilsComponent,
    Datepicker2Component,
    SelectExp2Component,
    StatusCard2Component,
    ChartModuleConseilsComponent,
    TableData
  ],
  imports: [
    CommonModule,
    ModuleConseilsRoutingModule,
    HighchartsChartModule,
    NgxEchartsModule,
    NouisliderModule,
    MapsModule, 
    NbCardModule,
    ThemeModule,
    CKEditorModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbDatepickerModule,
    LeafletModule.forRoot(),
    FormsModule     ,
    GoogleMapsModule,
    ChartsModule,
    NbTabsetModule,
    IgxDatePickerModule,
    MatIconModule
  ]
})
export class ModuleConseilsModule { }
