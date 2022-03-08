import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ExploitationService } from 'app/_services/exploitation.service';

@Component({
  selector: 'ngx-select-exp',
  templateUrl: './select-exp.component.html',
  styleUrls: ['./select-exp.component.scss']
})
export class SelectExpComponent implements OnInit,OnChanges {
  @Output() expSelected = new EventEmitter<string>();
  @Input() eventexpSelected;
  constructor(private serviceExp:ExploitationService) { }
  exploitation: any[] = []
  ngOnInit(): void {
    this.getExp();
  }
  changeExploitation(event) {
      this.expSelected.emit(event)
  }
  ngOnChanges() {

  }
  getExp() {
    this.serviceExp.getExploitations().subscribe((element)=> {
      element.features.forEach(element => {
        this.exploitation.push(element)
      });
    })
  }
}
