// import { AfterViewInit, Component, OnDestroy, OnInit,ElementRef, ViewChild } from '@angular/core';
// import { NbThemeService } from '@nebular/theme';
// import { CapteureService } from 'app/_services/dashboardcapteure.service';
// import { ExploitationService } from 'app/_services/exploitation.service';
// import { MesureService } from 'app/_services/mesure.service';
// import { debug, time } from 'console';
// import { ThumbnailsPosition } from 'ng-gallery';
// import { LocalDataSource } from 'ng2-smart-table';
// import { elementAt } from 'rxjs/operators';
// import { ChartCroissanceComponent } from './chart-croissance/chart-croissance.component';
// import { ChartSpeciauxComponent } from './chart-spé/chart-speciaux.component';
// import { MultipYAxisComponent } from './multip-y-axis/multip-y-axis.component';
// import { UviAndLightComponent } from './uviAndLight/uviandLight.component';

import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'ngx-capteurs',
  templateUrl: './capteurs.component.html',
  styleUrls: ['./capteurs.component.scss'],
})
export class CapteursComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
//   public dateFin: Date = new Date(Date.now());
//   public dateDebut: Date = new Date(Date.now());
//   public datedebutSelected: Date = new Date();
//   public dateFinSelected: Date = new Date();
//   public datedebutSelectedCap: Date = new Date();
//   public dateFinSelectedCap: Date = new Date();
//   public datedebutSelectedSpe: Date = new Date();
//   public dateFinSelectedSpe: Date = new Date();
//     settings:any;
//     allData: any[]= [];
//     nameMesure:any[] = [];
//     dataTable:any[] = [];
//     mesureChanged:any[] = [];
//     capData: any[] = [];
//     rainData: any[] = [];
//     externalData2: any[] = [];
//     dataMesure: any[] = [];
//     expSelected
//     eventPages;
//     eventExploitation;
//     eventCapteur;
//     capteurFalse = false;
//     @ViewChild(ChartCroissanceComponent) child1:ChartCroissanceComponent;
//     @ViewChild(ChartSpeciauxComponent) child2:ChartSpeciauxComponent;
//     @ViewChild(MultipYAxisComponent) child3:MultipYAxisComponent;
//     @ViewChild(UviAndLightComponent) child4:UviAndLightComponent;
//   CapteurInstall: any;
//     pageSelcted(event: string) {
//       this.eventPages = event;
//       this.getDataMesure(this.eventPages,this.datedebutSelectedCap.toISOString(),this.dateFinSelectedCap.toISOString());
//       let eventCapteur = [];
//       this.mesureChanged = []
//       this.allData.forEach(element => {
//         if(event == element.mesure ){
//           eventCapteur.push(element.id_capteur)
//           this.mesureChanged.push(element)
//         }
//       });
//       this.eventCapteur = eventCapteur[0]
//     }
//     explSelected(event) {
    
//       this.nameMesure = [];
//       this.eventExploitation = event;
//       let eventCapteur = []
//       this.allData.forEach(data=>{
//         if(event == data.id_exploitation && data.mesure == this.eventPages){
//           eventCapteur.push(data.id_capteur)
//         }
        
//       this.nameMesure.push(data.mesure);
  
//      }) 
//      this.eventCapteur = eventCapteur[0]
//     }
//     changeCapteur(event) {
//       var datachange = null
//       let index = 0
//       this.eventCapteur = event;
//       this.getExternalData(this.eventCapteur,this.datedebutSelectedSpe.toISOString(),this.dateFinSelectedSpe.toISOString());
//       this.allData.forEach(element=>{
//         if (event == element.id_capteur) {
//           this.expSelected = element.matricule_exploitation
//           this.explSelected(element.id_exploitation);
//         }
//       })
//       debugger
//       this.dataMesure.forEach(el => {
//         if (el.tags["capteur"]== this.eventCapteur){
//           datachange = el
//           this.dataMesure.splice(index,1)
//         }
//         index = index + 1
//       })
//       this.dataMesure.push(datachange)

//     }
//     getDataMesure(mesure,dateDebut,dateFin){
//       let dataMesure = [];
//       let array;
//       let array2;
     
//       this.capteursService.getDataCapteures(mesure,dateDebut,dateFin).subscribe((element)=>{

 

       


//        array = JSON.stringify(element.results)
//        array2 = JSON.parse(array)
//        array2[0].series.forEach(data => {
//            console.log(data)
//           dataMesure.push(data)
//         });
      
// }).add(r=>{
//   this.dataMesure = dataMesure;
//   this.child1.hideLoading1();
   
// })


//     }

    
//     isEmptyObject(obj){
//       return (obj && (Object.keys(obj).length === 0))
//     }


//     getDataCapturs(dateDebut,dateFin) {
//       this.allData = [];
//       this.nameMesure = [];
//       this.mesureChanged = [];
//        this.capteursService.getCapteures(dateDebut,dateFin).subscribe((element)=> {
//          element.forEach(element => {
//           this.nameMesure.push(element.mesure)
//            this.allData.push(element)
//            if(element.mesure == 'temperature'){
//             this.mesureChanged.push(element)
//             }
//          });
//         }
//        ).add(i=>{
//          this.dataTable = this.allData;
//          this.eventCapteur = this.mesureChanged[0].id_capteur;
//          this.expSelected = this.mesureChanged[0].id_exploitation;
//          let eventCapteur = [];
//          this.mesureChanged = []
//          this.allData.forEach(element => {
//            if(this.eventPages == element.mesure ){
//              eventCapteur.push(element.id_capteur)
//              this.mesureChanged.push(element)
//            }
//          });
//          this.eventCapteur = eventCapteur[0]
          
         
//           this.child3.hideLoading3();
//        })


//        this.CapteurInstall =  this.mesureChanged[0].length;
      

//        if(this.allData == []){
//         // this.CapteurInstall = false;
//        }

//     }
//     getExternalData(idcap,dateDebut,DateFin) {
//       this.capData = [];
//       this.rainData = [];
//       let arrayStringify;
//       let arrayStringify2;
//       let arrayParse;
//       let arrayParse2;
//       this.capteursService.getExternalData(idcap,dateDebut,DateFin).subscribe(element=>{
//         arrayStringify = JSON.stringify(element.cap_data)
//         arrayStringify2 = JSON.stringify(element.rain)
//         arrayParse = JSON.parse(arrayStringify)
//         arrayParse2 = JSON.parse(arrayStringify2)
//         console.log(arrayParse)
//         console.log(arrayParse2)
//     this.capData = arrayParse;
//     this.rainData = arrayParse2;
    
//       }).add(i=>{
//         this.child2.hideLoading2();
//       })
//     }
//     getExternalData2(dateDebut,DateFin) {
//       this.externalData2 = [];
//       this.capteursService.getExternalDataUvi(dateDebut,DateFin).subscribe(element=>{
//    element.forEach(data => {
//     this.externalData2.push(data);
//    });
//       })
//     }
//     dateFromCap(event){
//       this.child1.showLoading1();
//       this.datedebutSelectedCap = event;
//       this.getDataMesure(this.eventPages,this.datedebutSelectedCap.toISOString(),this.dateFinSelectedCap.toISOString())
//     }
//     dateToCap(event){
//       this.dateFinSelectedCap = event;
//       this.getDataMesure(this.eventPages,this.datedebutSelectedCap.toISOString(),this.dateFinSelectedCap.toISOString())
//     }
//     dateFromSpe(event) {
//       this.child2.showLoading2();
//       this.datedebutSelectedSpe = event;
//       this.getExternalData(this.eventCapteur,this.datedebutSelectedSpe.toISOString(),this.dateFinSelectedSpe.toISOString());
//     }
//     dateToSpe(event) {
//       this.dateFinSelectedSpe = event;
//       this.getExternalData(this.eventCapteur,this.datedebutSelectedSpe.toISOString(),this.dateFinSelectedSpe.toISOString());
//     }
//     dateFrom(event){
       
        
//        this.child3.showLoading3();
//       this.datedebutSelected = event;
//        this.getDataCapturs(this.datedebutSelected.toISOString(),this.dateFinSelected.toISOString());
       
//        this.getExternalData2(this.datedebutSelected.toISOString(),this.dateFinSelected.toISOString());
//     }
//     dateTo(event){
//       this.dateFinSelected = event;
//        this.getDataCapturs(this.datedebutSelected.toISOString(),this.dateFinSelected.toISOString());
      
//        this.getExternalData2(this.datedebutSelected.toISOString(),this.dateFinSelected.toISOString());
//     }
//     constructor(private theme: NbThemeService,private exploitationService: ExploitationService,
//       private capteursService : CapteureService,
//       private mesureService: MesureService) {


//       this.settings = {
//          actions: false, 
//          pager: {perPage:7},
        
//          columns: {
//            id_capteur: {
//              title: 'ID Capteur',
//              type: 'number',
//               filter: false,
             
//            },
//            value: {
//              title: 'Value',
//              type: 'string',
//              filter: false,
//            },
//            date: {
//             title: 'Date',
//             type: 'string',
//             filter: false,
//           }, time: {
//             title: 'Time',
//             type: 'string',
//             filter: false,
//           },
//          },
//        };
       
    
//        this.source.load(this.data_table);
      

//     }


//   source: LocalDataSource = new LocalDataSource();

 
//   data_table : any[] = [];

//     ngOnInit() {
//       this.eventPages = 'temperature';
//       this.dateDebut.setDate(this.dateDebut.getDate() - 4)
//       this.datedebutSelectedCap.setDate(this.dateFinSelectedCap.getDate() - 4)
//       this.getDataMesure('temperature',this.dateDebut.toISOString(),this.dateFin.toISOString())
//       this.getDataCapturs(this.dateDebut.toISOString(),this.dateFin.toISOString());
//       setTimeout(() => {
//         this.datedebutSelectedSpe.setDate(this.datedebutSelectedSpe.getDate() - 120)
//         this.getExternalData(this.eventCapteur,this.datedebutSelectedSpe.toISOString(),this.dateFinSelectedSpe.toISOString());
//       }, 3000);
//       this.getExternalData2(this.dateDebut.toISOString(),this.dateFin.toISOString());
      
//       setTimeout(() => {
//         this.capteurFalse = true;
//       }, 2000);
     
//     }

//     public show:boolean = true;
//   public buttonName:any = "fas fa-angle-double-up";

//   toggle() {
//     this.show = !this.show;

//     // CHANGE THE NAME OF THE BUTTON.
//     if(this.show)  
//       this.buttonName = "fas fa-angle-double-up";
//     else
//       this.buttonName = "fas fa-angle-double-down";
//   }




show_capteurs = true;




show_article(){

  this.show_capteurs = false;
}

hide_article(){
  
  this.show_capteurs = true;
}



  }
  