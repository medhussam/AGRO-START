import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { CapteursComponent } from './capteurs/capteurs.component';
 

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

     {
      path: 'cap',
      component: CapteursComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    
   {
      path: 'Agro-monitoring',
      loadChildren: () => import('./agroMonitoring/agroMonitoring.module')
        .then(m => m.agroMonitoringModule),
    }, 
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },

    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    // {
    //   path: 'InformationUtiles',
    //   loadChildren: () => import('./informationUtiles/informationUtiles-routing.module')
    //     .then(m => m.InformationUtilesRoutingModule),
    // },
    {
      path: 'InformationUtiles',
      loadChildren: () => import('./infosUtiles/info-utiles.module')
        .then(m => m.InfoUtilesModule),
    },
     {
       path: 'capteurs',
       loadChildren: () => import('./capteurs/capteurs.module')
         .then(m => m.CapteursModule),
     },
     {
      path: 'phytosanitaire',
      loadChildren: () => import('./phytosanitaire/phytosanitaire.module')
        .then(m => m.PhytosanitaireModule),
    },
     {  
      path: 'alertes',
      loadChildren: () => import('./alertes/alertes.module')
        .then(m => m.AlertesModule),
    },
    
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'evapo',
      loadChildren: () => import('./module-conseils/module-conseils.module')
        .then(m => m.ModuleConseilsModule),
    },
    {
      path: 'evapoSim',
      loadChildren: () => import('./Simulation/simulation.module')
        .then(m => m.simulationModule),
    },
    {  
      path: 'Adminstrator',
      loadChildren: () => import('./administration/seuils.module')
        .then(m => m.SeuilsModule),
    },
    
    {
      path: '',
      redirectTo: 'iot-dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}