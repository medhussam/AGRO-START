import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'; 
import { CompteComponent } from './compte.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
// import { SeuilsComponent } from './seuils/seuils.component';




const routes: Routes = [{
    path: '',
    //component: AdminDashboardComponent,
    children: [
      {
        path: 'compte',
        component: CompteComponent,
      },
       {
        path: 'Dashboard',
        component: AdminDashboardComponent,
      },
  
  
    ],
 
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CompteRoutingModule {
  }