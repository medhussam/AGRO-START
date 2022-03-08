import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'; 
import { SeuilsComponent } from './seuils.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { CompteComponent } from '../compte/compte.component';





const routes: Routes = [{
    path: '',
    children: [
      {
        path: 'seuils',
        component: SeuilsComponent,
      },
       {
        path: 'Dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'compte',
        component: CompteComponent,
      },
      {
        path: 'exploitation',
        loadChildren: ()=> import('../exploitations/exploitations.module').then(m => m.ExploitationsModule)
      },
      {
        path: 'parcelle',
        loadChildren: ()=> import('../parcelles/parcelles.module').then(m => m.ParcellesModule)
      },
  
  
    ],
 
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class SeuilsRoutingModule {
  }