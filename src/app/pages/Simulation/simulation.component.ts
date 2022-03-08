import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NbIconConfig, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from '@angular/platform-browser';
import { VapoService } from 'app/_services/vapo.service';
import { ParcelleService } from 'app/_services/parcelle.service';
import { ExploitationService } from 'app/_services/exploitation.service';
import { Map1simulationComponent } from './Map-1-simulation/Map-1-simulation.component';
 
@Component({
  selector: 'simulation-conseils',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})

 export class simulationComponent implements OnInit ,OnChanges{
  id_parcelle: any; 
  Parcelle: any[] = [];
  exploitation: any[] = [];
  exploitationSelected: any;
  selectedEXP: any;  
  selectedParcelle: any;
  parceletcImagery: any[] = [];
  Statistics: any[] = [];
  daates: any[] = [];
  
  Dates: any[] = [];
  Layers: any;
  lenght: any;
  @ViewChild(Map1simulationComponent, {static: false}) child1: Map1simulationComponent;

constructor(private evapoService : VapoService, private parcelleService: ParcelleService, private serviceExp: ExploitationService){

}
  ngOnChanges(){
  
  }

DateFromMap1: any;
DateFromMap2: any;
ngAfterViewInit() {
  
}
 
  ngOnInit(): void {
    this.getExp();
    // this.getImage_parcelle(this.selectedParcelle);
  }
  getImage_parcelle(id_parcelle) {
    this.Dates = []
    this.evapoService.parceletcImagery(id_parcelle).subscribe((item)=>{
      this.parceletcImagery = item;
      
          })

          this.parceletcImagery.map(element => {

            this.daates.push(this.convert(element.time))
            this.Layers.push(element.layer_name)
            this.Dates.push(element.time)

           // console.log(element.layer_name)
            
          });

        


  }
  convert(time: any): any {
    throw new Error('Method not implemented.');
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
       // if (element.id_parcelle == element.parcelle_rep) {
          // console.log(element);
     this.Parcelle.push(element);
   // }
      });
    }).add(d => {
      this.selectedParcelle = this.Parcelle[0].id_parcelle;
      this.getImage_parcelle(this.selectedParcelle);
      this.getStatistics(this.selectedParcelle);
      // this.getDataVapo(this.Parcelle[0].id_parcelle);
      // this.getDataVapoWeekly(this.Parcelle[0].id_parcelle);
      // this.evapotranspiration_period(this.Parcelle[0].id_parcelle);
    })
  
  } 
  explSelected(event) {
    // console.log(event);
    this.Parcelle = [];
    this.getParcelle(event);
    this.exploitationSelected = event;
    //this.getImage_parcelle(this.selectedParcelle);
      
   
  }
   
  parcelleSelcted(event) {
    // console.log(event)
    // this.getDataVapo(event);
    // this.getDataVapoWeekly(event);
    // this.evapotranspiration_period(event);
    this.getStatistics(event);
    this.getImage_parcelle(event);
    // this.DateFromMap1 = this.Dates[0]; 
    // this.DateFromMap2 = this.Dates[1]; 
    // console.log(event);
      
   
  }

  acceptData(data) {
    // console.log(
    //   "this is the child data displaying in parent component: ",
    //   data
    // );
    this.DateFromMap1 = data;
  }
  
  acceptData2(data) {
    // console.log(
    //   "this is the child data displaying in parent component: ",
    //   data
    // );
    this.DateFromMap2 = data;
  }

  getStatistics(id_parcelle) {
   
    this.evapoService.getStatistics(id_parcelle).subscribe((item)=>{
      this.Statistics = item;
      
          })
  }


}
