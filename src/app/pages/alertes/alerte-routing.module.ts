import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AlertesComponent } from './alertes.component';
import { MapComponent } from './Map/Map.component';



const routes: Routes = [{
    path: '',
    component: AlertesComponent,
    children: [
      {
        path: 'Map',
        component: MapComponent,
      },
  
  
    ],
 
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AlerteRoutingModule {
  }