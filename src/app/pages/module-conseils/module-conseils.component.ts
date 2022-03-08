import { Component, OnInit } from '@angular/core';
import { NbIconConfig, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from '@angular/platform-browser';
import { VapoService } from 'app/_services/vapo.service';
import { ParcelleService } from 'app/_services/parcelle.service';
import { ExploitationService } from 'app/_services/exploitation.service';
interface CardSettings {
  name: string;
  title1: string;
  title2: string;
  value1: string;
  value2: string;
  iconClass1: string;
  iconClass2: string;
  type: string;
}
interface CardSettingsInfo {
  name: string;
  name1: string;
  Moyenne1: string;
  Maximum1: string;
  Minimum1: string;
  Ecart_type1: string;
  img1: string;
  name2: string;
  Moyenne2: string;
  Maximum2: string;
  Minimum2: string;
  Ecart_type2: string;
  img2: string;
  type: string;
}
@Component({
  selector: 'ngx-module-conseils',
  templateUrl: './module-conseils.component.html',
  styleUrls: ['./module-conseils.component.scss']
})

export class ConseilsComponent implements OnInit {


  MethodeJ_Output = 'P';  
   
  receivename($event: string) {  
  this.MethodeJ_Output = $event;  
  } 

  


  getparcelle_data : any[] = [];
  getgetparcelle_data(selectedParcelle) { 
    this.getparcelle_data = [];
    
    this.parcelleService.getparcelle_data(selectedParcelle).subscribe(item => {
      this.getparcelle_data = item;  
     
    })
  };
  

  eventParcelle;
  eventExploitation;
  statusCards: string;
  cardSettingsInfo: string;
  alive = true;
  Parcelle: any[] = [];
  exploitation: any[] = [];
  selectedParcelle;
  evapoDataChartDaily: any[] = [];
  evapoDataChartMonthly: any[] = [];
  methodes: any[] = [];
  exploitationSelected;
  selectedEXP;
  // bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
  // waterIcon: NbIconConfig =  { icon: 'water', pack: 'fa' };
  // TIcon: NbIconConfig = { icon: 'thermometer-half', pack: 'fa' };
  // HIcon: NbIconConfig = { icon: 'tint', pack: 'fa' };
  penmanMontieth: CardSettingsInfo = 
  {name: 'Statistiques sur 7 jours', 
  name1: 'PENMAN-MONTEITH',
   Moyenne1: '--.--', 
   Maximum1: '--.--',
    Minimum1: '--.--',
     Ecart_type1: '--.--',
      img1: "../../assets/images/1.png",
       type: 'light',
  name2: 'HARGREAVES', Moyenne2: '--.--', Maximum2: '--.--', Minimum2: '--.--', Ecart_type2: '--.--', img2: "../../assets/images/3.png" };
  BlaniyCriddle: CardSettingsInfo = { name: 'Statistiques sur trois Mois',name1: 'THORNTHWAITE ', Moyenne1: '--.--', Maximum1: '--.--', Minimum1: '--.--', Ecart_type1: '--.--', img1: "../../assets/images/4.png", type: 'info',
  name2: 'BLANEY-CRIDDLE', Moyenne2: '--.--', Maximum2: '--.--', Minimum2: '--.--', Ecart_type2: '--.--', img2: "../../assets/images/2.png" };
  // hargreaves: CardSettingsInfo = { name2: 'HARGREAVES', Moyenne2: '--.--', Maximum2: '--.--', Minimum2: '--.--', Ecart_type2: '--.--', iconClass2: "../../assets/images/3.png", type: 'info', };
  // fao_56: CardSettingsInfo = { name2: 'F A O 56', Moyenne2: '--.--', Maximum2: '--.--', Minimum2: '--.--', Ecart_type2: '--.--', iconClass2: "../../assets/images/4.png", type: 'warning', };


  lightCard: CardSettings = { name: 'Méthodes Jounalières à la date du ()', title1: 'PENMAN-MONTEITH', title2: 'HARGREAVES', value1: '--.-- mm/j', value2: '--.-- mm/j', iconClass1: "../../assets/images/1.png", iconClass2: "../../assets/images/3.png", type: 'light', };
  rollerShadesCard: CardSettings = {name: 'Méthodes Mensuelles du mois de ()', title1: 'THORNTHWAITE',title2: 'BLANEY-CRIDDLE', value1: '--.-- mm/mois',value2: '--.-- mm/j', iconClass1: "../../assets/images/4.png", iconClass2: "../../assets/images/2.png", type: 'info', };
  // wirelessAudioCard: CardSettings = { title: 'HARGREAVES', value: '--.-- mm/j', iconClass: "../../assets/images/3.png", type: 'info', };
  // coffeeMakerCard: CardSettings = { title: 'F A O 56', value: '--.-- mm/j', iconClass: "../../assets/images/4.png", type: 'warning', };
  commonStatusCardsSet: CardSettings[] = [this.lightCard, this.rollerShadesCard];
  commonStatusCardsSetInfo: CardSettingsInfo[] = [this.penmanMontieth, this.BlaniyCriddle];
  statusCardsByThemes =
    {
      default: this.commonStatusCardsSet,
      dark: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [{ ...this.lightCard, type: 'warning', }, { ...this.rollerShadesCard, type: 'primary', }],
    };
  cardSettingsInfoByThemes =
    {
      default: this.commonStatusCardsSetInfo,
      dark: this.commonStatusCardsSetInfo,
      cosmic: this.commonStatusCardsSetInfo,
      corporate: [{ ...this.penmanMontieth, type: 'warning', }, { ...this.BlaniyCriddle, type: 'primary', }],
    };
  constructor(private themeService: NbThemeService, private vapoService: VapoService, private parcelleService: ParcelleService, private serviceExp: ExploitationService) {
    this.themeService.getJsTheme().pipe(takeWhile(() => this.alive)).subscribe(theme => {
      this.statusCards = this.statusCardsByThemes[theme.name];
      this.cardSettingsInfo = this.cardSettingsInfoByThemes[theme.name];
    });
    // this.themeService.getJsTheme().pipe(takeWhile(() => this.alive)).subscribe(theme => {this.cardSettingsInfo = this.cardSettingsInfoByThemes[theme.name];});
   
  }

  ngOnInit(): void {
    this.getExp();
    
  setTimeout(() => { 
    this.getgetparcelle_data(this.selectedParcelle);
  }, 2000);
    
  }

  
isEmptyObject(obj){
  return (obj && (Object.keys(obj).length === 0))
}
  getDataVapo(idParcelle) {
    this.lightCard.value1 = '--.-- mm/j';
    this.rollerShadesCard.value1 = '--.-- mm/mois';
    this.lightCard.value2 = '--.-- mm/j';
    this.rollerShadesCard.value2 = '--.-- mm/mois';
    this.vapoService.getVapo(idParcelle).subscribe(data => {
       console.log(data);
      data.forEach(element => {
        if (element.methode == 'FAO_56') {
          this.lightCard.value1 = element.et0.toFixed(2) + ' mm/j';
          this.lightCard.name = 'Méthodes Jounalières à la date du ' + this.convert(element.time);
        }
        if (element.methode == 'Blaney-Criddle') {
          this.rollerShadesCard.value2 = element.et0.toFixed(2) + ' mm/mois';
          this.rollerShadesCard.name = 'Méthodes Mensuelles du mois de ' + this.convert2(element.time);
        }
        if (element.methode == 'hargreaves') {
          this.lightCard.value2 = element.et0.toFixed(2) + ' mm/j';
        }
        if (element.methode == 'Thornthwaite') {
          this.rollerShadesCard.value1 = element.et0.toFixed(2) + ' mm/mois';
        }
      });

    })
  }
  getDataVapoWeekly(id_parcelle) {
    this.BlaniyCriddle.Maximum1 = '--.-- mm/mois';
    this.BlaniyCriddle.Moyenne1 = '--.-- mm/mois';
    this.BlaniyCriddle.Minimum1 = '--.-- mm/mois';
    this.BlaniyCriddle.Ecart_type1 = '--.-- mm/mois';
    this.penmanMontieth.Maximum1 = '--.-- mm/7j';
    this.penmanMontieth.Moyenne1 = '--.-- mm/7j';
    this.penmanMontieth.Minimum1 = '--.-- mm/7j';
    this.penmanMontieth.Ecart_type1 = '--.-- mm/7j';
    this.BlaniyCriddle.Maximum2 = '--.-- mm/mois';
    this.BlaniyCriddle.Moyenne2 = '--.-- mm/mois';
    this.BlaniyCriddle.Minimum2= '--.-- mm/mois';
    this.BlaniyCriddle.Ecart_type2 = '--.-- mm/mois';
    this.penmanMontieth.Maximum2 = '--.-- mm/7j';
    this.penmanMontieth.Moyenne2 = '--.-- mm/7j';
    this.penmanMontieth.Minimum2 = '--.-- mm/7j';
    this.penmanMontieth.Ecart_type2 = '--.-- mm/7j';
    this.vapoService.getVapoWeekly(id_parcelle).subscribe(data => {
      // console.log(data.hargreaves[0].time)
      console.log(data)
      this.penmanMontieth.Maximum1 = data.FAO_56[0].maximum.toFixed(2) + ' mm/7j';
      this.penmanMontieth.Moyenne1 = data.FAO_56[0].moyenne.toFixed(2) + ' mm/7j';
      this.penmanMontieth.Minimum1 = data.FAO_56[0].minimum.toFixed(2) + ' mm/7j';
      this.penmanMontieth.Ecart_type1 = data.FAO_56[0].ecart_type.toFixed(2) + ' mm/7j';
      this.BlaniyCriddle.Maximum2 = data.blaney_criddle[0].maximum.toFixed(2) + ' mm/mois';
      this.BlaniyCriddle.Moyenne2 = data.blaney_criddle[0].moyenne.toFixed(2) + ' mm/mois';
      this.BlaniyCriddle.Minimum2 = data.blaney_criddle[0].minimum.toFixed(2) + ' mm/mois';
      this.BlaniyCriddle.Ecart_type2 = data.blaney_criddle[0].ecart_type.toFixed(2) + ' mm/mois';
      this.penmanMontieth.Maximum2 = data.hargreaves[0].maximum.toFixed(2) + ' mm/7j';
      this.penmanMontieth.Moyenne2 = data.hargreaves[0].moyenne.toFixed(2) + ' mm/7j';
      this.penmanMontieth.Minimum2 = data.hargreaves[0].minimum.toFixed(2) + ' mm/7j';
      this.penmanMontieth.Ecart_type2 = data.hargreaves[0].ecart_type.toFixed(2) + ' mm/7j';
      this.BlaniyCriddle.Maximum1 = data.thornthwaite[0].maximum.toFixed(2) + ' mm/mois';
      this.BlaniyCriddle.Moyenne1 = data.thornthwaite[0].moyenne.toFixed(2) + ' mm/mois';
      this.BlaniyCriddle.Minimum1 = data.thornthwaite[0].minimum.toFixed(2) + ' mm/mois';
      this.BlaniyCriddle.Ecart_type1 = data.thornthwaite[0].ecart_type.toFixed(2) + ' mm/mois';

    })
  }

  evapotranspiration_period(id_parcelle) {
    this.vapoService.evapotranspiration_period(id_parcelle).subscribe(data=>{
     
      this.evapoDataChartDaily = data.daily;
      this.evapoDataChartMonthly = data.monthly;
    })
  }

  getExp() {
    this.serviceExp.getExploitations().subscribe((data) => {

      data.features.forEach(element => {
        this.exploitation.push(element)
        // console.log(element.properties.id_exploitation)

      });
    }).add(d => {
      this.exploitationSelected = this.exploitation[0].properties.id_exploitation;
      this.selectedEXP = this.exploitation[0].properties.matricule;
      
      this.getParcelle(this.exploitation[0].properties.id_exploitation);
    })
  }
  getParcelle(id_exploitation) {
    this.Parcelle = [];
    this.parcelleService.getParcelles_exp(id_exploitation).subscribe(data => {
  
      data.forEach(element => {
        if (element.id_parcelle == element.parcelle_rep) {
          // console.log(element);
     this.Parcelle.push(element);
     }
      });
    }).add(d => {
      this.selectedParcelle = this.Parcelle[0].id_parcelle;
      this.getDataVapo(this.Parcelle[0].id_parcelle);
      this.getDataVapoWeekly(this.Parcelle[0].id_parcelle);
      this.evapotranspiration_period(this.Parcelle[0].id_parcelle);
    })
  }
  explSelected(event) {
    // console.log(event);
    this.getParcelle(event);
    this.exploitationSelected = event;
      
  setTimeout(() => { 
    this.getgetparcelle_data(this.selectedParcelle);
  }, 1000);
  }
  parcelleSelcted(event) {
    // console.log(event)
    this.getDataVapo(event);
    this.getDataVapoWeekly(event);
    this.evapotranspiration_period(event);
  }

  convert(str) {
   
 
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
  
    switch (mnth) {
      case "01": {
        return [day,"Jan"].join(" ");
        break;
      }
      case "02": {
        return [day,"Fev"].join(" ");
        break;
      }
      case "03": {
        return [day,"Mars"].join(" ");
        break;
      }
      case "04": {
        return [day,"Avr"].join(" ");
        break;
      }
      case "05": {
        return [day,"Mai"].join(" ");
        break;
      }
      case "06": {
        return [day,"Juin"].join(" ");
        break;
      }
      case "07": {
        return [day,"Juillet"].join(" ");
        break;
      }
      case "08": {
        return [day,"Aout"].join(" ");
        break;
      }
      case "09": {
        return [day,"Sep"].join(" ");
        break;
      }
      case "10": {
        return [day,"Oct"].join(" ");
        break;
      }
      case "11": {
        return [day,"Nov"].join(" ");
        break;
      }
      case "12": {
        return [day,"Dec"].join(" ");
        break;
      }
    }}
    convert2(str) {
   
 
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    
      switch (mnth) {
        case "01": {
          return "jan";
          break;
        }
        case "02": {
          return "Fev";
          break;
        }
        case "03": {
          return "Mars";
          break;
        }
        case "04": {
          return "Avr";
          break;
        }
        case "05": {
          return "Mai";
          break;
        }
        case "06": {
          return "Juin";
          break;
        }
        case "07": {
          return "juillet";
          break;
        }
        case "08": {
          return "Aout";
          break;
        }
        case "09": {
          return "sep";
          break;
        }
        case "10": {
          return "oct";
          break;
        }
        case "11": {
          return "nov";
          break;
        }
        case "12": {
          return "dec";
          break;
        }
      }}
}
