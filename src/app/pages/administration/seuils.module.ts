import { NgModule } from '@angular/core';

import { SeuilsComponent } from './seuils/seuils.component';
import { SeuilsRoutingModule } from './seuils/seuils-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CompteComponent } from './compte/compte.component';
import { PopupPasswordComponent } from './popup-password/popup-password.component';
import { PopupCompteComponent } from './popup-compte/popup-compte.component'; 






 

@NgModule({
  imports: [
    CommonModule,
    SeuilsRoutingModule,
    NbSelectModule,
    Ng2SmartTableModule,    
    FormsModule,    
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    
  ],
  declarations: [
    SeuilsComponent,
    PopupFormComponent,
    AdminDashboardComponent,
    CompteComponent,
    PopupPasswordComponent,
    PopupCompteComponent,
    

],
entryComponents: [
  // PopupFormComponent
  ]
})
export class SeuilsModule { }
