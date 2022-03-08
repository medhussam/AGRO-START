import { Component, ElementRef, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { CapteureService } from 'app/_services/dashboardcapteure.service';
import { IgxOverlayService } from "igniteui-angular";
@Component({
  selector: 'ngx-datepicker1',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class Datepicker1Component implements OnInit {
  public dateFin: Date = new Date();

  @Input() dateDebut;
  @Output() dateFrom = new EventEmitter<Date>();
  @Output() dateTo = new EventEmitter<Date>();
constructor(public element: ElementRef,private overlayService: IgxOverlayService,private capteursService : CapteureService,){}
  private dayFormatter = new Intl.DateTimeFormat("fr", { weekday: "long" });
  private monthFormatter = new Intl.DateTimeFormat("fr", { month: "long" });
  public formatterFrom = (date: Date) => {
    return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  public formatterTo = (date: Date) => {
    return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  selectionFrom(event) {
    this.dateFrom.emit(event)
  }
  selectionTo(event) {
    this.dateTo.emit(event)
  }
  ngOnInit(): void {

  }


}
