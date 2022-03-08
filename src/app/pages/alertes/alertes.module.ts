import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NbButtonComponent, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from 'app/@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsModule } from '../charts/charts.module';
import { MapsModule } from '../maps/maps.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { IgxDatePickerModule } from "igniteui-angular";


import { AlertesComponent } from './alertes.component';
import { AlerteRoutingModule } from './alerte-routing.module';
import { MapComponent } from './Map/Map.component'; 
import { ButtonViewComponent } from './button-view/button-view.component';
import { Datepicker2Component } from './datepicker2/datepicker2.component';

@NgModule({
  imports: [
    HighchartsChartModule,
    NgxEchartsModule,
    AlerteRoutingModule,
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
    LeafletModule,
    IgxDatePickerModule,
    NbButtonModule,
    NbIconModule,
  ],
  declarations: [
    
    AlertesComponent,
    ButtonViewComponent,
    MapComponent,
    Datepicker2Component,
    
    
    
],
})
export class AlertesModule { }
