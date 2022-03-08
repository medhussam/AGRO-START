import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';

import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AlertesModule } from './alertes/alertes.module';
import { PhytosanitaireModule } from './phytosanitaire/phytosanitaire.module';
import { InfosDashboardComponent } from './infosUtiles/infos-dashboard/infos-dashboard.component';
import { BarrageComponent } from './infosUtiles/barrage/barrage.component';
import { MarcheComponent } from './infosUtiles/marche/marche.component';
// import { InfosUtilesModule } from './infos-utiles/infos-utiles.module';
// import { InfosUtilesComponent } from './infos-utiles/infos-utiles.component';
// import { BarragesComponent } from './infos-utiles/barrages/barrages.component';
// import { MarchesComponent } from './infos-utiles/marches/marches.component';
// import { PhytoComponent } from './infos-utiles/phyto/phyto.component';
// import { SeuilsComponent } from './administration/seuils/seuils.component';




@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbIconModule,
    AlertesModule,
    PhytosanitaireModule,
    MiscellaneousModule,
    // InfosUtilesModule
    // SeuilsComponent

    //SimulationModule,

  ],
  declarations: [
    PagesComponent,


  ],
})
export class PagesModule {
}
