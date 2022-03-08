import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-statistiques',
  styleUrls: ['./Statistiques.component.scss'],
  
  templateUrl: './Statistiques.component.html',
  
})


export class StatistiquesComponent implements OnInit ,OnChanges {

  @Input() Statistics;
  @Input()   DateFromMap1
  @Input()   DateFromMap2
;



  array: any[] = []


    times :any;
   
    val_min ="--,--";
    val_max ="--,--";
    val_mean = "--,--";

    
    times_1 :any;
   
    val_min_1 ="--,--";
    val_max_1 ="--,--";
    val_mean_1 = "--,--";
  ngOnInit(){}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(this.DateFromMap1 == 'null'){
      this.DateFromMap1 = this.Statistics[1].time;
    }
    if(this.DateFromMap2 == 'null'){
      this.DateFromMap2 = this.Statistics[0].time;
    }


  if (this.Statistics) {
    
    // this.Statistics.forEach(element => {
     
      this.times = this.convert(this.Statistics[0].time)
       
      this.val_mean = this.Statistics[0].mean.toFixed(2)
      this.val_min = this.Statistics[0].min.toFixed(2)
      this.val_max = this.Statistics[0].max.toFixed(2)

      this.times_1 = this.convert(this.Statistics[1].time)
       
      this.val_mean_1 = this.Statistics[1].mean.toFixed(2)
      this.val_min_1 = this.Statistics[1].min.toFixed(2)
      this.val_max_1 = this.Statistics[1].max.toFixed(2)




    // });
  // }
}












}











convert(str) {
   
  var date = new Date(str),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2),
  year_ = date.getFullYear()
switch (mnth) {
  case "01": {
    return [day,"Janvier ",year_].join(" ");
    break;
  }
  case "02": {
    return [day,"Février ",year_].join(" ");
    break;
  }
  case "03": {
    return [day,"Mars ",year_].join(" ");
    break;
  }
  case "04": {
    return [day,"Avril ",year_].join(" ");
    break;
  }
  case "05": {
    return [day,"Mai ",year_].join(" ");
    break;
  }
  case "06": {
    return [day,"Juin ",year_].join(" ");
    break;
  }
  case "07": {
    return [day,"Juillet ",year_].join(" ");
    break;
  }
  case "08": {
    return [day,"Août ",year_].join(" ");
    break;
  }
  case "09": {
    return [day,"Septembre ",year_].join(" ");
    break;
  }
  case "10": {
    return [day,"Octobre ",year_].join(" ");
    break;
  }
  case "11": {
    return [day,"Novembre ",year_].join(" ");
    break;
  }
  case "12": {
    return [day,"Décembre",year_].join(" ");
    break;
  }
}}
}