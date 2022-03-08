import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { MapDrawParcelleComponent } from "./map-draw-parcelle/map-draw-parcelle.component";
import { ParcellesComponent } from "./parcelles.component";

const routes: Routes = [{
    path: '',
    component: ParcellesComponent },
  {
    path: 'add/:id',
    component: MapDrawParcelleComponent
  },
  // {
  //   path: 'addParcelle',
  //   component: DrawParcelleComponent
  // },
  // {
  //   path: 'exploitation',
  //   component: ExploitationsComponent },
  ];

@NgModule({
  // declarations: [AdminDashboardComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ParcelleRoutingModule {
  }