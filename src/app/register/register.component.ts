import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import {MustMatch} from '../_helpers/must-match.validator';
import { InscriptionService } from "app/_services/inscription.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message = '';
  loginForm: FormGroup;
  ppForm: FormGroup;
  pmForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  bool = null
  bool1 = null
  bool2 = false;
  firstForm = true;
  secondForm = false;
  thirdForm = false;
  fourthForm = false;
  existeorg = false;
  str;
  str1;
  role = {'login':'','password':''};
  pp = {'nom':'','prenom':'','mail':'','cin':'','gsm':'','role_usrid':''}
  pm ;
  societe = {'denomination':'','cap_soc':'','forme_juridique':'','ice':'','num_rc':'','adresse':'','id_fiscal':'','fixe':''}
  userorg = {'id_user_users':'', 'id_organisme': '', 'type_user' : '' }
  exorg = {'denomination':'','cap_soc':'','forme_juridique':'','ice':'','num_rc':'','adresse':'','id_fiscal':'','fixe':''}


  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private inscriptionService: InscriptionService,
      private authenticationService: AuthenticationService,
  ) { 
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          confirmpassword: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
      },
      {
          validator: MustMatch('password','confirmpassword')
      });

      this.ppForm =  this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        gsm: ['', Validators.required],
        cin: ['', Validators.required]
      })
      console.log(this.bool)


      this.pmForm =  this.formBuilder.group({
        denomination: ['', Validators.required],
        cap_soc: ['', Validators.required],
        forme_juridique: ['', Validators.required],
        ice: ['', [Validators.required]],
        num_rc: ['', Validators.required],
        adresse: ['', Validators.required],
        id_fiscal: ['', Validators.required],
        fixe: ['', [Validators.required]]
      })




 
  }
  


  get f() { return this.loginForm.controls; }
  get f1() { return this.ppForm.controls; }
  get f2() { return this.pmForm.controls;}

  onSubmit() {   
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }
      this.str = this.f.username.value.toString()
      this.str1 =this.f.email.value.toString()
      console.log(this.str)
      console.log(this.str1)
      this.inscriptionService.verifyLogin(this.str).subscribe( item => {
         this.bool = item
         console.log(this.bool)

     })
     this.inscriptionService.verifyMail(this.str1).subscribe(item => {
       
          this.bool1 = item
          console.log(this.bool1)

      }).add(g=>{
        if (this.loginForm.valid && this.bool && this.bool1){
            this.bool2 = true;
            console.log(this.bool2)
        }
      })
      
      console.log(this.bool2)







  }
  onSubmit1() {
      
    this.submitted = true;
    if (this.ppForm.invalid ) {
        return;
    }
    else {
      this.bool2 = true;

    }
    console.log(this.f1)

}

OnSubmit2(){
  console.log("Début")
  console.log(this.f2)
  this.submitted = true;
  console.log(this.submitted)
  if ( this.pmForm.invalid) {
    return;
}else{
  
  this.societe.denomination = this.f2.denomination.value.toString()
  this.societe.cap_soc = this.f2.cap_soc.value.toString()
  this.societe.forme_juridique = this.f2.forme_juridique.value.toString()
  this.societe.ice = this.f2.ice.value.toString()
  this.societe.num_rc = this.f2.num_rc.value.toString()
  this.societe.adresse = this.f2.adresse.value.toString()
  this.societe.id_fiscal = this.f2.id_fiscal.value.toString()
  this.societe.fixe = this.f2.fixe.value.toString()
  this.bool2=true;
  // console.log(this.f2.mail_soc.errors.required)
  console.log(this.submitted)
}
console.log(this.f2)

}

// OnSubmitDouble(){
//   if (this.pm == "Societé"){
//     this.OnSubmit2();
//     this.onSubmit1();
//   }else {
//     this.onSubmit1();
//   }

// }
    
  Suivant(){
    this.submitted=false
      //this.router.navigate(['/register1'])
      this.firstForm = false;
      this.secondForm = true
      this.message ='';
    this.bool2 = false
}

Suivant1(){
  
this.submitted=false
if (this.ppForm.valid){      
      this.firstForm = false;
      this.secondForm = false;
      this.thirdForm = true;
      this.role.login = this.f.username.value.toString()
      this.role.password = this.f.password.value.toString()
      this.pp.cin = this.f1.cin.value.toString()
      this.pp.nom = this.f1.nom.value.toString()
      this.pp.prenom = this.f1.prenom.value.toString()
      this.pp.gsm = this.f1.gsm.value.toString()
      this.pp.mail = this.f.email.value.toString()


      // this.inscriptionService.addRole(this.role.login,this.role.password).subscribe(response1 => {
      //  console.log(response1);
        // this.inscriptionService.getRoleID(this.role.login).subscribe(response => {
          
        //   this.pp.role_usrid = response[0]
        //   // console.log(this.pp.role_usrid)
  
        //   this.pp.role_usrid = this.pp.role_usrid[0]
        //   // console.log(this.pp.role_usrid)
        //   JSON.parse(JSON.stringify(this.pp.role_usrid))
        //   this.pp.role_usrid = this.pp.role_usrid['usrid']
        //   JSON.parse(JSON.stringify(this.pp.role_usrid))
  
        //   // console.log(this.pp.role_usrid)
        //   // console.log(this.pp)
        //   console.log(this.pp.nom,this.pp.prenom,this.pp.cin,this.pp.gsm,this.pp.mail,this.pp.role_usrid)
        console.log((this.role.login, this.role.password,this.pp.nom,this.pp.prenom,this.pp.cin,this.pp.gsm,this.pp.mail));
        this.inscriptionService.addPP(this.role.login, this.role.password,this.pp.nom,this.pp.prenom,this.pp.cin,this.pp.gsm,this.pp.mail).subscribe(response => {

          console.log(response[0][0]['id_user']);
          this.userorg.id_user_users = response[0][0]['id_user']
        })
        // })
      // })
    this.Third()
    }else{
        this.message = 'Veuillez completer le formulaire !'
      }
}

Terminer(){
    console.log(this.f2)
    if (this.pmForm.valid){ 

    this.inscriptionService.addPM(this.societe.denomination,this.societe.cap_soc,this.societe.forme_juridique,this.societe.ice,this.societe.num_rc,this.societe.adresse,this.societe.id_fiscal,this.societe.fixe).subscribe(r => {
      console.log(r[0][0]['id_organisme']);
      this.userorg.id_organisme = r[0][0]['id_organisme']
      this.pm = "Individu"
      this.inscriptionService.addUserOrg(this.userorg.id_user_users,this.userorg.id_organisme,this.userorg.type_user).subscribe(response => {
        console.log(response)
    })
        })
        // 

      }

}

First(){
  this.firstForm = true
  this.secondForm = false
  this.thirdForm = false
  this.bool2 = false
  
}

Second(){
  if (this.loginForm.valid && this.bool2){
      this.secondForm = true
      this.firstForm = false
      this.thirdForm = false
  }

}

Third(){
  if (this.ppForm.valid && this.bool2){
      this.secondForm = false
      this.firstForm = false
      this.thirdForm = true
      this.bool2 = false 
  }

}

CheckboxPM(e){
  if (e.target.checked){
    this.pm = "Societé"
  }else {
    this.pm = "Individu"
  }
}

}




