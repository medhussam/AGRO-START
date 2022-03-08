import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { simulationComponent } from './simulation.component';

const routes: Routes = [
{
  path: '',
  component: simulationComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationRoutingModule { }
