import { Component , OnChanges, Input, OnInit, ViewChild } from "@angular/core";
import { NbThemeService } from '@nebular/theme';
import * as Highcharts from "highcharts";
import { ChartSpeComponent } from "./chart-spe/chart-spe.component";

@Component({
    selector: 'ngx-chart-cpeciaux',
    templateUrl: './chart-speciaux.component.html',
   
  })
  
  export class ChartSpeciauxComponent implements OnChanges  {
    @Input() eventPages;
    @Input() eventExploitation;
    @Input() eventCapteur;
    @Input() capData;
    @Input() rainData
    tBase = 0;
    constructor() {
    }
    @ViewChild(ChartSpeComponent) child2:ChartSpeComponent;
    ngOnChanges() {
  
    }
    showLoading2(){
      this.child2.showLoading2();
    }
    hideLoading2(){
      this.child2.hideLoading2();
    }
    drJour(event){
      this.tBase = event;
    }

  }
  