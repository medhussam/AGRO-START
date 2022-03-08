import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component,ViewChild, Input, OnChanges, OnInit, ElementRef } from '@angular/core'; 
  
import { NbIconConfig, NbThemeService } from '@nebular/theme';
import { AlertesService } from 'app/_services/alertes.service';

import { CapteureService } from 'app/_services/capteure.service';




import { ExploitationService } from 'app/_services/exploitation.service';
import { debug, time } from 'console';
import { dateFormat } from 'highcharts';
import { DateRangePickerResourceStringsEN } from 'igniteui-angular/lib/core/i18n/date-range-picker-resources';
import { LocalDataSource } from 'ng2-smart-table';
import { isTemplateExpression } from 'typescript';
import { ButtonViewComponent } from './button-view/button-view.component';


@Component({
  selector: 'ngx-alertes',
  templateUrl: './alertes.component.html',
  styleUrls: ['./alertes.component.scss']
})
export class AlertesComponent implements OnInit{



  dataAlerte : any[] = [];
  dataAlerte1 : any[] = [];
  dataAlerte2 : any[] = [];
  typesalt : any[] = [];
  niveaux : any[] = [];
  postID: any;

  dataTable : any[] = [];
  test : any[] = [];
  settings:any;
  exploitations : any[] = [];
  capteurs : any[] = [];
  id_capteurs: any[] = [];
  mesureTypes: any[] = [];
  mesures: any[]=[]

  countNiv : any[] = [];
  countTypes : any[] = [];
  testcount: boolean =true;

  filtreTable1 : any[] = [];

  Allid_capteurs: any[] = [];
  AllmesureTypes: any[] = [];

  labelniv="Alertes par niveaux";
  labeltyp="Alertes par types";

  AlertseventExp = "all";
  AlertseventCap= "all";
  AlertseventMes= "all";
  AlertseventType= "all";
  AlertseventDD= "all";
  AlertseventDF= "all";
  AlertseventLevel = "all";

  DateD = (new Date ).toISOString().slice(0,10)
  DateD1 = new Date ;
  DateF = (new Date).toISOString().slice(0,10)

  alertsbylevel : any[] = [];
  alertsbytype : any[]=[];

  selectedRows : any ;

  countCRITICAL = 0;
  countWARNING = 0;
  countOK = 0;

  myalert(){
    console.log("----")
  }


  dateFrom(event){
    console.log(event.toISOString())
    this.DateD = event.toISOString().slice(0,10)
    this.filtresTables()
  }
  dateTo(event){
  console.log(event.toISOString())
  this.DateF = event.toISOString().slice(0,10)
  this.filtresTables()
  }


  alertsbylevel_ :any[] = ["Critique","Avertissement","Résolu"];
  alertsbytype_: any[] =["Manquantes","Abérrantes","Rupture"];

  ngOnInit() {

    this.DateD1.setDate(this.DateD1.getDate() -30)
    this.DateD = this.DateD1.toISOString().slice(0,10)
    this.typesalt = [
      {title:"Manquante",value:"Mqt"},
      {title:"Abérrante",value:"Abr"},
      {title:"Rupture",value:"Cmp"}
    ]

    this.niveaux = [
      {title:"Critique",value:"CRITICAL"},
      {title:"Avertissement",value:"WARNING"},
      {title:"Résolu",value:"OK"},
      {title:"Information",value:"INFO"}
    ] 


    
this.settings['rowClassFunction'] = (row) => {
  if(row.data.vu == 'true'){

    return 'myclass_vu';
  }
}


    this.capteureService.getCapteures().subscribe( item => {

      item["features"].forEach(element => {
        this.capteurs.push(element.properties)
        this.id_capteurs.push(element.properties.id_capteur)
        this.mesureTypes.push(element.properties.mesure)

      });

      this.id_capteurs = this.id_capteurs.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })

      this.mesureTypes = this.mesureTypes.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.Allid_capteurs = this.id_capteurs
      this.AllmesureTypes = this.mesureTypes


    }) 


    this.exploitationService.getExploitations().subscribe((item)=> {
      item["features"].forEach(element => {
        this.exploitations.push(element)
      });
    }) 

    this.alerteService.getAlertesTypesCount().subscribe((item1)=> {
      console.log(item1);
      item1.forEach(element1 => {
       this.alertsbytype.push(element1)
       this.alertsbytype_.push(element1)
       this.countTypes.push(element1)

     });
          
       
     }) 


     this.alerteService.getAlertesLevelCount().subscribe((item)=> {
     console.log(item);
     item.forEach(element => {
      this.alertsbylevel.push(element)
      this.alertsbylevel_.push(element)
      this.countNiv.push(element)
    }    
    );
          
    })
    
    this.countCRITICAL = 0;
    this.countWARNING = 0;
    this.countOK = 0;


    this.alerteService.getAlertes().subscribe((item) =>{
        this.dataAlerte.push(item)

        this.dataAlerte = this.dataAlerte[0]

        this.dataAlerte.forEach(element => {
          element.time = element.time.slice(0,19)
          if (element.level == "CRITICAL"){
this.countCRITICAL++; 

            element.icon = '<div class="set_center"><i class="fas fa-circle critical"  ></i></div>'
            element.niveau = "critique"
          }else if (element.level == "OK"){
this.countOK++; 

            
            element.icon = '<div class="set_center"><i class="fas fa-circle ok"  ></i></div>'
            element.niveau = "ok"

          }else if (element.level == "WARNING"){
            element.icon = '<div class="set_center"><i class="fas fa-circle warning"  ></i></div>'
            element.niveau = "avertissement"
            this.countWARNING++; 
          }
          switch (element.name) {
            case "soil_conductivity":
                element.nom = "Conductivité du sol"
                break
                
            case "soil_temperature":
                element.nom = "Température du sol"
                break
                
            case "soil_humidity":
              element.nom = "Humidité du sol"
              break
                
            case "temperature":
              element.nom = "Température"
              break
                
            case "humidity":
              element.nom = "Humidité"
              break
              
            case "ultrasonic_level":
              element.nom = "Niveau d'eau"
              break
            
            case "light":
              element.nom = "Luminosité"
                break;
            case "wind_speed":
              element.nom = "Vitesse de vent"
                break;
            
                case "gustSpeed":
              element.nom = "Rafales de vent"
                break;
        }
        
          element.iconvu =' Alerte de niveau : ' +element.niveau + ', pour le capteur : '+ element.tags + ', et la mesure : '+element.nom+'; valeur:'+element.value
          
        });  
    })

    this.dataTable = this.dataAlerte
    this.dataAlerte2 = this.dataAlerte
      
  }
  
  levelsIconConfig: NbIconConfig = { icon: 'layer-group', pack: 'fa' };
  typesIconConfig: NbIconConfig = { icon: 'question-circle', pack: 'fa' };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private theme: NbThemeService,private exploitationService: ExploitationService,
    private capteureService: CapteureService,
    private alerteService: AlertesService,
    private http: HttpClient) {

      
  
    
    
      this.settings = {
        noDataMessage: "Pas d'alertes trouvées, veuillez changer les filtres",
        
       selectMode : 'multi',
       actions: {
         delete : false,
         add : false,
         edit : false,
         select : false,
       }, 
       pager: {perPage:23},

      
       columns: {
        iconvu: {
          title: 'Vu',
          type: 'custom',
          renderComponent: ButtonViewComponent,
          filter: false, 
        },
         id: {
           title: 'ID Alerte',
           type: 'string',
            filter: false,
           
         },

         icon: {
           title: 'Niveau',
           type: 'html',
           filter: false,
      
         },

         time: {
          title: 'Date',
          type: 'string',
          filter: false,
        },
         matricule: {
          title: 'Exploitation',
          type: 'string',
          filter: false,
        },
        

       },
     };

  }

  checkcount(count){

  let i = 0;
  console.log("typ : "+ count)
  count.forEach(elem =>{
  if (elem != 0){
    i = i+1
    }
  })
  if (i== 0){
    return false
  }
  else {
    return true
  }

}
  allalerttoseen(){
   this.alerteService.allAlertSeen().subscribe();
   
   setTimeout(() => {
     this.exit();
     
   }, 2000);
  
      
  }



  changeExploitation(event){
    this.AlertseventExp = event
    this.filresExpMesCap()
    this.filtresTables()
  }
  countAlertes(){
    
    this.countTypes[0] = this.dataAlerte.filter(u => 
      u.id.slice(0,3) == "Mqt" );
    this.countTypes[0] = this.countTypes[0].filter(o =>
        o.vu == "false");

      this.countTypes[0] = this.countTypes[0].length;


    this.countTypes[1] = this.dataAlerte.filter(u => 
      u.id.slice(0,3) == "Abr" )
    this.countTypes[1] = this.countTypes[1].filter(o =>
        o.vu == "false");

      this.countTypes[1]=this.countTypes[1].length
  
    this.countTypes[2] = this.dataAlerte.filter(u => 
      u.id.slice(0,3) == "Cmp" )
    this.countTypes[2] = this.countTypes[2].filter(o =>
        o.vu == "false");

    this.countTypes[2] = this.countTypes[2].length

    console.log(this.countTypes)

    
    this.countNiv[0] = this.dataAlerte.filter(u => 
      u.level == "CRITICAL" )
    this.countNiv[0] = this.countNiv[0].filter(o =>
        o.vu == "false");
    this.countNiv[0]= this.countNiv[0].length

    this.countNiv[1] = this.dataAlerte.filter(u => 
      u.level == "WARNING" )
      this.countNiv[1] = this.countNiv[1].filter(o =>
        o.vu == "false");
    this.countNiv[1]= this.countNiv[1].length

    this.countNiv[2] = this.dataAlerte.filter(u => 
      u.level == "OK" )
      this.countNiv[2] = this.countNiv[2].filter(o =>
        o.vu == "false");
    this.countNiv[2]= this.countNiv[2].length

    console.log(this.countNiv)
    
    
  }


  dateg(filterResult){
    filterResult = filterResult.filter(u => 
      u.time.toString() >= this.DateD.toString() )
  }

  dates(filterResult){
    filterResult = filterResult.filter(u => 
      u.time.toString() <= this.DateF.toString() )
  }

  changeCapteur(event){
    this.AlertseventCap = event
    this.filtresTables()  
  }

  changeType(event){
    this.AlertseventType = event

    this.filtresTables()
  }
  
  
  changeLevel(even){
    this.AlertseventLevel = even
    this.filtresTables()
  }

  exit(){
    window.location.reload();
  }
  filtre_cap :any ;
  filtre_type :any ;
  filtre_mes :any ;
  filtre_lvl :any ;
  filtre_exp :any ;
  
  exit1(){

   
    this.filtre_cap = "all";
    this.filtre_type = "all";
    this.filtre_exp = "all";
    this.filtre_lvl = "all";
    this.filtre_mes = "all";
    this.AlertseventCap= "all";
    this.AlertseventMes= "all";
    this.AlertseventType= "all";
    this.AlertseventDD= "all";
    this.AlertseventDF= "all";
    this.AlertseventLevel = "all"
    this.AlertseventExp = "all";
    this.changeCapteur('all')
    this.changeExploitation('all')
    this.changeLevel('all')
    this.changeMesure('all')
    this.changeType('all')

    this.filtresTables()
  }


  changeMesure(event){
    this.AlertseventMes = event
    this.filresExpMesCap()
    this.filtresTables()

  }



  translateMesure(mesure){
    switch (mesure) {
      case "soil_conductivity":
        mesure.nom = "Conductivité du sol"
          break
          
      case "soil_temperature":
        mesure.nom = "Température du sol"
          break
          
      case "soil_humidity":
        mesure.nom = "Humidité du sol"
        break
          
      case "temperature":
        mesure.nom = "Température"
        break
          
      case "humidity":
        mesure.nom = "Humidité"
        break
        
      case "ultrasonic_level":
        mesure.nom = "Niveau d'eau"
        break
      
      case "light":
        mesure.nom = "Luminosité"
          break;
  }

  };

  filresExpMesCap(){
    if((this.AlertseventExp=="all" || this.AlertseventExp==undefined) && (this.AlertseventMes=="all" || this.AlertseventMes==undefined)){
     this.id_capteurs = this.Allid_capteurs
     this.mesureTypes = this.AllmesureTypes
   }else if((this.AlertseventExp=="all" || this.AlertseventExp==undefined) && (this.AlertseventMes!="all" && this.AlertseventMes!=undefined )){

     var id_capteurs = []
     this.capteurs.forEach(element => {
       if(element.mesure ==  this.AlertseventMes){
         id_capteurs.push(element.id_capteur)
       }  
     });

     id_capteurs = id_capteurs.filter(function(elem, index, self) {
       return index === self.indexOf(elem);
     })

     this.id_capteurs = id_capteurs
     this.mesureTypes = this.mesureTypes

   }else if((this.AlertseventExp!="all" && this.AlertseventExp!=undefined) && (this.AlertseventMes=="all" || this.AlertseventMes==undefined)){

     var id_capteurs = []
     var mesureTypes = []
     this.capteurs.forEach(element => {

       if(element.id_exploitation ==  this.AlertseventExp){

         id_capteurs.push(element.id_capteur)

         mesureTypes.push(element.mesure)
       }  
     });


     id_capteurs = id_capteurs.filter(function(elem, index, self) {
       return index === self.indexOf(elem);
     })
     this.id_capteurs = id_capteurs

     mesureTypes = mesureTypes.filter(function(elem, index, self) {
       return index === self.indexOf(elem);
     })
     this.mesureTypes = mesureTypes

   }else if((this.AlertseventExp!="all" && this.AlertseventExp!=undefined) && (this.AlertseventMes!="all" && this.AlertseventExp!=undefined)){

     var id_capteurs = []
     var mesureTypes = []
     this.capteurs.forEach(element => {
       if(element.id_exploitation ==  this.AlertseventExp){
         mesureTypes.push(element.mesure)
       }  
     });

     this.capteurs.forEach(element => {
       if(element.id_exploitation ==  this.AlertseventExp && element.mesure ==  this.AlertseventMes){
         id_capteurs.push(element.id_capteur)
       }  
     });

     id_capteurs = id_capteurs.filter(function(elem, index, self) {
       return index === self.indexOf(elem);
     })
     this.id_capteurs = id_capteurs

     mesureTypes = mesureTypes.filter(function(elem, index, self) {
       return index === self.indexOf(elem);
     })
     this.mesureTypes = mesureTypes
   }
  }

  onRowSelect(event){
    this.selectedRows = event.selected;
  }
  
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }

  onClick(){
    console.log(this.selectedRows);
    
    this.selectedRows.forEach(element => {

      this.http.post<any>('http://10.10.100.111:3004/alertseen/',{
        "id_alert": element._id
      },
      {
        headers: {
          "x-access-token": this.getToken(),
          "accept": "*/*"
        }
      }).subscribe(dataa => {
        this.postID = dataa;
      })
     element.vu = 'true';
  
      
    });
  }



  filtresTables(){
   
    this.dataAlerte = this.dataAlerte2[0]

    
    let filterResult: any = this.dataAlerte

    if (this.AlertseventExp != undefined && this.AlertseventExp != "all"){
      
      filterResult = filterResult.filter(u => 
        u.id_exploitation == this.AlertseventExp ); 
    }
    if (this.AlertseventCap != undefined && this.AlertseventCap != "all"){
      filterResult = filterResult.filter(u => 
        u.tags== this.AlertseventCap ); 
    }
    if (this.AlertseventMes != undefined && this.AlertseventMes != "all"){
      filterResult = filterResult.filter(u => 
        u.name== this.AlertseventMes ); 
    }
    if (this.AlertseventType != undefined && this.AlertseventType != "all"){
      filterResult = filterResult.filter(u => 
        u.id.slice(0,3)== this.AlertseventType ); 
    }  

    if (this.AlertseventLevel != undefined && this.AlertseventLevel != "all"){
      console.log(this.AlertseventLevel)
      filterResult = filterResult.filter(u => 
        u.level == this.AlertseventLevel ); 
    }
    if (this.DateD != undefined && this.DateD != ""){
      console.log(this.DateD)
      filterResult = filterResult.filter(u => 
        u.time.slice(0,10) >= this.DateD ); 
        console.log("rah dkhel l dateg")    
    }
    if (this.DateF != undefined && this.DateF != ""){
      console.log("rah dkhel l dates")
      filterResult = filterResult.filter(u => 
        u.time.slice(0,10) <= this.DateF ); 
    }

    
    console.log(this.DateF)

    this.dataAlerte = filterResult
    this.countAlertes()
    console.log(this.dataAlerte)
    console.log(this.AlertseventCap)

      
}

}

  
