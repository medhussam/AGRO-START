import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbCardModule, NbDatepickerModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { AgroMonitoringRoutingModule, routedComponents } from './agroMonitoring-routing.module';

import { MenutopComponent } from './images-satellitaire/menutop.component';
import { IgxDatePickerModule, IgxTabsModule } from 'igniteui-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { EchartNDVIComponent } from './echart-ndvi/echart-ndvi.component';
import { MapsModule } from '../maps/maps.module';
import { agroMonitoringMapComponent } from './agroMonitoringMap/agroMonitoringMap.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from '../charts/charts.module'; 
import { soil_dataMapMapComponent } from './soil_dataMap/soil_dataMap.component';
import { EchartComparParcelleComponent } from './echart-compar-parcelles/echart-compar-parcelles.component';
import { TwoChartComponent } from './two-charts/two-charts.component';

@NgModule({
  imports: [
    ThemeModule,
    GoogleMapsModule,
    LeafletModule.forRoot(),
    AgroMonitoringRoutingModule,
    NgxEchartsModule,
    NbCardModule,
    NbSelectModule,
    MapsModule,
    NbDatepickerModule,
    IgxDatePickerModule,
    IgxTabsModule,    
    HighchartsChartModule,
    CKEditorModule,
    Ng2SmartTableModule,    
    NgxChartsModule,     
    FormsModule,    
    ChartsModule,
    NbTabsetModule,
     
  ],
  
  exports: [],
  declarations: [
    agroMonitoringMapComponent,
    EchartNDVIComponent,
    soil_dataMapMapComponent,
    EchartComparParcelleComponent,
    TwoChartComponent,
    ...routedComponents, 
  ],
})
export class agroMonitoringModule { }
