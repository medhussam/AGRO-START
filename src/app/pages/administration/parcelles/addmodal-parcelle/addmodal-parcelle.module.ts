import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NbSelectModule } from "@nebular/theme";
import { IgxDatePickerModule } from "igniteui-angular";
import { AddmodalParcelleComponent } from "./addmodal-parcelle.component";


@NgModule({
    imports: [CommonModule,NbSelectModule,FormsModule,IgxDatePickerModule],
    declarations: [AddmodalParcelleComponent],
    exports: [AddmodalParcelleComponent]
})
export class ModalParcelleModule { }