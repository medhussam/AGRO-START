import { Component, OnInit, ViewChild } from '@angular/core';
import { CompteService } from 'app/_services/compte.service'; 
import { ThumbnailsPosition } from 'ng-gallery';
import { PopupCompteComponent } from '../popup-compte/popup-compte.component';


@Component({
  selector: 'ngx-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  compte : any;
  newcompte : any;
  // client : any;
  pp : any;
  pm : any;
  pmorg : any;
  login : any;
  password : any;
  newpp : any;
  newpm : any;
  pmbool = false;
  pmboolstatique =false;
  

  constructor(private compteService: CompteService ) { }


//   this.compteService.getClient().subscribe((item) => {
//     console.log(item);
//     this.client= item[0]
// })
  
  ngOnInit() {
    this.compteService.getCompte().subscribe((item) => {
      console.log(item)
      this.compte= item[0]
      this.newcompte = this.compte
  })
    this.compteService.getPP().subscribe((item) => {
      console.log(item[0])
      this.pp= item[0]
      this.newpp = this.pp
    })

    this.compteService.getPM().subscribe((item) => {
      console.log(item[0]);
      this.pm= item[0];
      this.newpm = this.pm;
      console.log('pew :')
      console.log(this.newpm)

    })

    this.compteService.getuserorg().subscribe((item) => {
      console.log(item[0]);
      this.pmorg= item[0];
      if (this.pmorg != {} && this.pmorg != undefined ){
        this.pmbool = true 
        console.log(this.pmorg)
      }
      // if (this.compte.usrid != this.compte.usrid_rep && this.pmbool == true ){
      //   this.pmbool=false;
      //   this.pmboolstatique= true;
      // }
      console.log(this.pmboolstatique)
      console.log(this.pmbool)
    })



}

 

soumettrePP(newpp){
  console.log('begin')
  this.compteService.updatePP(newpp.nom,newpp.prenom,newpp.cin,newpp.gsm,newpp.email).subscribe(res =>
    console.log(res));
  console.log('done')
}

soumettrePM(newpm){
  console.log('begin')
  this.compteService.updatePM(newpm.denomination,newpm.cap_soc,newpm.forme_juridique,newpm.ice,newpm.num_rc,newpm.adresse,newpm.id_fiscale,newpm.fixe).subscribe(res =>
    console.log(res));
  console.log('done')
}


@ViewChild('modal', {static: false}) modal: PopupCompteComponent

openModal() {

  this.modal.open();
  // console.log(this.newcompte)
}




openModal2() {
  this.modal.open2();
}

}

