import { NgModule } from '@angular/core';

import {  NbActionsModule,  NbButtonModule,  NbCardModule,  NbTabsetModule,  NbUserModule,  NbRadioModule,  NbSelectModule,
  NbListModule,  NbIconModule,  NbCheckboxModule,  NbDatepickerModule,  NbInputModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts'; 
import { MapsModule} from '.././maps/maps.module'; 
import { LeafletModule } from '@asymmetrik/ngx-leaflet'; 
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component'; 
import { StatusCardComponent } from './status-card/status-card.component'; 
import { NgCircleProgressModule } from 'ng-circle-progress'; 
import { TemperatureComponent } from './card-capteur/temperature.component'; 
import { FormsModule } from '@angular/forms'; 
import { ChartsModule } from '../charts/charts.module'; 
import { MatIconModule } from '@angular/material/icon'; 
import { ChartsRoutingModule } from '../charts/charts-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import {GalleryModule} from 'ng-gallery' 
import { NewsComponent } from './news/news.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
 import { HighchartsChartModule } from 'highcharts-angular'; 
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { EchartPluvioComponent } from './echart-pluvio/echart-pluvio.component';
import { ChartsAndPrevisionsComponent } from './charts-and-previsions/charts-and-previsions.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    TranslateModule,
    NbCheckboxModule,
    NbDatepickerModule, 
    NbInputModule, 
    GalleryModule,
    ChartsRoutingModule, 
    NgxChartsModule,
    ChartModule,
    HighchartsChartModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule, 
    MapsModule,
    LeafletModule.forRoot(),
    ChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300 
      })
    ],
    declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureComponent, 
    ChartsAndPrevisionsComponent,
    EchartPluvioComponent,
    NewsComponent,
    ChartsAndPrevisionsComponent,
  ],
  providers: [],
})

export class DashboardModule { }
