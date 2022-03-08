import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ExploitationService } from 'app/_services/exploitation.service';

@Component({
  selector: 'ngx-select-exp2',
  templateUrl: './select-exp.component.html',
  styleUrls: ['./select-exp.component.scss']
})
export class SelectExp2Component implements OnInit,OnChanges {
  @Input() exploitation;
  @Input() selectedValue;
  



  @Output() expSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
   
  }
  changeExploitation(event) {
      this.expSelected.emit(event)
  }
  ngOnChanges() {

  }

}
