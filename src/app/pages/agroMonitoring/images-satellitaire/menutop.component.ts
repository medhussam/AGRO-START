import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AgroMonitoringService } from 'app/_services/agro_monitoring.service';
import { ExploitationService } from 'app/_services/exploitation.service';
import { ParcelleService } from 'app/_services/parcelle.service';
import { Console } from 'console';
import { IgxOverlayService } from 'igniteui-angular';

 

declare let L;
@Component({
 selector: 'ngx-menutop',
 styleUrls: ['./menutop.component.scss'],
 templateUrl: './menutop.component.html',
 
})
export class MenutopComponent implements OnInit {

  cloud = '<i class="fa fa-home"></i>';

  selectedValue: any;
  date0: any;
  selected: any;
  exploitetion : any[] = [];
  Carto_data : any[] = [];
  Carto_current_data : any[] = [];
  selectedID_EXP: any;
  dateNOW : any;
  measurement = 'ndvi';
   
  
  Datedebut__ = new Date()
  Datedebut = ''
  Datefin  = this.convertdateSearh(new Date()); 
  
  Datefin_  = new Date(); 
  Datedebut_ :any;
  constructor(private theme: NbThemeService,private parcelleService  :ParcelleService,
    private agro_monitoringService: AgroMonitoringService, private exploitationService: ExploitationService ,
    public element: ElementRef,private overlayService: IgxOverlayService){


      this.Datedebut__.setMonth(this.Datedebut__.getMonth() - 2);
      this.Datedebut = this.convertdateSearh(this.Datedebut__);
      this.Datedebut_ = new Date(this.Datedebut__);
    }

  ngOnInit(){
    this.getExploitation();
   
    this.exploitationService.getExploitations().subscribe((item)=> {
      item["features"].forEach(element => {
       
        this.exploitations.push({"id_exploitation":element.properties.id_exploitation, "matricule" :element.properties.matricule})
     
      });
    }) 
       
    this.parcelleService.getParcellesImagery().subscribe((item) => {
      
      this.allImageryData = item

      item.forEach(element => {

        if(element.id_parcelle == this.selectedParcelle){
          element.tiles.forEach(e => {
          this.dateParcelle.push(e);
    });

         

        }
      });
    this.date0 = this.dateParcelle[0].time;
    this.changeDate(this.date0);
    })

    setTimeout(() => {
     
  
     
      this.getParcelle_par_Exploitation(this.selectedID_EXP);
      this.changeExploitation(this.selectedID_EXP);
      this.changeIndice("tile_truecolor");
      this.dateNOW = this.convert(this.dates[0]);
      this.getgetparcelle_data(this.selectedParcelle);
     
      this.getCarto_current_data(this.selectedID_EXP,this.convert_oneDate(this.dates[0]));
     
      
    }, 4000); 
  }
  dateParcelle : any[] = [];
  cloud_coverage : any[] = [];

 // Exploitations DATA
 getExploitation() { 
  this.exploitationService.getExploitations().subscribe(item => {
    let sel = true;
   // console.log(item);
    item['features'].forEach(element => {
        this.exploitetion.push(element);  
        if(sel == true){
          this.selectedID_EXP  = element.properties.id_exploitation;
          this.ExploitationEvent  = element.properties.id_exploitation;
          this.selectedValue = element.properties.matricule;
          sel = false;
        } 
       
    });
  })

}


getCarto_data(selectID_EXP,measurement,debut,fin) { 
  

  this.agro_monitoringService.getCarto_data(debut,fin,measurement,selectID_EXP).subscribe(item => {
    this.Carto_data = item;


  
  })
 
}


changeParcelle(event){
   
   this.selectedParcelle = event 

  this.dateParcelle = [];
  this.cloud_coverage = [];

  this.allImageryData.forEach(element => {

    if(element.id_parcelle == event){
      element.tiles.forEach(e => {
      this.dateParcelle.push(e);
     this.cloud_coverage.push(e.cloud_coverage)
});

     

    }
  });
this.date0 = this.dateParcelle[0].time;
this.changeDate(this.date0);
this.getgetparcelle_data(this.selectedParcelle);
this.getCarto_data(this.selectedParcelle,this.measurement,this.Datedebut,this.Datefin);
  
}

parcelleIndexes : any[] = [];
getParcelle_indexes(id_selectedID_EXP,debut,fin){



  this.parcelleService.getParcelle_indexes(id_selectedID_EXP,debut,fin).subscribe(item => {
     this.parcelleIndexes = item;  

  })

}



Parcelle :any[] = [];
ParcellesID :any[] = [];
selectedParcelle : any;
getParcelle_par_Exploitation(id_selectedID_EXP) { 
  this.ParcellesID = [];
  this.parcelleService.getParcelles_exp(id_selectedID_EXP).subscribe(item => {
    let sel = true;
   
    this.Parcelle = item;  
    item.forEach(element => {
      this.ParcellesID.push(element.id_parcelle);  
         if(sel == true){
           this.selectedParcelle = element.id_parcelle;
           sel = false;

           this.parcelleService.getparcelle_data(this.selectedParcelle).subscribe(item => {
              this.getparcelle_data = item;  
            })
           this.getCarto_data(this.selectedParcelle,this.measurement,this.Datedebut,this.Datefin);
         } 
       
    });
  })
} 


getCarto_current_data(selectID_EXP,_Date) { 
  
  let exploitation  = selectID_EXP;
  console.log(this.selectedParcelle,_Date);
  this.agro_monitoringService.getCarto_current_data(this.selectedParcelle,_Date).subscribe(i => {
  this.Carto_current_data = i;
  console.log(this.Carto_current_data);
  
   
  })
 
}


public date: Date = new Date(Date.now());
@Output() dateFrom = new EventEmitter<Date>();
@Output() dateTo = new EventEmitter();
private dayFormatter = new Intl.DateTimeFormat("fr", { weekday: "long" });
private monthFormatter = new Intl.DateTimeFormat("fr", { month: "long" });

public formatterFrom = (date: Date) => {
  this.dateFrom.emit(date)
  return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  
}
public formatterTo = (date: Date) => {
  this.dateTo.emit(`${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`)
  return ` ${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  
}


tile_truecolor = 'tile_truecolor'

dataTable : any[] = [];
settings:any;

exploitations : any[] = [];

dates : any[] = [];
indices : any[] = [{indice : "tile_truecolor", name: "True color"}, {indice : "tile_falsecolor", name: "False color"}, 
{indice : "tile_ndvi", name: "NDVI"}, {indice : "tile_evi", name: "EVI"}, {indice : "tile_evi2", name: "EVI2"}, {indice : "tile_nri", name: "NRI"},
{indice : "tile_dswi", name: "DSWI"}, {indice : "tile_ndwi", name: "NDWI"}];


allImageryData;
ExploitationEvent;
IndiceEvent;
DateEvent;



 

getparcelle_data : any[] = [];
getgetparcelle_data(selectedParcelle) { 
  this.getparcelle_data = [];
  
  this.parcelleService.getparcelle_data(selectedParcelle).subscribe(item => {
    this.getparcelle_data = item;  
   
  })
}


 


changeExploitation(event){
  this.ExploitationEvent = event 

       this.getParcelle_par_Exploitation(event);
       
  this.getCarto_data(this.selectedParcelle,this.measurement,this.Datedebut,this.Datefin);
  this.getParcelle_indexes(this.ExploitationEvent,this.Datedebut,this.Datefin);
   
  setTimeout(() => {
    this.changeParcelle(this.selectedParcelle);
  
  }, 1000);

}

changeIndice(event){
  this.IndiceEvent = event
  this.checkINDICE(event);
  this.getCarto_data(this.selectedParcelle,this.measurement,this.Datedebut,this.Datefin);
  
}

changeDate(event){
  this.DateEvent = event
   
  this.getCarto_current_data(this.selectedID_EXP,this.convert_oneDate(event));



  this.dateNOW = this.convert(event);
}

selectFrom(event){
this.Datedebut = this.convertdateSearh(event); 
this.getCarto_data(this.selectedParcelle,this.measurement,this.Datedebut,this.Datefin);
this.getParcelle_indexes(this.ExploitationEvent,this.Datedebut,this.Datefin)
}

selectTo(event){
  this.Datefin = this.convertdateSearh(event); 
 
  this.getCarto_data(this.selectedParcelle,this.measurement,this.Datedebut,this.Datefin);
  this.getParcelle_indexes(this.ExploitationEvent,this.Datedebut,this.Datefin)
  console.log(this.selectedParcelle,this.measurement,this.Datedebut,this.Datefin);
}
DatedebutParcelles = '';
selectFromParcelles(event){
  this.DatedebutParcelles = this.convertdateSearh(event); 
  this.getParcelle_indexes(this.ExploitationEvent,this.Datedebut,this.Datefin)   
  }
  DatefinParcelles = '';
  selectToParcelles(event){
    this.DatefinParcelles = this.convertdateSearh(event); 
    this.getParcelle_indexes(this.ExploitationEvent,this.Datedebut,this.Datefin)
    console.log(this.ExploitationEvent,this.Datedebut,this.Datefin);
   
  }
convertdateSearh(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    year_ = date.getFullYear();
 
      return [year_,mnth,day].join("-");
     }



isEmptyObject(obj){
  return (obj && (Object.keys(obj).length === 0))
}


convert_oneDate(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    year_ = date.getFullYear();
    return [year_,mnth,day].join("-");
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

checkINDICE(indice){
  if(indice == "tile_truecolor" || indice == "tile_falsecolor" || indice == "tile_ndvi"){
    this.measurement = 'ndvi';
  }else if(indice == "tile_evi"){
    this.measurement = 'evi';
  }else if(indice == "tile_evi2"){
    this.measurement = 'evi2';
  }else if(indice == "tile_nri"){
    this.measurement = 'nri';
  }else if(indice == "tile_dswi"){
    this.measurement = 'dswi';
  }else if(indice == "tile_ndwi"){
    this.measurement = 'ndwi';
}
}




}