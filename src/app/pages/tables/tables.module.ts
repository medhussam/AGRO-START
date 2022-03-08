import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';

import { TsTableComponent } from './ts-table/ts-table.component';
import { HummidityTableComponent } from './hummidity-table/hummidity-table.component';
import { HSTableComponent } from './hs-table/hs-table.component';
import { LightTableComponent } from './light-table/light-table.component';
import { UltrasonicLevelTableComponent } from './ultrasonic-level-table/ultrasonic-level-table.component';
import { ConductivityTableComponent } from './conductivity-table/conductivity-table.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
   
    TsTableComponent,
    HummidityTableComponent,
    HSTableComponent,
    LightTableComponent,
    UltrasonicLevelTableComponent,
    ConductivityTableComponent,
  ],
})
export class TablesModule { }
