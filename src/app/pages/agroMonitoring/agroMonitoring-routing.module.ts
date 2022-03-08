import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgroMonitoringComponent } from './agroMonitoring.component';
import { EchartComparParcelleComponent } from './echart-compar-parcelles/echart-compar-parcelles.component';
 
import { MenutopComponent } from './images-satellitaire/menutop.component';
import { SoilDataComponent } from './soil_data/soil_data.component';
import { soil_dataMapMapComponent } from './soil_dataMap/soil_dataMap.component';
import { TwoChartComponent } from './two-charts/two-charts.component';


const routes: Routes = [{
  path: '',
  component: AgroMonitoringComponent,
  children: [ {
    path: 'Monitoring',
    component: MenutopComponent,
  },{
    path: 'soilData',
    component: SoilDataComponent,
  }, ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  AgroMonitoringRoutingModule { }

export const routedComponents = [
  AgroMonitoringComponent,
  MenutopComponent,
  SoilDataComponent,
  soil_dataMapMapComponent,
  TwoChartComponent,
  EchartComparParcelleComponent
];
