import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CapteursComponent } from './capteurs.component';



const routes: Routes = [{
    path: '',
    component: CapteursComponent,
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CapteurRoutingModule {
  }