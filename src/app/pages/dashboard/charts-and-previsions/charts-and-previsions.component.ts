import { Input } from '@angular/core';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';
import { MesureService } from 'app/_services/mesure.service';
import { arrayMax } from 'highcharts';

@Component({
  selector: 'ngx-charts-and-previsions',
  templateUrl: './charts-and-previsions.component.html',
  styleUrls: ['./charts-and-previsions.component.scss']
})
export class ChartsAndPrevisionsComponent implements OnInit,OnChanges {
  ValueT: any;
  listT: any[] = [];
  listH: any[] = [];
  listV: any[] = [];
  listUV: any[] = [];
  listP: any;

  
  @Input() selectedID_EXP
  ChartT: any[] = [];
  ChartH: any[] = [];
  ChartV: any[] = [];
  ChartL: any[] = [];
  ChartUV: any[] = [];
  ChartP: any[] = [];
  idCapteur: any;

  ListStatsT: any[] = [];  
  idCapteurH: any;
  idCapteurT: any;
  idCapteurL: any;
  idCapteurP: any;
  idCapteurUV: any;
  idCapteurV: any;
  meanT: any;
  maxT: any;
  minT: any;
  nbrT: any;
  typeT: any;
  lastT: any;
  typeH: any;
  meanH: any;
  maxH: any;
  minH: any;
  nbrH: number;
  lastH: any;
  typeL: any;
  nbrL: any;
  lastL: any;
  meanL: any;
  maxL: any;
  minL: any;
  typeV: any;
  nbrV: any;
  lastV: any;
  meanV: any;
  maxV: any;
  minV: any; 







  constructor(private mesureService: MesureService) { }
  ngOnChanges() {
    
    
    this.getPrevision(this.selectedID_EXP);

    
setTimeout(() => {
  this.getChart_data(this.selectedID_EXP);
}, 3000);


  }

  ngOnInit() 
 {
  
//   this.getChart_data(this.selectedID_EXP);
 
     
// setTimeout(() => {
//   this.getPrevision(this.selectedID_EXP);
// }, 2000);

  }





  bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
  waterIcon: NbIconConfig =  { icon: 'water', pack: 'fa' };
  TIcon: NbIconConfig = { icon: 'thermometer-half', pack: 'fa' };
  HIcon: NbIconConfig = { icon: 'tint', pack: 'fa' };
  VentIcon: NbIconConfig =  { icon: 'wind', pack: 'wind_icons' };
  UVIcon: NbIconConfig =  { icon: 'radiation', pack: 'radiation' };
  lightIcon: NbIconConfig =  { icon: 'sun', pack: 'fa' };
  PluIcon: NbIconConfig =  { icon: 'umbrella', pack: 'eva' };





  Prevision :any[]= [];

  getPrevision(id_exp) {
    this.Prevision = [];
    
    this.mesureService.getPrevision(id_exp).subscribe((item) => { 
    this.Prevision = item; 
      this.listT = item['temperature_forcast']['values'];
      this.listH = item['humidity_forecast']['values'];
      this.listV = item['wind_forcast']['values'];
      this.listUV = item['uv_forcast']['values'];
      this.listP = item['rain_forecast']['values'];
 
  })


  
 
}
getChart_data(id_exp) {
 this.idCapteur = "Non Disponible";
 this.ChartT = this.ChartH = this.ChartV = this.ChartL = this.ChartUV = this.ChartP = [];

 setTimeout(() => {
  this.mesureService.getChart_data(id_exp,'temperature').subscribe((item) => {  
       this.ChartT = item; 
         this.idCapteurT = item['temperature']['id_capteur'];
         this.typeT = item['temperature']["type"];
         this.nbrT = item['temperature']['nombre_mesures'];
         this.lastT = item['temperature']['derniere_valeur'].value;

        let ListStatsT = item['temperature']['stats'];
        this.meanT = ListStatsT[0].mean;
        this.maxT = ListStatsT[0].max;
        this.minT = ListStatsT[0].min;
       
        })
     
//         this.ChartT['temperature']['data'].forEach(element => {
//           this.lastT = element.value;
//          this.nbrT++;
// });
 
}, 2000);

setTimeout(() => {
  this.mesureService.getChart_data(id_exp,'humidity').subscribe((item) => {   
      this.ChartH = item;
      if(item['humidity']['id_capteur']){
         this.idCapteurH = item['humidity']['id_capteur']; 
      this.typeH = item['humidity']["type"];
      this.nbrH = item['humidity']['nombre_mesures'];
      this.lastH = item['humidity']['derniere_valeur'].value;

     let ListStatsT = item['humidity']['stats'];
     this.meanH = ListStatsT[0].mean;
     this.maxH = ListStatsT[0].max;
     this.minH = ListStatsT[0].min;
 
      }
     
  }) 
  

 
}, 4000);
 
setTimeout(() => {
  this.mesureService.getChart_data(id_exp,'light').subscribe((item) => {   
      this.ChartL = item; 
     // if(item['light']['data'])
      
     
       this.idCapteurL = item['light']['id_capteur']; 
       this.typeL = item['light']["type"];
       this.nbrL = item['light']['nombre_mesures'];
       this.lastL = item['light']['derniere_valeur'].value;
       
      let ListStatsT = item['light']['stats'];
      this.meanL = ListStatsT[0].mean;
      this.maxL = ListStatsT[0].max;
      this.minL = ListStatsT[0].min;
      })
 
}, 5000);

setTimeout(() => {
  this.mesureService.getChart_data(id_exp,'wind_speed').subscribe((item) => {   
    
    this.ChartV = item;  
    this.idCapteurV = item['wind_speed']['id_capteur'];
    this.typeV = item['wind_speed']["type"];
    this.nbrV = item['wind_speed']['nombre_mesures'];
    this.lastV = item['wind_speed']['derniere_valeur'].value;

   let ListStatsT = item['wind_speed']['stats'];
   this.meanV = ListStatsT[0].mean;
   this.maxV = ListStatsT[0].max;
   this.minV = ListStatsT[0].min;
  })
 
}, 6000);

setTimeout(() => {
  this.mesureService.getChart_data(id_exp,'uv').subscribe((item) => {     this.ChartUV = item;  this.idCapteurUV = item['uv']['id_capteur'];   })
  
}, 7000);

setTimeout(() => {
  this.mesureService.getChart_data(id_exp,'rain').subscribe((item) => {     this.ChartP = item;  this.idCapteurP = item['rain']['id_capteur'];   })
 
}, 8000);
   
 
//  if(!this.isEmptyObject(this.ChartT)){
  //  }
//   this.mesureService.getChart_data1(id_exp,'temperature').subscribe(  {   
//     next: item => {  this.ChartT = item; this.idCapteurT = item['temperature']['id_capteur']; }, 
//   	// error: error => { console.log("error") ;console.log(error) }, 
//    	complete: () => { 
//  this.mesureService.getChart_data2(id_exp,'humidity').subscribe(  {   
//   next: item => {  this.ChartH = item;  this.idCapteurH = item['humidity']['id_capteur']; }, 
//   // error: error => { console.log("error") ;console.log(error) }, 
//    complete: () => { 
// this.mesureService.getChart_data3(id_exp,'light').subscribe(  {   
//   next: item => {  this.ChartL = item;  }, 
//  // error: error => { console.log("error") ;console.log(error) }, 
//    complete: () => { 
// this.mesureService.getChart_data4(id_exp,'rain').subscribe(  {   
//   next: item => {  this.ChartP = item;  }, 
//   // error: error => { console.log("error") ;console.log(error) }, 
//    complete: () => { 
// this.mesureService.getChart_data5(id_exp,'uv').subscribe(  {   
//   next: item => {  this.ChartUV = item;  }, 
//   // error: error => { console.log("error") ;console.log(error) }, 
//    complete: () => { 
// this.mesureService.getChart_data6(id_exp,'wind_speed').subscribe((item) => {     this.ChartV = item;     })
//     }
// })
//     }
// })
//     }
// })
//     }
// })
//       }
//   })
   

//  if(this.idCapteur == "Non Disponible"){
 
//  }

// setTimeout(() => {
//   this.mesureService.getChart_data(id_exp,'light').subscribe((item) => {     this.ChartL = item; })
  
// }, 5500);
// setTimeout(() => {
  
//   this.mesureService.getChart_data(id_exp,'rain').subscribe((item) => {     this.ChartP = item; })
 
// }, 6000);
// setTimeout(() => {
  
//  this.mesureService.getChart_data(id_exp,'rain').subscribe((item) => {     this.ChartP = item; })
 
// }, 7000);
// setTimeout(() => {
//   this.mesureService.getChart_data(id_exp,'uv').subscribe((item) => {     this.ChartUV = item; })
 
// }, 8000);
// setTimeout(() => {
//   this.mesureService.getChart_data(id_exp,'wind_speed').subscribe((item) => {     this.ChartV = item; })
 
// }, 9000);
  
// console.log(this.ChartH);
// console.log(this.ChartL);
// console.log(this.ChartP);
// console.log(this.ChartV);
// console.log(this.ChartUV);
  


}
isEmptyObject(obj){
  return (obj && (Object.keys(obj).length === 0))
} 



selectTab(event){
  console.log(event)

}



}
