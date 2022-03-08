import { Component, ElementRef, OnInit, Output,EventEmitter } from '@angular/core';
import { CapteureService } from 'app/_services/dashboardcapteure.service';
import { IgxOverlayService } from "igniteui-angular";
@Component({
  selector: 'ngx-datepicker2',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class Datepicker2Component implements OnInit {
  public dateDebut: Date = new Date();
  public dateFin: Date = new Date();

  // public dateDebut: Date;
  // public dateFin: Date;
  @Output() dateFrom = new EventEmitter<Date>();
  @Output() dateTo = new EventEmitter<Date>();
constructor(public element: ElementRef,private overlayService: IgxOverlayService,private capteursService : CapteureService,){}
  private dayFormatter = new Intl.DateTimeFormat("fr", { weekday: "long" });
  private monthFormatter = new Intl.DateTimeFormat("fr", { month: "long" });
  public formatterFrom = (date: Date) => {
    // this.selectedDate = ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`
    // // debugger
    // //  this.dateFrom.emit(date)
    return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  public formatterTo = (date: Date) => {
    //  this.dateTo.emit(date)
    return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  selectionFrom(event) {
    this.dateFrom.emit(event)

  }
  selectionTo(event) {
    this.dateTo.emit(event)
  }
  ngOnInit(): void {
    this.dateDebut.setDate(this.dateDebut.getDate() - 4)

  }


}
