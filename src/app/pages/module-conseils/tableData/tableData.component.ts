import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-table-data',
  styleUrls: ['./tableData.component.scss'],
  templateUrl: './tableData.component.html',
   
})

export class TableData implements OnInit ,OnChanges{

  @Input() title1: string;
  @Input() Moyenne1: string;
  @Input() Maximum1: string;
  @Input() Minimum1: string;
  @Input() Ecart_type1: string;
  @Input() title2: string;
  @Input() Moyenne2: string;
  @Input() Maximum2: string;
  @Input() Minimum2: string;
  @Input() Ecart_type2: string;
  @Input() src1: string;
  @Input() src2: string;
  @Input() type: string;
  @Input() name: string;
  
  
  @Input() on = true;

@Input() MethodeJ_Output: string;
currentMethodeJ ="P";
currentMethodeM ="T";


  ngOnChanges(){


if(this.MethodeJ_Output == 'P'){this.currentMethodeJ ="P";}
if(this.MethodeJ_Output == 'H'){this.currentMethodeJ ="H";}
if(this.MethodeJ_Output == 'B'){this.currentMethodeM ="B";}
if(this.MethodeJ_Output == 'T'){this.currentMethodeM ="T";}




  }
  ngOnInit(): void {
     //  console.log(this.src1)
  }
}
