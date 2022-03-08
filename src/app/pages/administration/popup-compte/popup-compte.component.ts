import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output,EventEmitter, ViewChild } from '@angular/core';
// import { Modal1Service } from './modal1.service';
import { CompteService } from 'app/_services/compte.service';
import CryptoJS from 'crypto-js';


@Component({
  selector: 'ngx-popup-compte',
  templateUrl: './popup-compte.component.html',
  styleUrls: ['./popup-compte.component.scss']
})
export class PopupCompteComponent implements OnInit {

  @Input() newcompte;
  @Input() _id;

  private element: any;
  bool : boolean;
  boolmessage : boolean ; 
  hash : any;
  message = "Ceci est un message";
  newpassword :any;
  nouveau_mdp: any;
  confirmation : any;
  confirmation1 : any;


  constructor( private el: ElementRef, private compteService: CompteService) { 
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.bool=false;
    this.boolmessage=false;
    this.newcompte = this.newcompte;
 
  }

  ngOnDestroy(): void {
    this.element.remove();
}

@ViewChild('myModal', {static: false}) modal: ElementRef;

open() {
  this.modal.nativeElement.style.display = 'block';
}

close() {
  this.hash= CryptoJS.SHA1(this.newpassword);
  if (this.hash == this.newcompte.password) {
      this.message = "Votre mot de passe est correct, veuillez cliquer sur suivant "
      this.bool = true
  }
  else {
    this.bool=false
    this.message = "le mot de passe que vous avez inséré est incorrect, Veuillez réessayer"
  }
  this.modal.nativeElement.style.display = 'none';
}

submitPswrd(mdp){
  this.compteService.updatePass(mdp).subscribe(res =>
    console.log(res));
}


@ViewChild('myModal2', {static: false}) modal2: ElementRef;

open2() {
  this.modal2.nativeElement.style.display = 'block';
}

close2() {
  this.modal2.nativeElement.style.display = 'none';
}


@ViewChild('myModal3', {static: false}) modal3: ElementRef;

open3() {
  this.bool=false
  this.modal3.nativeElement.style.display = 'block';
}

close3() {

if (this.nouveau_mdp == this.confirmation) {
    this.message = "Votre mot de passe a été modifé avec succès, veuillez vous reconnecter "
    this.bool = true
}
else {
  this.message = "Les 2 champs ne sont pas identiques veuillez reéssayer "
  this.bool = false
}

this.modal3.nativeElement.style.display = 'none';

}


@ViewChild('myModal4', {static: false}) modal4: ElementRef;

open4() {
  this.modal4.nativeElement.style.display = 'block';
}

close4() {


  if ( this.bool= true) {
    this.confirmation1= CryptoJS.SHA1(this.confirmation);
    debugger
    this.submitPswrd(this.confirmation1);
    localStorage.removeItem('x-access-token');
    window.location.reload();
    this.modal4.nativeElement.style.display = 'none';

   }
   else {
    this.modal4.nativeElement.style.display = 'none';

   }

}

@ViewChild('myModal5', {static: false}) modal5: ElementRef;

open5() {
  this.modal5.nativeElement.style.display = 'block';
}

close5() {

    this.modal5.nativeElement.style.display = 'none';   

}




closeAndOpen(){
    this.close()
    this.open2()
}

closeAndOpen2(){
  this.message = ""
  this.close2()
  this.open3()
}

closeAndOpen3(){
  this.close3()
  this.open4()
}

verifierMdp(a,b){
  if (a==b){
    this.bool=true
    this.boolmessage = true
    this.message="Les 2 champs sont identiques veuillez cliquer sur 'Suivant' "
  }
  else {
    this.bool=false
    this.boolmessage = true
    this.message="Les 2 champs ne sont pas identiques veuillez reéssayer "
  }

}

} 