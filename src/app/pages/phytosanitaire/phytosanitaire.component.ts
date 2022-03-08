import { Component, OnInit } from '@angular/core';
import { PhytoService } from 'app/_services/phyto.service';
@Component({
  selector: 'ngx-phytosanitaire',
  templateUrl: './phytosanitaire.component.html',
  styleUrls: ['./phytosanitaire.component.scss']
})
export class PhytosanitaireComponent implements OnInit {

  settings: any;

  selectedRows: any;

  dataPhyto: any[] = [];
  dataPhyto1: any[] = [];
  dataPhyto2: any[] = [];

  listCultures: any[] = [];
  listCategories: any[] = [];
  listProduits: any[] = [];
  listUsages: any[] = [];
  listMatiere: any[] = [];

  EventCult = "all";
  EventCat = "all";
  EventProd = "all";
  EventUsag = "all";
  EventMat = "all";


  onRowSelect(event) {
    this.selectedRows = event.selected;
  }



  constructor(private phytoService: PhytoService,) {


    this.settings = {
      noDataMessage: "Pas de produits phytosanitaire à afficher",



      actions: {
        delete: false,
        add: false,
        edit: false,
        select: false,
      },
      pager: { perPage: 23 },


      columns: {

        Produit: {
          title: 'Produit',
          type: 'string',
          filter: false,
        },

        Détenteur: {
          title: 'Détenteur',
          type: 'string',
          filter: false,

        },

        Fournisseur: {
          title: 'Fournisseur',
          type: 'string',
          filter: false,
        },
        Numéro_homologation: {
          title: 'Numéro homologation',
          type: 'string',
          filter: false,
        },
        Valable_jusqu_au: {
          title: "Valable jusqu'au",
          type: 'string',
          filter: false,
        },
        Catégorie: {
          title: "Catégorie",
          type: 'string',
          filter: false,
        },
        Formulation: {
          title: 'Formulation',
          type: 'string',
          filter: false,
        },
        Matiere_active: {
          title: 'Matière active',
          type: 'string',
          filter: false,
        },
        Teneur: {
          title: 'Teneur',
          type: 'string',
          filter: false,
        },
        Usage: {
          title: 'Usage',
          type: 'string',
          filter: false,
        },
        Dose: {
          title: 'Dose',
          type: 'string',
          filter: false,
        },
        Culture: {
          title: 'Culture',
          type: 'string',
          filter: false,
        },
        DAR: {
          title: 'DAR',
          type: 'string',
          filter: false,
        },
        Nbr_application: {
          title: "Nbr d'application",
          type: 'string',
          filter: false,
        },

      },
    };
  }

  ngOnInit() {
    this.phytoService.getPhytoData().subscribe((item) => {
      item = item
      this.dataPhyto = item;
      this.dataPhyto1 = item;
      this.dataPhyto.forEach(el => {
        this.listCategories = this.listCategories.concat(el.Catégorie)
        this.listCultures = this.listCultures.concat(el.Culture)
        this.listProduits = this.listProduits.concat(el.Produit)
        this.listUsages = this.listUsages.concat(el.Usage)
        this.listMatiere = this.listMatiere.concat(el.Matiere_active)


      });

      this.listCategories = this.listCategories.filter(function (elem, index, self) {
        return index == self.indexOf(elem)
      });

      this.listCultures = this.listCultures.filter(function (elem, index, self) {
        return index == self.indexOf(elem)
      });

      this.listProduits = this.listProduits.filter(function (elem, index, self) {
        return index == self.indexOf(elem)
      });

      this.listUsages = this.listUsages.filter(function (elem, index, self) {
        return index == self.indexOf(elem)
      });

      this.listMatiere = this.listMatiere.filter(function (elem, index, self) {
        return index == self.indexOf(elem)
      });

    },
    )



  }


  changeMatiere(event) {
    this.EventMat = event
    this.filterTable()

  }

  changeUsage(event) {
    this.EventUsag = event
    this.filterTable()

  }

  changeProduit(event) {
    this.EventProd = event
    this.filterTable();
  }

  changeCategorie(event) {
    this.EventCat = event
    this.filterTable()

  }

  changeCulture(event) {
    this.EventCult = event
    this.filterTable()

  }

  filterTable() {
    this.dataPhyto = this.dataPhyto1;
    console.log(this.dataPhyto)
    let filterResult: any[]
    filterResult = this.dataPhyto;

    if (this.EventCat != undefined && this.EventCat != "all") {
      filterResult = filterResult.filter(u =>
        u.Catégorie == this.EventCat);
    };

    if (this.EventCult != undefined && this.EventCult != "all") {
      filterResult = filterResult.filter(u =>
        u.Culture == this.EventCult);
    };

    if (this.EventUsag != undefined && this.EventUsag != "all") {
      filterResult = filterResult.filter(u =>
        u.Usage == this.EventUsag);
    };
    if (this.EventProd != undefined && this.EventProd != "all") {
      filterResult = filterResult.filter(u =>
        u.Produit == this.EventProd);
    };
    if (this.EventMat != "all" && this.EventMat != undefined) {
      filterResult = filterResult.filter(u =>
        u.Matiere_active == this.EventMat);
    }


    console.log("usage : " + this.EventUsag)
    console.log("culture : " + this.EventCult)
    console.log("produit : " + this.EventProd)
    console.log("catégorie : " + this.EventCat)

    this.dataPhyto = filterResult


  }
}