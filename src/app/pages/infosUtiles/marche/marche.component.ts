import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmartTableData } from 'app/@core/data/smart-table';
import { ExploitationService } from 'app/_services/exploitation.service';
import { ExportService } from 'app/_services/export.service';
import { MesureService } from 'app/_services/mesure.service';
import { LocalDataSource } from 'ng2-smart-table';
import { MarchesService } from 'app/_services/marches.service'
import * as Highcharts from 'highcharts';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.scss']
})
export class MarcheComponent implements OnInit {

  produit: any;
  datagraph : any;
  colorScheme = {
    domain: ['#FF0000', '#00FF00', '#FF5E3A']
  };

  graphbool = false;

  f_marche : any;
  f_nom_produit: any;
  f_pays: any;
  f_unite: any;
  f_legume_fruit: any;

  noms_produits = [];
  pays = [];
  unites = [];
  legumes_fruits = [];
  marches  = [];
  data = [];
  
  mesures: any;
  temperature: any[] = [];
  valueTime: any[] = [];
  excel_: any[] = [];

  mesuresNames: any[] = [];
  produitsNames: any[] = [];

  dateFinSelected: Date = new Date(Date.now());
  datedebutSelected : Date = new Date('01-01-2008')

  DateD = '2008-01-01'
  DateF 

  
  produits : any; 
  source1: any;
  source2 : any;
  nomProduit: any;
  nomMarche : any;

  marchedata;

  export() {
    this.exportService.exportExcel(this.excel_, 'Marches');
  }



  constructor(private exportService: ExportService,
    private service: SmartTableData,
    private mesureServes: MesureService,
    private http: HttpClient,
    private exploitationService: ExploitationService,
    private marchesService: MarchesService,
    

  ) {


    // this.marchesService.getMarches().subscribe((item) => {
    //   item.map(e => {
    //     this.produit = e;

    //   });


    // });


    this.settings = {
      actions: {
        edit: false,
        add: false,
        delete: false, //as an example
        custom: [{ name: 'Afficher Graph', title: `<i class="fas fa-chart-line" style = "size = 1px"></i>` }]
      },
      pager: { perPage: 30 },

      columns: {

        nom_produit: {
          title: "Nom Produit",
          type: 'string',
          filter: false,
        },

        type_marche: {
          title: 'Type Marche',
          type: 'string',
          filter: false,
        },

        legume_fruit: {
          title: 'Legume Fruit',
          type: 'string',
          filter: false,
        },
        unite: {
          title: "Unite",
          type: 'string',
          filter: false,
        },
        nom_marche: {
          title: "Nom Marche",
          type: 'string',
          filter: false,
        },
        pays: {
          title: "Pays",
          type: 'string',
          filter: false,
        },
        

      },
    };



  }


  ngOnInit() {
    // const data = this.service.getData()
    this.DateF = this.dateFinSelected.toISOString()
    
    this.marchesService.getMarches().subscribe(
      item => {
        this.source = item
        this.source1 = this.source
        item.forEach(element => {
          this.noms_produits.push(element.nom_produit)
          this.pays.push(element.pays)
          this.unites.push(element.unite)
          this.legumes_fruits.push(element.legume_fruit)
          this.marches.push(element.nom_marche)  
        })
        this.removeDuplicates();
      }  
    )
    this.filtreTableau()
    // this.produits = this.produitsNames[0];
    // this.produits = JSON.stringify(this.produits)
    // console.log(this.produits)
    
  }

  filtreTableau(){
    this.source = this.source1;
    

    if (this.f_marche != undefined && this.f_marche != 'all'){
      this.source=this.source.filter(u => 
        u.nom_marche == this.f_marche )
    }
    if (this.f_nom_produit != undefined && this.f_nom_produit != 'all'){
      this.source=this.source.filter(u => 
        u.nom_produit == this.f_nom_produit )
    }
    if (this.f_legume_fruit != undefined && this.f_legume_fruit != 'all'){
      this.source=this.source.filter(u => 
        u.legume_fruit == this.f_legume_fruit )
    }
    if (this.f_unite != undefined && this.f_unite != 'all'){
      this.source=this.source.filter(u => 
        u.unite == this.f_unite )
    }
    if (this.f_pays != undefined && this.f_pays != 'all'){
      this.source=this.source.filter(u => 
        u.pays == this.f_pays )
    }
    this.noms_produits =[];
    this.marches =[]
    this.pays =[]
    this.unites =[]
    this.legumes_fruits =[]

    this.source.forEach(element => {
      this.marches.push(element.nom_marche)
      this.noms_produits.push(element.nom_produit)
      this.pays.push(element.pays)
      this.unites.push(element.unite)
      this.legumes_fruits.push(element.legume_fruit)   
    });
    this.removeDuplicates();

    console.log(this.f_marche)
    console.log(this.source)
    


  }

  removeDuplicates(){
    this.noms_produits = this.noms_produits.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.pays = this.pays.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.unites = this.unites.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.legumes_fruits = this.legumes_fruits.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.marches = this.marches.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.noms_produits =this.noms_produits.sort()
    this.pays = this.pays.sort()
    this.unites = this.unites.sort()
    this.legumes_fruits = this.legumes_fruits.sort()
    this.marches = this.marches.sort()


  }

  remplirData(){
    this.noms_produits = [];
    this.pays = [];
    this.unites = [];
    this.legumes_fruits = [];
    this.marches = [];
    
    this.source.forEach(element => {
    this.noms_produits.push(element.nom_produit)
    this.pays.push(element.pays)
    this.unites.push(element.unite)
    this.legumes_fruits.push(element.legume_fruit)
    this.marches.push(element.nom_marche)  
     })
    this.removeDuplicates();
    this.source2= JSON.stringify(this.source)
  }
  affGraph(event){
    console.log(event)
    this.marchedata = event.data
    this.nomProduit = event.data.nom_produit
    this.nomMarche = event.data.nom_marche
    this.f_legume_fruit= event.data.legume_fruit
    this.f_marche = event.data.nom_marche
    this.f_nom_produit=event.data.nom_produit
    this.f_pays = event.data.pays
    this.f_unite = event.data.unite
    this.graphbool = true
    this.filtreTableau()
    this.marchesService.getPrix(event.data.id_produit,event.data.id_marche,event.data.type_marche,this.DateD,this.DateF).subscribe(
      item => {
        this.datagraph=item
      }
    )
    
    if (this.datagraph.length === 0){  
      this.graphbool= false;
    }else {
      this.graphbool=true;
    }

    console.log(JSON.stringify(this.datagraph))

  }
  dateTo(event){
    console.log(JSON.stringify(this.datagraph))
    this.dateFinSelected = event;
    this.DateD = this.datedebutSelected.toISOString()
    this.DateF = this.dateFinSelected.toISOString()
    
    this.marchesService.getPrix(this.marchedata.id_produit,this.marchedata.id_marche,this.marchedata.type_marche,this.DateD,this.DateF).subscribe(
      item => {
        this.datagraph=item
      }
    )


  }

  dateFrom(event){
    console.log(JSON.stringify(this.datagraph))
    this.datedebutSelected = event;
    this.DateD = this.datedebutSelected.toISOString()
    this.DateF = this.dateFinSelected.toISOString()
    this.marchesService.getPrix(this.marchedata.id_produit,this.marchedata.id_marche,this.marchedata.type_marche,this.DateD,this.DateF).subscribe(
      item => {
        this.datagraph=item
      }
    )


  }

  Fermer(){
    this.graphbool = false;
    this.f_legume_fruit= 'all'
    this.f_marche = 'all'
    this.f_nom_produit= 'all'
    this.f_pays = 'all'
    this.f_unite = 'all'
    this.filtreTableau()
  }

  settings: any;


  source: any;


}
