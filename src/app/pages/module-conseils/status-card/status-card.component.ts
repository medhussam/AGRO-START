import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-status-card2',
  styleUrls: ['./status-card.component.scss'],
  
  templateUrl: './status-card.component.html',
  
})

export class StatusCard2Component {

  @Input() title1: string;
  @Input() title2: string;
  @Input() value1: string;
  @Input() value2: string
  @Input() type: string;
  @Input() src1: string;
  @Input() src2: string;
  @Input() name: string;
  @Input() statusCards: string;
  @Input() on = true;
  @Output() method = new EventEmitter(); 
currentMethodeJ ="P";
currentMethodeM ="T";

MethodeJ_Output: string = "P";  
@Output() nameEmitter = new EventEmitter <string> ();  
PostDataJ() {  
  this.nameEmitter.emit(this.currentMethodeJ);  
} 
  ChangeMethode(methode){

    if(methode == 'H'){
      this.currentMethodeJ = 'P'
      this.nameEmitter.emit(this.currentMethodeJ);  
    }
    if(methode == 'P'){
      this.currentMethodeJ = 'H'
      this.nameEmitter.emit(this.currentMethodeJ);  
    }
    if(methode == 'T'){
      this.currentMethodeM = 'B'
      this.nameEmitter.emit(this.currentMethodeM);  
    }
    if(methode == 'B'){
      this.currentMethodeM = 'T'
      this.nameEmitter.emit(this.currentMethodeM);  
    }
   
  }










} 

