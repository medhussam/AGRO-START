import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'; 
import { BarrageComponent } from './barrage.component';
import { InfosDashboardComponent } from '../infos-dashboard/infos-dashboard.component';
import { MarcheComponent } from '../marche/marche.component';
import { PhytoComponent } from '../phyto/phyto.component';




const routes: Routes = [{
    path: '',
    children: [
       {
        path: 'Dashboard',
        component: InfosDashboardComponent,
      },
      {
        path: 'Barrage',
        component: BarrageComponent,
      },
      {
        path: 'Marche',
        component: MarcheComponent,
      },
      {
        path: 'Phyto',
        component: PhytoComponent,
      },
  
  
  
    ],
 
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class BarrageRoutingModule {
  }