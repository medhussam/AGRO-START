import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ModuleConseilsRoutingModule } from './module-conseils-routing.module';
// import { ConseilsComponent } from './module-conseils.component';
// import { Datepicker2Component } from './datepicker/datepicker.component';
// import { SelectExp2Component } from './select-exp/select-exp.component';
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
// import { StatusCard2Component } from './status-card/status-card.component';
import { MatIconModule } from '@angular/material/icon';
// import { ChartModuleConseilsComponent } from './chart-module-conseils/chart-module-conseils.component'; 
// import { TableData } from './tableData/tableData.component';
import { SimulationRoutingModule } from './simulation-routing.module'; 
import { simulationComponent } from './simulation.component'; 
import { Map1simulationComponent } from './Map-1-simulation/Map-1-simulation.component';
import { Map2simulationComponent } from './Map-2-simulation/Map-2-simulation.component';
import { StatistiquesComponent } from './Statistiques/Statistiques.component';
import { chartsimulationComponent } from './chart-simulation/chart-simulation.component';
//   import { Datepicker2Component } from './datepicker/datepicker.component';
// import { SelectExp2Component } from './select-exp/select-exp.component';
// import { StatusCard2Component } from './status-card/status-card.component';
// import { TableData } from './tableData/tableData.component';
// import { ChartModuleConseilsComponent } from './chart-module-conseils/chart-module-conseils.component';
@NgModule({
  declarations: [
    chartsimulationComponent,
    StatistiquesComponent,
    Map1simulationComponent,
    Map2simulationComponent,
    simulationComponent
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule,
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
    MatIconModule,
    
    
  ]
})
export class simulationModule { }
