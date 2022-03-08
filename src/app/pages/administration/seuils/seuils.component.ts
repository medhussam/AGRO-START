import { Component, OnInit } from '@angular/core';

import { SeuilsService } from 'app/_services/seuils.service';
import { ModalService } from '../popup-form/modal.service';



//  import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'ngx-seuils',
  templateUrl: './seuils.component.html',
  styleUrls: ['./seuils.component.scss']
})
export class SeuilsComponent implements OnInit {

  dataSeuil: any[] = [];
  dataSeuil1: any[] = [];

  listCapteurs: any[] = [];
  listParametres: any[] = [];
  listParcelles: any[] = [];
  listCultures: any[] = [];

  SeuilseventCap = "all";
  SeuilseventPar = "all";
  SeuilseventParc = "all";
  SeuilseventCult = "all";

  _seuil:any;
  oldseuil: any;


  bodyText: string;
  parametres = [
    { title: "Température", value: "temperature" },
    { title: "Humidité", value: "humidite" },
    { title: "Luminosité", value: "light" },
    { title: "Température du sol", value: "soil_temperature" },
    { title: "Humidité du sol", value: "soil_humidite" },
  ]



  constructor(
    private seuilService: SeuilsService,
    private modalService: ModalService
    // private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.seuilService.getSeuils().subscribe((item) => {
      console.log(item);
      item.forEach(element => {
        this.dataSeuil.push(element)
        this.listCapteurs.push(element.id_capteur)
        this.listParcelles.push(element.id_parcelle)
        this.listParametres.push(element.parametre)
        this.listCultures.push(element.culture)
      })
    });
    this.dataSeuil1 = this.dataSeuil

    // this.capteurService.getCapteures().subscribe((item) => {
    //   console.log(item);
    //   item.forEach(element => {
    //     this.listCapteurs.push(element)  
    //   })
    // });
  }

  openModal(id: string) {
    this._seuil = this.dataSeuil1.filter(u =>
      u._id == id);
    this._seuil = this._seuil[0] 
    console.log(this._seuil)
    this.modalService.open(id);
  }


  closeModal(id: string) {
    this.modalService.close(id);
  }
  
  removeDuplicates(List) {
    let unique = {};
    List.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }




  capteurFiltre(filterResult, capteur) {
    filterResult = filterResult.filter(u =>
      u.id_capteur == capteur)
  }
  updateSeuil(event) {


    console.log("Archivage")
    this.seuilService.archSeuil(this._seuil.id_capteur, this._seuil.parametre).subscribe(res =>
      console.log(res))
      // console.log("Archivage fin")

    console.log("Création")
    this.seuilService.createSeuil(event.id_capteur, event.parametre, event.warning_min, event.warning_max, event.critique_min, event.critique_max ,event.culture,event.id_parcelle).subscribe(res => {
      // console.log(res)
    })
    // console.log("Création fin")

    // console.log("event : ")
    // console.log(event)

    // console.log("ancien seuil")
    // console.log(this._seuil)



    

    // this.seuilService.createSeuil(event.id_capteur, event.parametre, event.warning_min, event.warning_max, event.critique_min, event.critique_max ,event.culture).subscribe(res => {

    //   console.log(res)
    // })
  


  }

  // getCap(){
  // }

  // getPar(capteur){
  //   this.listParametres = []
  //   this.mesureService.getlesMesures(capteur).subscribe((item)=>{
  //     this.listParametres.push(item.mesure)})
  //   this.removeDuplicates(this.listParametres)
  // }

  changeCapteur(event1) {

    this.SeuilseventCap = event1
    this.filtreSeuil()

  }

  changeParametre(event2) {

    this.SeuilseventPar = event2
    this.filtreSeuil()

  }

  changeParcelle(event) {

    this.SeuilseventParc = event
    this.filtreSeuil()

  }

  changeCulture(event) {

    this.SeuilseventCult = event
    this.filtreSeuil()

  }

  filtreSeuil() {
    this.dataSeuil = this.dataSeuil1

    let filterResult: any = this.dataSeuil

    if (this.SeuilseventParc == undefined || this.SeuilseventParc == "all") {
      filterResult = this.dataSeuil1
    }
    if (this.SeuilseventCap == undefined || this.SeuilseventCap == "all") {
      filterResult = this.dataSeuil1
    }
    if (this.SeuilseventPar == undefined || this.SeuilseventPar == "all") {
      filterResult = this.dataSeuil1
    }
    if (this.SeuilseventCult == undefined || this.SeuilseventCult == "all") {
      filterResult = this.dataSeuil1
    }
    if (this.SeuilseventCap != undefined && this.SeuilseventCap != "all") {
      filterResult = filterResult.filter(u =>
        u.id_capteur == this.SeuilseventCap);
    }

    if (this.SeuilseventPar != undefined && this.SeuilseventPar != "all") {
      filterResult = filterResult.filter(u =>
        u.parametre == this.SeuilseventPar);
    }

    if (this.SeuilseventParc != undefined && this.SeuilseventParc != "all") {
      filterResult = filterResult.filter(u =>
        u.id_parcelle == this.SeuilseventParc);
    }
    if (this.SeuilseventCult != undefined && this.SeuilseventCult != "all") {
      filterResult = filterResult.filter(u =>
        u.culture == this.SeuilseventCult);
    }


    this.dataSeuil = filterResult
    this.listCapteurs = []
    this.listParametres = []
    this.listParcelles = []
    this.listCultures = []

    this.dataSeuil.forEach(element => {
      this.listCapteurs.push(element.id_capteur)
      this.listParcelles.push(element.id_parcelle)
      this.listParametres.push(element.parametre)
      this.listCultures.push(element.culture)
    }

    )
  }

  //openModal(seuil){
  // const modalRef = this.modalService.open(PopupFormComponent,{size: 'xl'});
  // modalRef.componentInstance.seuil = seuil;
  // modalRef.result.then(result=>{
  //   if(result){
  //     console.log(result);
  //   }
  // })
  // this.show 



  // }


}
