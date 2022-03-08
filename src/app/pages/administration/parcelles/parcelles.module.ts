import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcellesComponent } from './parcelles.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ParcelleRoutingModule } from './parcelles.routing.module';
import { MapDrawParcelleComponent } from './map-draw-parcelle/map-draw-parcelle.component';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { ModalParcelleModule } from './addmodal-parcelle/addmodal-parcelle.module';



@NgModule({
  declarations: [ParcellesComponent,MapDrawParcelleComponent],
  imports: [
    ModalParcelleModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParcelleRoutingModule,
    RouterModule,
    LeafletModule.forRoot(),
    LeafletDrawModule,
  ]
})
export class ParcellesModule { }
