import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'; 
import { PhytosanitaireComponent } from './phytosanitaire.component';


const routes: Routes = [{
    path: '',
    component: PhytosanitaireComponent,
    children: [
      {
        path: 'phytosanitaire',
        component: PhytosanitaireComponent,
      },
  
  
    ],
 
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PhytosanitaireRoutingModule {
  }