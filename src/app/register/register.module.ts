import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbCheckboxModule, NbStepperModule } from '@nebular/theme';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
    ,NbStepperModule,
    NbCheckboxModule,
    NbCardModule
      ],
    
  exports: [
    RegisterComponent
  ],
})
export class RegisterModule { }
