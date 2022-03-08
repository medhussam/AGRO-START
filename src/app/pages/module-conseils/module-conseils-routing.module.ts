import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConseilsComponent } from './module-conseils.component';

const routes: Routes = [
{
  path: '',
  component: ConseilsComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleConseilsRoutingModule { }
