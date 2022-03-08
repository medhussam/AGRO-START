import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService , NbIconConfig } from '@nebular/theme';
import { Temperature, TemperatureHumidityData } from '../../../@core/data/temperature-humidity';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { TemperatureHumidityService } from 'app/@core/mock/temperature-humidity.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MesureService } from 'app/_services/mesure.service';

@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy , OnChanges , OnInit {
  // @Input() temperatureM;
  // @Input() humidityM;
  // @Input() luminosite;
  // @Input() idcaptem;
  // @Input() idcaphum;
  // @Input() idcaplum;
  // @Input() maxminT;
  // @Input() maxminH;
  // @Input() maxminL;
  // @Input() valueT;
  // @Input() valueH;
  // @Input() valueL;
  // @Input() wirelessAudioCard
  // @Input() pluv_
  @Input() selectedID_EXP
  // maxTemperature = 0;
  // minTemperature = 0;
  // maxHumidity = 0;
  // minHumidity = 0;
  // maxLuminosity = 0;
  // minLuminosity = 0;
  // humidityy = 0;
  // temperaturee = 0;
  // luminositee = 0;
  // idcaptemm = "Id Capture";
  // idcaphumm = "Id Capture";
  // idcaplumm = "Id Capture";
  // test;
  // lastElementTemperature = 0;
  // lastElementHumidity = 0;
  // lastElementLuminosity = 0;
  // amplitudeThermiqueT = 0;
  // amplitudeThermiqueH = 0;
  // amplitudeThermiqueL = 0
  // vitasse_de_vent = 0
   private alive = true;


  bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
  waterIcon: NbIconConfig =  { icon: 'water', pack: 'fa' };
  TIcon: NbIconConfig = { icon: 'thermometer-half', pack: 'fa' };
  HIcon: NbIconConfig = { icon: 'tint', pack: 'fa' };
  VentIcon: NbIconConfig =  { icon: 'wind', pack: 'wind_icons' };
  UVIcon: NbIconConfig =  { icon: 'radiation', pack: 'radiation' };
  lightIcon: NbIconConfig =  { icon: 'sun', pack: 'fa' };
  PluIcon: NbIconConfig =  { icon: 'umbrella', pack: 'eva' };
  mesureL: any[] = [];
  mesure: any[] = [];
  listT:any[] = []; 






  minT: any = 0;
  meanT: any= 0;
  maxT: any= 0;
  Id_capteurT: any;
  ValueT: any= 0;
  TypeT: any;
  TimeT: any;

  

  minH: any;
  meanH: any;
  maxH: any;
  Id_capteurH: any;
  ValueH: any;
  TypeH: any;
  TimeH: any;


  

  minV: any;
  meanV: any;
  maxV: any;
  Id_capteurV: any;
  ValueV: any;
  TypeV: any;
  TimeV: any;


  

  minL: any;
  meanL: any;
  maxL: any;
  Id_capteurL: any;
  ValueL: any = 0;
  TypeL: any;
  TimeL: any;


  

  minP: any;
  meanP: any;
  maxP: any;
  Id_capteurP: any;
  ValueP: any;
  TypeP: any;
  TimeP: any;




  minUV: any;
  meanUV: any;
  maxUV: any;
  Id_capteurUV: any;
  ValueUV: any;
  TypeUV: any;
  TimeUV: any;



////////



  mingustSpeed: any;
  meangustSpeed: any;
  maxgustSpeed: any;
  Id_capteurgustSpeed: any;
  ValuegustSpeed: any;
  TypegustSpeed: any;
  TimegustSpeed: any;



  minPressure: any;
  meanPressure: any;
  maxPressure: any;
  Id_capteurPressure: any;
  ValuePressure: any;
  TypePressure: any;
  TimePressure: any;



  minSolar: any;
  meanSolar: any;
  maxSolar: any;
  Id_capteurSolar: any;
  ValueSolar: any;
  TypeSolar: any;
  TimeSolar: any;

  minStrikes: any;
  meanStrikes: any;
  maxStrikes: any;
  Id_capteurStrikes: any;
  ValueStrikes: any;
  TypeStrikes: any;
  TimeStrikes: any;


  minVapeurP: any;
  meanVapeurP: any;
  maxVapeurP: any;
  Id_capteurVapeurP: any;
  ValueVapeurP: any;
  TypeVapeurP: any;
  TimeVapeurP: any;


  minWindD: any;
  meanWindD: any;
  maxWindD: any;
  Id_capteurWindD: any;
  ValueWindD: any;
  TypeWindD: any;
  TimeWindD: any;




 ngOnChanges(){
  //  this.vitasse_de_vent = this.wirelessAudioCard
  // this.idcaptemm = this.idcaptem;
  // this.idcaphumm =   this.idcaphum;
  // this.idcaplumm =   this.idcaplum;

  this.ValueL = 0;
 setTimeout(() => {
  
this.getCurrentData(this.selectedID_EXP);
 }, 600);

// if (this.valueT[0]) {
//   this.lastElementTemperature = this.valueT[0].value;
//   this.maxTemperature = this.maxminT[0].max;
// this.minTemperature = this.maxminT[0].min;
// }
// if (this.valueH[0]) {
//   this.lastElementHumidity = this.valueH[0].value;
//   this.maxHumidity = this.maxminH[0].max;
// this.minHumidity = this.maxminH[0].min;
// }
// if (this.valueL[0]) {
//   this.lastElementLuminosity = this.valueL[0].value;
//   this.maxLuminosity = this.maxminL[0].max;
// this.minLuminosity = this.maxminL[0].min;
// }
// this.idcaptemm = this.idcaptem;
// this.idcaphumm =   this.idcaphum;
// this.idcaplumm =   this.idcaplum;





// this.amplitudeThermiqueT = this.maxTemperature - this.minTemperature;
// this.amplitudeThermiqueH = this.maxHumidity - this.minHumidity;
// this.amplitudeThermiqueL = this.maxLuminosity - this.minLuminosity;
//    if (this.temperatureM && this.humidityM) {
//     this.temperaturee = this.temperatureM;
//     this.humidityy = this.humidityM;
//     this.luminositee = this.luminosite
  
//     forkJoin(
//       this.temperatureHumidityService.getTemperatureData(),
//       this.temperatureHumidityService.getHumidityData(),
//     )
//       .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
//         this.temperatureData = temperatureData;
//         this.temperature = this.temperatureM;

//         this.humidityData = humidityData;
//         this.humidity = this.humidityM;
//       });
//    } 
 }
 getArrayMax(array){
  return Math.max.apply(null, array);
}
getArrayMin(array){
  return Math.min.apply(null, array);
}
 ngOnInit(){
  // this.vitasse_de_vent = this.wirelessAudioCard
  //  this.humidityy = this.humidityM;
  //  this.temperaturee = this.temperatureM;
  //  this.luminositee = this.luminosite;
  //  this.idcaptemm = this.idcaptem;
  //  this.idcaphumm =   this.idcaphum;
  //  this.idcaplumm =   this.idcaplum;
  setTimeout(() => {
    this.getCurrentData(this.selectedID_EXP)
  }, 500);
  
 }
  // temperatureData: Temperature;
  // temperature: number;
  // temperatureOff = false;
  // temperatureMode = 'cool';

  // humidityData: Temperature;
  // humidity: number;
  // humidityOff = false;
  // humidityMode = 'heat';
  
  theme: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private temperatureHumidityService: TemperatureHumidityData,
              private matIconsRegistry : MatIconRegistry,
              private domSanitizer : DomSanitizer,
              private mesureService: MesureService) {

               this.matIconsRegistry.addSvgIcon ('wind' , this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/wind.svg"));
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.theme = config.variables.temperature;
    });

    // forkJoin(
    //   this.temperatureHumidityService.getTemperatureData(),
    //   this.temperatureHumidityService.getHumidityData(),
    // )
    //   .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
    //     this.temperatureData = temperatureData;
    //     this.temperature = this.humidityy;

    //     this.humidityData = humidityData;
    //     this.humidity = this.humidityy;
    //   });
  }

  ngOnDestroy() {
    this.alive = false;
   
  }
  
  



  getCurrentData(id_exp) {
    this.mesureL = [];
    this.listT = [];
    this.mesureService.getCurrentData(id_exp).subscribe((item) => {
  item.map(item => {
  
              this.mesure.push(item);
            //  this.mesure.push("-------------------------");  
  })
}).add(arrow=>{
   this.mesure.map(e => {
   
        //  this.listT.push(e)
        //  this.listT.push("-------------------------")
   if (e['temperature']) { 
  
     let temperaryVAR = e['temperature'];
     temperaryVAR['current'].map(a => {
      this.ValueT = a.value;
      this.TimeT = a.time;
      this.Id_capteurT = a.id_capteur ;
      this.TypeT = a.type;
     })
     if(this.TypeT != 'externe'){
     temperaryVAR['stats'].map(a => {
      this.minT = a.min;
      this.meanT = a.variation;
      this.maxT = a.max;
     }) }
}


if (e['humidity']) { 
  
  let temperaryVAR = e['humidity'];
  temperaryVAR['current'].map(a => {
   this.ValueH = a.value;
   this.TimeH = a.time;
   this.Id_capteurH = a.id_capteur ;
   this.TypeH = a.type;
  })
  if(this.TypeH != 'externe'){
  temperaryVAR['stats'].map(a => {
   this.minH = a.min;
   this.meanH = a.variation;
   this.maxH = a.max;
  }) }
}


if (e['wind_speed']) { 
  
  let temperaryVAR = e['wind_speed'];
  temperaryVAR['current'].map(a => {
   this.ValueV = a.value;
   this.TimeV = a.time;
   this.Id_capteurV = a.id_capteur ;
   this.TypeV = a.type;
  })
  if(this.TypeV != 'externe'){
  temperaryVAR['stats'].map(a => {
   this.minV = a.min;
   this.meanV = a.variation;
   this.maxV = a.max;
  }) }
}


if (e['uv']) { 
  
  let temperaryVAR = e['uv'];
  temperaryVAR['current'].map(a => {
   this.ValueUV = a.value;
   this.TimeUV = a.time;
    this.Id_capteurUV = a.id_capteur ;
    this.TypeUV = a.type;
  })
  // if(this.TypeV != 'externe'){
  // temperaryVAR['stats'].map(a => {
  //  this.minUV = a.min;
  //  this.meanUV = a.variation;
  //  this.maxUV = a.max;
  // }) }
}




if (e['light']) { 
  this.ValueL = 0;
   let temperaryVAR = e['light'];
   
if (temperaryVAR['current']) { 
  
   temperaryVAR['current'].map(a => {
    this.ValueL = a.value;
   this.TimeL = a.time;
   this.Id_capteurL = a.id_capteur ;
   this.TypeL = a.type;
   })
  }
  if(this.TypeL != 'externe'){
    
if (temperaryVAR['stats']) { 
  temperaryVAR['stats'].map(a => {
   this.minL = a.min;
   this.meanL = a.variation;
   this.maxL = a.max;
  })}
 }
}







if (e['rain']) { 
  
  let temperaryVAR = e['rain'];
  temperaryVAR['current'].map(a => {
   this.ValueP = a.value;
   this.TimeP = a.time;
   this.Id_capteurP = a.id_capteur ;
   this.TypeP = a.type;
  })
  if(temperaryVAR['stats']){
  temperaryVAR['stats'].map(a => {
   this.minP = a.min;
   this.meanP = a.variation;
   this.maxP = a.max;
  }) }
}






// atmosphericPressure   solar strikes vapourPressure windDirection






if (e['gustSpeed']) { 
  
  let temperaryVAR = e['gustSpeed'];
  temperaryVAR['current'].map(a => {
   this.ValuegustSpeed = a.value;
   this.TimegustSpeed = a.time;
   this.Id_capteurgustSpeed = a.id_capteur ;
   this.TypegustSpeed = a.type;
  })
  if(temperaryVAR['stats']){
  temperaryVAR['stats'].map(a => {
   this.mingustSpeed = a.min;
   this.meangustSpeed = a.variation;
   this.maxgustSpeed = a.max;
  }) }
}

if (e['windDirection']) { 
  
  let temperaryVAR = e['windDirection'];
  temperaryVAR['current'].map(a => {
   this.ValueWindD = a.value;
   this.TimeWindD = a.time;
   this.Id_capteurWindD = a.id_capteur ;
   this.TypeWindD = a.type;
  })
  if(temperaryVAR['stats']){
  temperaryVAR['stats'].map(a => {
   this.minWindD = a.min;
   this.meanWindD = a.variation;
   this.maxWindD = a.max;
  }) }
}


if (e['solar']) { 
  
  let temperaryVAR = e['solar'];
  temperaryVAR['current'].map(a => {
   this.ValueSolar = a.value;
   this.TimeSolar = a.time;
   this.Id_capteurSolar = a.id_capteur ;
   this.TypeSolar = a.type;
  })
  if(temperaryVAR['stats']){
  temperaryVAR['stats'].map(a => {
   this.minSolar = a.min;
   this.meanSolar = a.variation;
   this.maxSolar = a.max;
  }) }
}




if (e['atmosphericPressure']) { 
  
  let temperaryVAR = e['atmosphericPressure'];
  temperaryVAR['current'].map(a => {
   this.ValuePressure = a.value;
   this.TimePressure = a.time;
   this.Id_capteurPressure = a.id_capteur ;
   this.TypePressure = a.type;
  })
  if(temperaryVAR['stats']){
  temperaryVAR['stats'].map(a => {
   this.minPressure = a.min;
   this.meanPressure = a.variation;
   this.maxPressure = a.max;
  }) }
}



if (e['strikes']) { 
  
  let temperaryVAR = e['strikes'];
  temperaryVAR['current'].map(a => {
   this.ValueStrikes = a.value;
   this.TimeStrikes = a.time;
   this.Id_capteurStrikes = a.id_capteur ;
   this.TypeStrikes = a.type;
  })
  if(temperaryVAR['stats']){
  temperaryVAR['stats'].map(a => {
   this.minStrikes = a.min;
   this.meanStrikes = a.variation;
   this.maxStrikes = a.max;
  }) }
}






if (e['vapourPressure']) { 
  
  let temperaryVAR = e['vapourPressure'];
  temperaryVAR['current'].map(a => {
   this.ValueVapeurP = a.value;
   this.TimeVapeurP = a.time;
   this.Id_capteurVapeurP = a.id_capteur ;
   this.TypeVapeurP = a.type;
  })
  if(temperaryVAR['stats']){
  temperaryVAR['stats'].map(a => {
   this.minVapeurP = a.min;
   this.meanVapeurP = a.variation;
   this.maxVapeurP = a.max;
  }) }
}














       });
//       e.mean_min_max_7j.forEach(element => {
//         this.minT = element.min;
//         this.meanT = element.mean;
//         this.maxT = element.max;
//         this.dernierMesureT =Number(element.mean);
//       });
//     } 
//     if (e.mesure == 'humidity') {
//       e.mean_min_max_24h.forEach(element => {
//         this.listH.push(element)
//         this.arrayHumidity.push(element)
//         this.capteurHumidity = e.id_capteur;
       
//       });
//       e.mean_min_max_7j.forEach(element => {
//         this.minH = element.min;
//         this.maxH = element.max;
//         this.meanH = element.mean;
//         this.dernierMesureH  =Number(element.mean);
//       });
//     }
//     if (e.mesure == 'light') {
//       e.mean_min_max_24h.forEach(element => {
//         this.listL.push(element)
//         this.arrayLuminosite.push(element)
       
//         this.capteurLuminosity =  e.id_capteur;
//       });
//       e.mean_min_max_7j.forEach(element => {
//         this.minL = element.min;
//         this.meanL = element.mean;
//         this.maxL = element.max;
//         this.dernierMesureL =Number(element.mean.toFixed(0));
//       });
//     }
//   if (this.exploitetion[0].properties.id_exploitation == e.id_exploitation) {
//       e.data.forEach(element => {
//       if (element.mesure == 'temperature') {
//         this.mesureT = element
//         element.value.forEach(element => {
//           this.value.push(element)
//           this.nbrMesureT.push(element.value)
         
//         });
//       } 
//       if (element.mesure == 'humidity') {
//         this.mesureH = element
//         element.value.forEach(element => {
//           this.valueH.push(element)
//           this.nbrMesureH.push(element.value)
//         });
//       }
//       if (element.mesure == 'light') {
//         this.mesureL = element;
//         this.light_existe = true;
        
//         element.value.forEach(element => {
//           this.valueL.push(element)
//           this.nbrMesureL.push(element.value)
//         });
//       }
//       }); 
//     } 
 });

// this.mesure.forEach((elm) => {
 

//   if (elm['mesure'] == 'temperature' && elm['id_exploitation'] == this.exploitetion[0].properties.id_exploitation) {
//     this.temperatureMeanValue = elm['mean_value'];
//     this.capteurTemperature = elm['id_capteur'];
    
//   }
//   if (elm['mesure'] == 'humidity' && elm['id_exploitation'] == this.exploitetion[0].properties.id_exploitation) {
//     this.humidityMeanValue = elm['mean_value'];
//     this.capteurHumidity = elm['id_capteur'];
//   }
//   if (elm['mesure'] == 'light' && elm['id_exploitation'] == this.exploitetion[0].properties.id_exploitation) {
//     this.luminositeMeanValue = elm['mean_value'];
//     this.capteurLuminosity = elm['id_capteur'];
//   }
// })


// this.selected =this.exploitetion[0].properties.matricule;


// // console.log(this.value);
// // console.log("this.value");


// })
  }











 
}