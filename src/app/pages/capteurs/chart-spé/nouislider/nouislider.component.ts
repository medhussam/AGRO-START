import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'ngx-nouislider',
  templateUrl: './nouislider.component.html',
  styleUrls: ['./nouislider.component.scss']
})
export class NouisliderComponent implements OnInit {
  @Output() drJour = new EventEmitter<number>();
  public someValue: number = 1;
  public someStep: number = 1;
  test ;

  public someKeyboardConfig2: any = {
    behaviour: 'drag',
    connect: true,
 
    
    range: {
        min: -50,
        max: 50
    },
    pips: {
        mode: 'count',
        density: 2,
        values: 6,
        stepped: true
    },
    keyboard: true,
};
  constructor() { }

  ngOnInit(): void {
  }
  onChange(value: number) {
    this.drJour.emit(value)
  }
}
