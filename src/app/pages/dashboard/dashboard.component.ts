import {AfterViewInit, Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { NbIconConfig, NbThemeService } from '@nebular/theme';
import { CapteureService } from 'app/_services/capteure.service';
import { WeatherService } from 'app/_services/weather.service'
import { ExploitationService } from 'app/_services/exploitation.service';
import { BarrageService } from 'app/_services/barrage.service';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { MesureService } from 'app/_services/mesure.service';
import { MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe, formatDate } from '@angular/common';
import { ProduitService } from 'app/_services/produits.service';
import { OnChanges } from '@angular/core';
import { Router } from '@angular/router';

interface CardSettings {
  title: string;
  value: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
}) 

export class DashboardComponent implements OnDestroy , OnInit ,OnChanges {

  exploitetion : any[] = [];
  newmesure_ : any[] = [];
  newmesure_Plu : any[] = [];
  
  weather: any[] = [];
  centerX = 0;  centerY = 0; centerExp;
  mesure: any[] = [];  mesureT: any[] = [];  newmesure: any[] = [];  mesureH: any[] = [];  mesureL: any[] = [];
  listT: any[] = [];  listH: any[] = [];  listL: any[] = [];
  temperatureMeanValue: any[] = [];
  humidityMeanValue: any[] = [];
  luminositeMeanValue: any[] = [];
  capteurTemperature: any[] =[];
  capteurHumidity: any[] =[];
  capteurLuminosity: any[] =[];
  arrayTemperature = [];
  arrayHumidity = [];
  arrayLuminosite = [];
  progress = 0;  intervalId;  selected;
  selectedNameBarrage;
  
  minT = 0;  maxT = 0;  meanT = 0;  minH = 0;  meanH = 0;  maxH = 0;  minL = 0;  maxL = 0;  meanL = 0;
  nbrMesureT: any[] = [];  nbrMesureH: any[] = [];  nbrMesureL: any[] = [];
  value: any[] = [];  valueH: any[] = [];  valueL: any[] = [];
  dernierMesureT :any;dernierMesureH = 0; dernierMesureL = 0;

  
  alive = true;
  solarValue: number; 
  multi: any[]  = [];
  showLegend = true;  showXAxis = true;  showYAxis = true;  showXAxisLabel = true;showYAxisLabel = true;
  
  colorScheme: any;
  themeSubscription: any;
  select_exp: any;
  sel: boolean;
  selectedValue: any;
  selectedID_EXP: any = 1;
  superficie: any;
  nbr_parcelle: any;
  Produit : any[] = [];  forecast :any[] ;  forecast_values :any[] ;  icon_mesure  : any[] ;  Capteur_Table : any[] = [];
  marches : any[] = [];  periodMarche : any[] = [];  marcheSelected :any = "";  prix : any[] = [];  statusCards: string;
  newmesure_Plu_forecast : any[] = [];  


  Barrages:  any[] = [];
  BarragesCHart_: any[] = [];
  BarragesCHarttime: any[] = [];
  BarragesCHartvalue: any[] = [];
   DateD : any;  DateF :any;
  BarrageSelected: any;
  DataBarrageSelected : any[] = [];
  provinces:  any[] = [];
  DataBarrageByProvince: any[] = [];
  selectProvince : any;
  CapteurInstall: boolean;

 
        constructor(private themeService: NbThemeService,private solarService: SolarData,private capteureService: CapteureService, private router: Router,
              private exploitationService: ExploitationService,private WeatherService: WeatherService,private mesureService: MesureService,private barrageService: BarrageService,
              private matIconsRegistry : MatIconRegistry,private domSanitizer : DomSanitizer,public datepipe : DatePipe, private produitsService : ProduitService
            ){
                this.matIconsRegistry.addSvgIcon ('warm',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/017-heat.svg"));
                this.matIconsRegistry.addSvgIcon ('humidity',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/019-humidity.svg"));
                this.matIconsRegistry.addSvgIcon ('wind',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/wind.svg"));
                this.matIconsRegistry.addSvgIcon ('sunrise',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/012-dawn.svg"));
                this.matIconsRegistry.addSvgIcon ('rainy',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/027-rain.svg"));
                this.matIconsRegistry.addSvgIcon ('barometer',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/026-pressure.svg"));
                this.matIconsRegistry.addSvgIcon ('snowflake',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/031-snow.svg"));
                this.matIconsRegistry.addSvgIcon ('sunset' ,this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/037-sunset.svg"));
                this.matIconsRegistry.addSvgIcon ('wind_flag',this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg/049-windsock.svg"));
            
                this.themeService.getJsTheme().pipe(takeWhile(() => this.alive)).subscribe(theme => {this.statusCards = this.statusCardsByThemes[theme.name];});
                this.solarService.getSolarData().pipe(takeWhile(() => this.alive)).subscribe((data) => {this.solarValue = data;});
                this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {const colors: any = config.variables;this.colorScheme = {domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],};});



              
              }
  ngOnChanges() {
    //this.changeExploitation(this.selectedID_EXP);
  }

  bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
  waterIcon: NbIconConfig =  { icon: 'water', pack: 'fa' };
  TIcon: NbIconConfig = { icon: 'thermometer-half', pack: 'fa' };
  HIcon: NbIconConfig = { icon: 'tint', pack: 'fa' };
  VentIcon: NbIconConfig =  { icon: 'wind', pack: 'wind_icons' };
  UVIcon: NbIconConfig =  { icon: 'radiation', pack: 'radiation' };
  lightIcon: NbIconConfig =  { icon: 'sun', pack: 'fa' };
  PluIcon: NbIconConfig =  { icon: 'umbrella', pack: 'eva' };


      lightCard: CardSettings = {title: 'dashboard.temperature', value: '-- °C', iconClass: 'warm', type: 'light', };
      rollerShadesCard: CardSettings = { title: 'dashboard.humidite',  value: '-- %',   iconClass: 'humidity',    type: 'info',  };
      wirelessAudioCard: CardSettings = {    title: 'dashboard.vent',    value: '-.-- m/s -- °',    iconClass: 'wind_flag',    type: 'info',  };
      coffeeMakerCard: CardSettings = {    title: 'dashboard.hourlever',    value: '--:--',    iconClass: 'sunrise',    type: 'warning',  };
      lightCards: CardSettings = {    title: 'dashboard.pluviometrie',    value: '-- mm',    iconClass: 'rainy',    type: 'primary',  };
      rollerShadesCards: CardSettings = {    title: 'dashboard.pression',    value: '-- hPa',    iconClass: 'barometer',    type: 'info',  };
      wirelessAudioCards: CardSettings = {    title: 'dashboard.point_de_rosee',    value: '--°',    iconClass: 'snowflake',    type: 'info',  };
      coffeeMakerCards: CardSettings = {    title: 'dashboard.hourcoucher',    value: '--:--',    iconClass: 'sunset',    type: 'warning',  };
      commonStatusCardsSet: CardSettings[] = [    this.lightCard,    this.rollerShadesCard,    this.wirelessAudioCard,    this.coffeeMakerCard,    this.lightCards,    this.rollerShadesCards,    this.wirelessAudioCards,    this.coffeeMakerCards,  ];
      statusCardsByThemes =
      {
        default: this.commonStatusCardsSet,
        dark: this.commonStatusCardsSet,
        cosmic: this.commonStatusCardsSet,
        corporate: [{...this.lightCard,type: 'warning',},{...this.rollerShadesCard,type: 'primary',},{...this.wirelessAudioCard, type: 'danger',},{...this.coffeeMakerCard,type: 'info',}],
        
      };


      // DATA Méteo by (X,Y)
        O_getWeather(x,y){
          this.WeatherService.getWeather(x,y).subscribe(item => {
            this.weather = item;
            this.lightCard.value = item['temperature']+' °C';
            this.rollerShadesCard.value = item['humidite']+' %';
            this.wirelessAudioCard.value =  item['vent'].vitesse.toFixed(2)+' m/s   '+item['vent'].deg+' °';
            this.coffeeMakerCard.value = item['levee']  ;
            this.coffeeMakerCards.value = item['couchee']; 
            this.lightCards.value = '0 mm';
            this.rollerShadesCards.value = item['pression'].toFixed(2)+' Pa'; 
            this.wirelessAudioCards.value = String(item['point_rose']).substring(0,5)+' °';
          })
      }

        // DATA Méteo by id_exploitation
      getWeatherByExp(id_exploitation) {
        console.log(id_exploitation)
        this.WeatherService.getWeatherByExp(id_exploitation).subscribe(item => {
          console.log(item)
          this.weather = item;
          this.lightCard.value = item['temperature'].toFixed(2)+' °C';
          this.rollerShadesCard.value = item['humidite']+' %';
          this.wirelessAudioCard.value =  item['vent'].vitesse.toFixed(2)+' m/s     '+item['vent'].deg+'°';
          this.coffeeMakerCard.value = item['levee']  ;
          this.coffeeMakerCards.value = item['couchee']; 
          this.lightCards.value = item['pluviometrie']+' mm';
          this.rollerShadesCards.value = item['pression'].toFixed(0)+' hPa'; 
          this.wirelessAudioCards.value = String(item['point_rose']).substring(0,5)+' °';
        })
    }





        // Exploitations DATA
        getExploitation() { 
          this.sel = true;
          this.exploitationService.getExploitations().subscribe(item => {
            if (item['features'] == null){
              this.router.navigate(['/pages/Adminstrator/exploitation']);
           
          }
            item['features'].forEach(element => {
             
                this.exploitetion.push(element);  
                if(this.sel == true){
                  console.log(element);
                  this.superficie = element.properties.superficie.toFixed(2);//metre carré to ha
                  this.nbr_parcelle = element.properties.parcelles_nbr;
                  this.selectedValue = element.properties.matricule;
                  this.selectedID_EXP = element.properties.id_exploitation;
                this.sel = false;} 
            });
          })
           .add(arrow=>{
             this.getWeatherByExp(this.exploitetion[0].properties.id_exploitation);
             this.centerX = this.exploitetion[0].properties.x;
             this.centerY = this.exploitetion[0].properties.y;
           })
        }
        // FORCAST VENT & PLUVIOMETRIE
        getForcast() {
         
            this.mesureService.getMesures().subscribe((item) => {
            this.forecast =  []
            this.forecast_values =  []
          
              item.map(item => {
                if(item["forecast"]){
                  this.forecast.push((JSON.parse(JSON.stringify(item["forecast"])))) 
                  item["forecast"].forEach(i => { 
                      this.forecast_values.push(i) 
                  }); 
                }
                this.newmesure.push(item); 
              });}).add(arrow=>{
                if(this.newmesure){
              this.newmesure.map(e => {
                if (e.mesure == 'vent' && this.selectedID_EXP == e.id_exploitation) {
                  this.newmesure_.push(e.data);
                } 
                if (e.mesure == 'pluviometrie' && this.selectedID_EXP == e.id_exploitation) {
                  this.newmesure_Plu.push(e.data); 
                } 
              
              })}
            })
        }
       // CHARTs by Mesure sur 7j 
        getMesure() {
          this.mesureL = [];
          this.mesureService.getMesures().subscribe((item) => {
        item.map(item => {
        
                    this.mesure.push(item); 
        })
      }).add(arrow=>{
        this.mesure.map(e => {
         
          if (e.mesure == 'temperature') {
            e.mean_min_max_24h.forEach(element => {
              this.listT.push(element)
              this.arrayTemperature.push(element)
           
              this.capteurTemperature = e.id_capteur;
             
            });
            e.mean_min_max_7j.forEach(element => {
              this.minT = element.min;
              this.meanT = element.mean;
              this.maxT = element.max;
              this.dernierMesureT =Number(element.mean);
            });
          } 
          if (e.mesure == 'humidity') {
            e.mean_min_max_24h.forEach(element => {
              this.listH.push(element)
              this.arrayHumidity.push(element)
              this.capteurHumidity = e.id_capteur;
             
            });
            e.mean_min_max_7j.forEach(element => {
              this.minH = element.min;
              this.maxH = element.max;
              this.meanH = element.mean;
              this.dernierMesureH  =Number(element.mean);
            });
          }
          if (e.mesure == 'light') {
            e.mean_min_max_24h.forEach(element => {
              this.listL.push(element)
              this.arrayLuminosite.push(element)
             
              this.capteurLuminosity =  e.id_capteur;
            });
            e.mean_min_max_7j.forEach(element => {
              this.minL = element.min;
              this.meanL = element.mean;
              this.maxL = element.max;
              this.dernierMesureL =Number(element.mean.toFixed(0));
            });
          }
        if (this.exploitetion[0].properties.id_exploitation == e.id_exploitation) {
            e.data.forEach(element => {
            if (element.mesure == 'temperature') {
              this.mesureT = element
              element.value.forEach(element => {
                this.value.push(element)
                this.nbrMesureT.push(element.value)
               
              });
            } 
            if (element.mesure == 'humidity') {
              this.mesureH = element
              element.value.forEach(element => {
                this.valueH.push(element)
                this.nbrMesureH.push(element.value)
              });
            }
            if (element.mesure == 'light') {
              this.mesureL = element;
              this.light_existe = true;
              
              element.value.forEach(element => {
                this.valueL.push(element)
                this.nbrMesureL.push(element.value)
              });
            }
            }); 
          } 
      });
     
      this.mesure.forEach((elm) => {
       
      
        if (elm['mesure'] == 'temperature' && elm['id_exploitation'] == this.exploitetion[0].properties.id_exploitation) {
          this.temperatureMeanValue = elm['mean_value'];
          this.capteurTemperature = elm['id_capteur'];
          
        }
        if (elm['mesure'] == 'humidity' && elm['id_exploitation'] == this.exploitetion[0].properties.id_exploitation) {
          this.humidityMeanValue = elm['mean_value'];
          this.capteurHumidity = elm['id_capteur'];
        }
        if (elm['mesure'] == 'light' && elm['id_exploitation'] == this.exploitetion[0].properties.id_exploitation) {
          this.luminositeMeanValue = elm['mean_value'];
          this.capteurLuminosity = elm['id_capteur'];
        }
      })
     
     
      this.selected =this.exploitetion[0].properties.matricule;


// console.log(this.value);
// console.log("this.value");


      })
        }



        


        // Répartitions des Capteur
        getCapteur_Table() { 
          this.icon_mesure= [];
          this.CapteurInstall = false;
          this.capteureService.getCapteur_Table().subscribe(p => {

            if(this.isEmptyObject(p)){
              this.CapteurInstall = true;
            }
          
        p.forEach(e => {
          
      this.Capteur_Table.push(e);
            
      if(e.mesure == "temperature" ){this.icon_mesure.push("<i class='fa fa-thermometer-half'></i>");}

      if(e.mesure == "humidity" ){this.icon_mesure.push("<i class='fa fa-tint'></i>");}

      if(e.mesure == "vent" ){this.icon_mesure.push("<i class='fa fa-wind'></i>");}

      if(e.mesure == "pluviometrie" ){this.icon_mesure.push("<i class='fa fa-rain'></i>");}

      if(e.mesure == "light" ){this.icon_mesure.push("<i class='fa fa-sun'></i>");}

      if(e.mesure == "soil_conductivity" ){this.icon_mesure.push("<i class='fa fa-bolt'></i>");}
      if(e.mesure == "soil_humidity" ){this.icon_mesure.push("<i class='fa fa-tint-slash'></i>");}
      if(e.mesure == "soil_temperature" ){this.icon_mesure.push("<i class='fa fa-thermometer'></i>");}
      if(e.mesure == "ultrasonic_level" ){this.icon_mesure.push("<i class='fa fa-wifi'></i>");}


          } );
            
          });

        }

        //Marché de gros
        getProduit() { 
          let id_marche : any[] = [];
          this.produitsService.getmarches().subscribe(p => {

            let i =0;
            p.forEach(e => {
              if(id_marche.indexOf(e.id_marche)== -1){
              id_marche.push(e.id_marche)
          this.marches.push(e); 
      }
              }   
            );
            
          
        })




        }
        changeMarche(e){
          this.Produit = [];
          // this.Produit.push({"info":"aaaaa"});
          this.prix = [];
        
          this.marcheSelected = e.nom_marche;

          
            this.produitsService.getProduits(e.id_marche).subscribe(item => {
            
              if(this.isEmptyObject(item)){
                this.Produit.push({"info":"NODATA"});
              }else{
              this.Produit = item;  
              }
                
                  item.forEach(e => {
                    let prix_last = 0,last_date : Date;
                    e.prix.forEach(p => {
                      prix_last = p;
                      last_date = new Date(p.time);
                        }  )
                        this.prix.push(prix_last);
                        last_date.setDate( last_date.getDate() + 7 );
                        this.periodMarche.push(last_date);
                      }  )
            })
        }


        CAPACITE : any[]= [];
        //Barrage DATA
        getBarrage() { 
          this.DataBarrageSelected = [];
         // if(this.selectedID_EXP){
          let MyDateD =  new Date()
          let MyDateF =  new Date() 
           MyDateD.setMonth(MyDateD.getMonth() - 2);
           this.dateChangeD(MyDateD);
           this.dateChangeF(MyDateF);

           this.barrageService.getBarrages(this.selectedID_EXP).subscribe(item => {
           
            item.forEach(element => {  

             if (!this.provinces.some((item) => item == element.province)) {
               this.DataBarrageSelected.push(element);
              
               this.DataBarrageByProvince.push(element);
           }
               this.Barrages.push(element);   
           });    
         }).add(arrow=>{
        
           this.BarrageSelected = this.Barrages[0].nom;
           this.cap = this.Barrages[0].capacite_retenue;
          // alert(this.Barrages[0].nom+' '+this.DateF+' '+this.DateD)
           this.barrageService.getChartBarragesByNameAndDate(this.Barrages[0].nom,this.DateD,this.DateF).subscribe(item => {
           //   this.BarragesCHart_ = item["taux_de_remplissage"];
          this.BarragesCHart_ = item;

            this.CAPACITE = item;
           // alert(JSON.parse(JSON.stringify(item)));
           })
           this.selectedNameBarrage = this.Barrages[0].nom
         })


        this.barrageService.getBarrages(this.selectedID_EXP).subscribe(item => {
          item.forEach(element => {  
         
            this.Barrages.push(element);   
        });    
      })


      
        }



        checkTAUX = true;
        changeTAUX(){
        //   alert(this.checkTAUX);
          if(this.checkTAUX){this.checkTAUX = false; 
          //  this.changeNomBarrage
             
          }else{this.checkTAUX = true; 
            
          }
       
        }




        changeNomBarrage(e){
          this.BarragesCHart_ = [];
          this.DataBarrageSelected = [];
          this.multi = [];
          this.BarragesCHarttime = [];
          this.BarragesCHartvalue = []; 
          this.BarrageSelected = e.nom;
 
         let myVar = false;

            this.Barrages.forEach((h,index) => {
              if(e.nom == h.nom){
                this.cap = h.capacite_retenue;
                this.DataBarrageSelected.push(h);

                console.log(h);
             
                this.barrageService.getChartBarragesByNameAndDate(h.nom,this.DateD,this.DateF).subscribe(item => {
                //  this.BarragesCHart_ = item["taux_de_remplissage"];
                

                // item["capacite"].map(element => {
                // //  console.log(element);
                //   myVar = true;
                //                 }); 
                
                    if(myVar){  
                      this.BarragesCHart_ = item;
                      this.CAPACITE = item;
                    }
               


                console.log(myVar);

                 })
                  }
              
            })


// if(!myVar){ this.changeDateBarrage();}
           
          




        } 
        dateChangeD(e){
        let MyDateD =  new Date(e)
        this.DateD = this.datepipe.transform(MyDateD,'yyy-MM-dd')
        }
        dateChangeF(e){
          let MyDateF =  new Date(e)
        this.DateF = this.datepipe.transform(MyDateF,'yyy-MM-dd')

        }
        cap : any = 0;
        changeDateBarrage(){

          this.BarragesCHart_ = [];
          this.DataBarrageSelected = [];
          this.multi = [];
          this.BarragesCHarttime = [];
          this.BarragesCHartvalue = []; 
            this.Barrages.forEach((h,index) => {
              if(this.BarrageSelected == h.nom){
                this.DataBarrageSelected.push(h);
                this.cap = h.capacite_retenue;
               // alert(h.nom);
            this.barrageService.getChartBarragesByNameAndDate(h.nom,this.DateF,this.DateD).subscribe(elemtBarr => {
                 //   this.BarragesCHart_ = elemtBarr["taux_de_remplissage"];
                this.BarragesCHart_ = elemtBarr;

                  this.CAPACITE = elemtBarr;
            })

                  }
              
            })
        }
        temperature_forecast : any[]= [];

        hummidity_forecast : any[]= [];
        uvi_forecast : any[]= [];
        light_existe = false;
        changeExploitation(event){
          
          this.newmesure_ = [];
          this.newmesure_Plu = [];
          this.newmesure_Plu_forecast = [];
          this.temperature_forecast = [];
          this.hummidity_forecast = [];
          this.uvi_forecast = [];
          this.light_existe = false;
          this.newmesure.map(e => {
            if (e.mesure == 'vent' && this.selectedID_EXP == e.id_exploitation) {
              this.newmesure_.push(e.data);
            } 
            if (e.mesure == 'pluviometrie' && this.selectedID_EXP == e.id_exploitation) {
              this.newmesure_Plu.push(e.data);
              this.newmesure_Plu_forecast.push(e.forecast);
            } 
            if (e.mesure == 'temperature' && this.selectedID_EXP == e.id_exploitation) {
             
              this.temperature_forecast.push(e.forecast);
            } 
            if (e.mesure == 'humidite' && this.selectedID_EXP == e.id_exploitation) {
             
              this.hummidity_forecast.push(e.forecast);
            } 
            if (e.mesure == 'uvi' && this.selectedID_EXP == e.id_exploitation) {
             
              this.uvi_forecast.push(e.data);
            } 
          })
         // this.newmesure_ = [];
          // this.newmesure.map(e => {
          //   if (e.mesure == 'vent' && this.selectedID_EXP == e.id_exploitation) {
          //     this.newmesure_.push(e.data);
          //   } 
          // })
          this.value = [];
          this.valueH = []; 
          this.valueL = [];
          this.arrayTemperature = [];
          this.arrayHumidity = [];
          this.arrayLuminosite = [];
          let selectedValue = event;
          if(this.exploitetion){}
          this.exploitetion.forEach(h => {
            if(selectedValue == h.properties.id_exploitation){
              this.superficie = h.properties.superficie;
                this.nbr_parcelle = h.properties.parcelles_nbr;
                this.selectedID_EXP = h.properties.id_exploitation;
              this.centerX = h.properties.x;
              this.centerY = h.properties.y;
              
             // this.O_getWeather(h.properties.x,h.properties.y)
              this.getWeatherByExp(h.properties.id_exploitation)
              this.mesure.map(e => {
                if (e.mesure == 'temperature' && e.id_exploitation == selectedValue) {
                  e.mean_min_max_24h.forEach(element => {
                    this.listT.push(element)
                    this.arrayTemperature.push(element)
                    this.capteurTemperature = e.id_capteur;
                  });
                  e.mean_min_max_7j.forEach(element => {
                    this.minT = element.min;
                    this.meanT = element.mean;
                    this.maxT = element.max;
                  });
                } 
                if (e.mesure == 'humidity' && e.id_exploitation == selectedValue) {
                  e.mean_min_max_24h.forEach(element => {
                    this.listH.push(element)
                    this.arrayHumidity.push(element)
                    this.capteurHumidity = e.id_capteur;
                  });
                  e.mean_min_max_7j.forEach(element => {
                    this.minH = element.min;
                    this.maxH = element.max;
                    this.meanH = element.mean;
                  });
                }
                if (e.mesure == 'light' && e.id_exploitation == selectedValue) {
                  e.mean_min_max_24h.forEach(element => {
                    this.listL.push(element)
                    this.arrayLuminosite.push(element)
                    
              this.capteurLuminosity =  e.id_capteur;
                  });
                  e.mean_min_max_7j.forEach(element => {
                    this.minL = element.min;
                    this.meanL = element.mean;
                    this.maxL = element.max;
                    this.light_existe = true;
                  });
                }
              if ( e.id_exploitation == selectedValue) {
                  e.data.forEach(element => {
                  if (element.mesure == 'temperature') {
                    this.mesureT = element
                    element.value.forEach(element => {
                      this.value.push(element)
                    });
                  } 
                  if (element.mesure == 'humidity') {
                    this.mesureH = element
                    element.value.forEach(element => {
                      this.valueH.push(element)
                      this.nbrMesureH.push(element.value)
                    });
                  }
                  if (element.mesure == 'light') {
                    this.mesureL = element;
                    element.value.forEach(element => {  
                      this.valueL.push(element)
                      this.nbrMesureL.push(element.value)
                    });}
                  }); 
                } 
            });
            this.mesure.forEach((elm) => {
              if (elm['mesure'] == 'temperature' && elm['id_exploitation'] == selectedValue) {
                this.temperatureMeanValue = elm['mean_value'];
                this.capteurTemperature = elm['id_capteur'];
              }
              if (elm['mesure'] == 'humidity' && elm['id_exploitation'] == selectedValue) {
                this.humidityMeanValue = elm['mean_value'];
                this.capteurHumidity = elm['id_capteur'];
              }
              if (elm['mesure'] == 'light' && elm['id_exploitation'] == selectedValue) {
                this.luminositeMeanValue = elm['mean_value'];
                this.capteurLuminosity = elm['id_capteur'];
              }
            })
            } 
          })
      setTimeout(() => {
      
        //this.dernierMesureT = this.value[0].value;
        // if(this.dernierMesureH){ this.dernierMesureH = this.valueH[0].value}
        // if(this.dernierMesureL){ this.dernierMesureL = this.valueL[0].value}
       
      }, 2000);

    
        }
        ngOnInit() {
          this.getExploitation();
           this.getMesure()
          this.getForcast()
         // this.getCapteur_Table();
         // this.getProduit();
         // this.DateF = this.datepipe.transform(MyDateF,'yyy-MM-dd') 
        
         // this.DateD = this.datepipe.transform(MyDateD,'yyy-MM-dd') 
        // this.dateChangeD(MyDateD);
        // this.dateChangeF(MyDateF);
       //  this.getBarrage();
         

setTimeout(() => {
 
  this.changeExploitation(this.selectedID_EXP);
  this.DataBarrageByProvince = [];
  
 // this.getBarrage();

}, 6000);

        }
        ngOnDestroy() {
          this.alive = false; 
          this.themeSubscription.unsubscribe();
        }
        convert(str) {
          let var_= str.trim().split("T");
          var  hour = var_[1].trim().split(":");
          return hour[0]+":"+hour[1]
        }

        isEmptyObject(obj){
          return (obj && (Object.keys(obj).length === 0))
        }




}