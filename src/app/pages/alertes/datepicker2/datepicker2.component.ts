import { Component, ElementRef, OnInit, Output,EventEmitter } from '@angular/core';

import { IgxOverlayService } from "igniteui-angular";
@Component({
  selector: 'ngx-datepicker2',
  templateUrl: './datepicker2.component.html',
  styleUrls: ['./datepicker2.component.scss']
})
export class Datepicker2Component implements OnInit {
  public dateDebut: Date = new Date();
  public Datedebut__ = new Date();
  
  public dateFin: Date = new Date(Date.now());
  @Output() dateFrom = new EventEmitter<Date>();
  @Output() dateTo = new EventEmitter();
constructor(public element: ElementRef,private overlayService: IgxOverlayService){}
  private dayFormatter = new Intl.DateTimeFormat("fr", { weekday: "long" });
  private monthFormatter = new Intl.DateTimeFormat("fr", { month: "long" });
  
  public formatterFrom = (date: Date) => {
    return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
    
  }
  public formatterTo = (date: Date) => {
    return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
    
  }

  ngOnInit(): void {
    this.Datedebut__.setMonth(this.dateDebut.getMonth() - 2);
  }
  selectTo(event){
this.dateTo.emit(event)
  }
  selectFrom(event){
    this.dateFrom.emit(event)
  }
}

