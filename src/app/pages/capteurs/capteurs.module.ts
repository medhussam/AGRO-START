import { NgModule } from '@angular/core';
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
import { CapteurRoutingModule } from './capteur-routing.module';
import { CapteursComponent } from './capteurs.component';
import { NouisliderModule } from 'ng2-nouislider';
import { ChartCroissanceComponent } from './chart-croissance/chart-croissance.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { chartCap } from './tem/chart-cap.component';
import { IgxDatePickerModule } from "igniteui-angular";

import { SelectPagesComponent } from './select-pages/select-pages.component';
import { SelectExpComponent } from './select-exp/select-exp.component';
import { DataGridComponent } from './dataGrid/data-grid.component';
import { MultipYAxisComponent } from './multip-y-axis/multip-y-axis.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NouisliderComponent } from './chart-spé/nouislider/nouislider.component';
import { ChartSpeciauxComponent } from './chart-spé/chart-speciaux.component';

import { ChartSpeComponent } from './chart-spé/chart-spe/chart-spe.component';
import { UviAndLightComponent } from './uviAndLight/uviandLight.component';
import { NoCapteurComponent } from './no-capteur/no-capteur.component';

@NgModule({
  imports: [
    HighchartsChartModule,
    NgxEchartsModule,
    NouisliderModule,
    CapteurRoutingModule,
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

  ],
  declarations: [
    MultipYAxisComponent,
    DataGridComponent,
    CapteursComponent,
    ChartCroissanceComponent,
    chartCap,
    DatepickerComponent,
    NouisliderComponent,
    SelectPagesComponent,
    NoCapteurComponent,
    SelectExpComponent,
    ChartSpeciauxComponent,
    ChartSpeComponent,
    UviAndLightComponent,
    NoCapteurComponent
],
})
export class CapteursModule { }
