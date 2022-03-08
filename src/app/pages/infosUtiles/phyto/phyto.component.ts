import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SmartTableData } from 'app/@core/data/smart-table';
import { ExploitationService } from 'app/_services/exploitation.service';
import { ExportService } from 'app/_services/export.service';
import { MesureService } from 'app/_services/mesure.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ProduitsInformationUtilesService } from 'app/_services/produits-information-utiles.service'
import { PhytoService } from 'app/_services/phyto.service';

@Component({
  selector: 'ngx-phyto',
  templateUrl: './phyto.component.html',
  styleUrls: ['./phyto.component.scss']
})
export class PhytoComponent implements OnInit {

dataphyto : any ; 
dataphyto1 : any ; 
produit : any[] = [];
detenteur : any[] = [];
fournisseur: any[] = [];
toxico: any[] = [];
categorie: any[] = [];
formulation: any[] = [] ;
mat_active: any[] = [] ;
culture : any[] = [] ;

f_produit : any;
f_detenteur : any;
f_fournisseur: any;
f_toxico: any;
f_categorie: any;
f_formulation: any ;
f_mat_active: any ;
f_culture : any ;

  constructor(private exportService: ExportService,
    private service: SmartTableData,
    private mesureServes: MesureService,
    private http: HttpClient,
    private phytoservice : PhytoService,
  ) {

    this.settings = {
      actions: false,
      pager: { perPage: 30 },

      columns: {

        Produit: {
          title: 'Produit',
          type: 'string',
          filter: false,
        },
        Détenteur: {
          title: "Détenteur",
          type: 'string',
          filter: false,
        },
        Fournisseur: {
          title: 'Fournisseur',
          type: 'string',
          filter: false,
        },
        Numéro_homologation: {
          title: "N° d'homologation",
          type: 'string',
          filter: false,
        },
        Valable_jusqu_au: {
          title: "Valable jusqu'au",
          type: 'string',
          filter: false,
        },
        Tableau_toxicologique: {
          title: "Toxicologie",
          type: 'string',
          filter: false,
        },
        Catégorie: {
          title: "Catégorie",
          type: 'string',
          filter: false,
        },
        Formulation: {
          title: "Formulation",
          type: 'string',
          filter: false,
        },
        Matiere_active: {
          title: "Matière active",
          type: 'string',
          filter: false,
        },    
        Teneur: {
          title: "Teneur",
          type: 'string',
          filter: false,
        }, 
        Dose: {
          title: "Dose",
          type: 'string',
          filter: false,
        },   
        Culture: {
          title: "Culture",
          type: 'string',
          filter: false,
        },
      },
    };

  }


  ngOnInit() {
    this.phytoservice.getPhytoData().subscribe((item) => {
      this.dataphyto = item
      this.dataphyto1 = this.dataphyto
      item.forEach(element => {
        this.produit.push(element.Produit)
        this.detenteur.push(element.Détenteur)
        this.fournisseur.push( element.Fournisseur)
        this.toxico.push(element.Tableau_toxicologique)
        this.categorie.push(element.Catégorie)
        this.formulation.push(element.Formulation)
        this.mat_active.push(element.Matiere_active)
        this.culture.push(element.Culture)  
      }) 
      this.produit = this.produit.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.detenteur = this.detenteur.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.fournisseur = this.fournisseur.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.toxico = this.toxico.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.categorie = this.categorie.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.formulation = this.formulation.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.mat_active = this.mat_active.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.culture = this.culture.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
  })


  }

  remplirData(){

    this.produit = [];
    this.detenteur = [];
    this.fournisseur= [];
    this.toxico= [];
    this.categorie= [];
    this.formulation= [] ;
    this.mat_active= [] ;
    this.culture = [] ;
    this.dataphyto.forEach(element => {
      this.produit.push(element.Produit)
      this.detenteur.push(element.Détenteur)
      this.fournisseur.push( element.Fournisseur)
      this.toxico.push(element.Tableau_toxicologique)
      this.categorie.push(element.Catégorie)
      this.formulation.push(element.Formulation)
      this.mat_active.push(element.Matiere_active)
      this.culture.push(element.Culture)  
    }) 
    this.produit = this.produit.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.detenteur = this.detenteur.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.fournisseur = this.fournisseur.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.toxico = this.toxico.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.categorie = this.categorie.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.formulation = this.formulation.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.mat_active = this.mat_active.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.culture = this.culture.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })

    this.produit = this.produit.sort()
    this.detenteur = this.detenteur.sort()
    this.fournisseur = this.fournisseur.sort()
    this.toxico = this.toxico.sort()
    this.categorie = this.categorie.sort()
    this.formulation = this.formulation.sort()
    this.mat_active = this.mat_active.sort()
    this.culture = this.culture.sort()
  }
  
  // var produit1 =new Set(this.produit)
  // this.produit = produit1
  // var detenteur1 = new Set(this.detenteur)
  // var fournisseur1 = new Set(this.fournisseur)
  // var toxico1 = new Set(this.toxico)
  // var categorie1 = new Set(this.categorie)
  // var formulation1 = new Set(this.formulation)
  // var mat_active1 = new Set(this.mat_active)
  // var culture1 = new Set(this.culture)

  filtreProduit(){
    if (this.f_produit != undefined && this.f_produit != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
        u.Produit == this.f_produit );
      console.log(this.dataphyto)
    }

  }

  filtreDetenteur(){
    if (this.f_detenteur != undefined && this.f_detenteur != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
      u.Détenteur == this.f_detenteur )
    } 

  }

  filtreFournisseur(){
    if (this.f_fournisseur != undefined && this.f_fournisseur != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
      u.Fournisseur == this.f_fournisseur )
    }

  }

  filtreTabTox(){
    if (this.f_toxico != undefined && this.f_toxico != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
      u.Tableau_toxicologique == this.f_toxico )
    }

  }

  filtreCulture(){
    if (this.f_culture != undefined && this.f_culture != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
      u.Culture == this.f_culture )
    }

  }

  filtreCategorie(){
    if (this.f_categorie != undefined && this.f_categorie != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
      u.Catégorie == this.f_categorie )
    }

  }

  filtreFormulation(){
    if (this.f_formulation != undefined && this.f_formulation != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
      u.Formulation == this.f_formulation )
    }

  }

  filtreMatact(){
    if (this.f_mat_active != undefined && this.f_mat_active != 'all') {
      this.dataphyto=this.dataphyto.filter(u => 
      u.Matiere_active == this.f_mat_active )
    }

  }

  Fermer(){
    this.f_categorie = 'all'
    this.f_culture = 'all'
    this.f_detenteur = 'all'
    this.f_mat_active = 'all'
    this.f_produit = 'all'
    this.f_toxico = 'all'
    this.f_fournisseur = 'all'
    this.f_formulation = 'all'
    this.filtreTableau()
  }

  filtreTableau(){
    this.dataphyto = this.dataphyto1;
    this.filtreCategorie()
    this.filtreCulture()
    this.filtreDetenteur()
    this.filtreFournisseur()
    this.filtreMatact()
    this.filtreProduit()
    this.filtreTabTox()
    this.filtreFormulation()
    this.remplirData()

  }

  settings: any;


  source: LocalDataSource = new LocalDataSource();

}
