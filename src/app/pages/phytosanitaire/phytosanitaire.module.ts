import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { IgxDatePickerModule } from 'igniteui-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PhytosanitaireRoutingModule } from './phytosanitaire-routing.module';
import { PhytosanitaireComponent } from './phytosanitaire.component';


@NgModule({
    imports: [
      PhytosanitaireRoutingModule,
      IgxDatePickerModule,
      NbButtonModule,
      NbIconModule,
      NbTabsetModule,
      Ng2SmartTableModule,
      NbSelectModule,
      NbCardModule,

      ThemeModule,
      CKEditorModule,
      FormsModule,


  ],
  declarations: [
    PhytosanitaireComponent,
    
],

})
export class PhytosanitaireModule { }
