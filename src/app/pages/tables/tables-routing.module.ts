import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductivityTableComponent } from './conductivity-table/conductivity-table.component';
import { HSTableComponent } from './hs-table/hs-table.component';
import { HummidityTableComponent } from './hummidity-table/hummidity-table.component';
import { LightTableComponent } from './light-table/light-table.component';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './temperature/smart-table.component';

 
import { TsTableComponent } from './ts-table/ts-table.component';
import { UltrasonicLevelTableComponent } from './ultrasonic-level-table/ultrasonic-level-table.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'temperature',
      component: SmartTableComponent,
    },
    {
      path: 'TS',
      component: TsTableComponent,
    },
    {
      path: 'Hummidity',
      component: HummidityTableComponent,
    },
    {
      path: 'HS',
      component: HSTableComponent,
    },
    {
      path: 'light',
      component: LightTableComponent,
    },
    {
      path: 'ultraSonic',
      component: UltrasonicLevelTableComponent,
    },
    {
      path: 'conductivity',
      component: ConductivityTableComponent,
    },


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,

];
