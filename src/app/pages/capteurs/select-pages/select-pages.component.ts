import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-select-pages',
  templateUrl: './select-pages.component.html',
  styleUrls: ['./select-pages.component.scss']
})
export class SelectPagesComponent implements OnInit , OnChanges {
  @Input() data;
 

  @Output() pageSelected = new EventEmitter<string>();
   pages: any[];



  selectPage(value: string) {
    this.pageSelected.emit(value);
  }

  disable(mesure) {

    let d = true;
   for(let i = 0; i < this.data.length; i++){
     if (this.data[i] == mesure) {

       return false
     } 
   }
   return d
  }
  constructor() {}
  
  ngOnChanges() {

  }
  ngOnInit(): void {
  
      this.pages = [
        { value: "temperature",name:"Température"},
        { value: "light",name:"Luminosité"},
        { value: "soil_conductivity",name:"Conductivité du sol"},
        { value: "soil_temperature",name:"Temperature du sol"},
        { value: "soil_humidity",name:"Humidité du sol"},
        { value: "humidity",name:"Humidité"},
        { value: "solar",name:"Radiation solaire"},
        { value: "atmosphericPressure",name:"Pression atmospherique"},
        { value: "vapourPressure",name:"Pression de la vapeur"},
        { value: "rain",name:"Pluviometrie"},
        { value: "strikes",name:"Coups de foudre"},
        { value: "wind_speed",name:"Vitesse du vent"},
        { value: "windDirection",name:"Direction du vent"},
        { value: "gustSpeed",name:"Vitesse de rafale"},







     

          ]

  }

}
