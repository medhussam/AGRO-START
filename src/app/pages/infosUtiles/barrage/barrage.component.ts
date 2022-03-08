import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SmartTableData } from 'app/@core/data/smart-table';
import { ExploitationService } from 'app/_services/exploitation.service';
import { ExportService } from 'app/_services/export.service';
import { MesureService } from 'app/_services/mesure.service';
import { LocalDataSource } from 'ng2-smart-table';
import { BarragesallService } from 'app/_services/barragesall.service'
import { BarrageService } from 'app/_services/barrage.service';


@Component({
  selector: 'ngx-barrage',
  styleUrls: ['./barrage.component.scss'],
  templateUrl: './barrage.component.html',

})
export class BarrageComponent implements OnInit {

  produit: any;
  mesures: any;
  temperature: any[] = [];
  valueTime: any[] = [];
  excel_: any[] = [];
  exploitetion: { value: string; title: string; }[] = [];
  variable0: { value: string; title: string; }[];
  mesuresNames: any[] = [];
  produitsNames: any[] = [];
  produits : any;
  datagraph : any;
  barrageinfo :any;

  graphbool = false;

  f_nom :any;
  f_province :any;
  f_bassin :any;
  f_riviere :any;

  noms =[] ;
  provinces =[] ;
  bassins =[] ;
  rivieres =[] ;

  source1:any;
  // source2 : any;


  export() {
    this.exportService.exportExcel(this.excel_, 'Temperatures');
  }
  

  constructor(private exportService: ExportService,
    private service: SmartTableData,
    private mesureServes: MesureService,
    private http: HttpClient,
    private exploitationService: ExploitationService,
    private barragesallService: BarragesallService,
    // private bService: BarrageService

  ) {


    const data = this.service.getData()


    this.barragesallService.getBarragesall().subscribe(
      item => {

        this.produit = item
        console.log(item)
        item.map(e => {


          if (e.capacite_normale == null || e.capacite_normale == null || e.capacite_normale == ''){

          }else {

            this.bassins.push(e.bassin_verssant)
            this.noms.push(e.nom)
            this.rivieres.push(e.riviere)
            this.provinces.push(e.province)
            this.produitsNames.push({

              id_barrage: e.id_barrage,
              nom: e.nom,
              // geom: e.geom,
              province: e.province,
              bassin_verssant: e.bassin_verssant,
              riviere: e.riviere,
              annee_mise_service: e.annee_mise_service,
              hauteur_fondation: e.hauteur_fondation,
              capacite_retenue: e.capacite_retenue,
              capacite_total_cumule: e.capacite_total_cumule,
              fonction: e.fonction,
              data: e.data,
              capacite_normale: e.capacite_normale
            }
            )
          }

        })
        this.removeDuplicates()
        this.source=this.produitsNames;
        this.source1 = this.source
        this.produits = this.produitsNames[0];
        this.produits = JSON.stringify(this.produits)
        this.settings = Object.assign({}, this.settings);
      }
    );


    this.variable0 = [];


    this.settings = {
      actions: {
        edit: false,
        add: false,
        delete: false, //as an example
        custom: [{ name: 'Afficher Graph', title: `<i class="fas fa-chart-line" style = "size = 1px"></i>` }]
      },
      pager: { perPage: 15 },

      class: 'background-color:#000 !important',

      columns: {
        nom: {
          title: 'Nom Barrage',
          type: 'string',
          filter: false,
        },
        province: {
          title: 'Province',
          type: 'string',
          filter: false,
        },
        bassin_verssant: {
          title: "Bassin Verssant",
          type: 'string',
          filter: false,
        },
        riviere: {
          title: "Rivière",
          type: 'string',
          filter: false,
        },
        annee_mise_service: {
          title: "Année de mise en service",
          type: 'string',
          filter: false,
        },
        hauteur_fondation: {
          title: "Hauteur Fondation",
          type: 'string',
          filter: false,
        },
        capacite_retenue: {
          title: "Capacite",
          type: 'string',
          filter: false,
        },
        capacite_total_cumule: {
          title: "Capacité Totale Cumulée",
          type: 'string',
          filter: false,
        },
        capacite_normale: {
          title: "Capacite Normale",
          type: 'string',
          filter: false,
        },
      },
    };



  }
  affGraph(event){
    console.log(event)
    this.barragesallService.getChartBarragesByName(event.data.nom).subscribe(
      item => {
        this.datagraph=item
      }
    )
    this.graphbool=true;
    console.log(this.datagraph);
    this.barrageinfo = event.data
    this.f_bassin =event.data.bassin_verssant
    this.f_nom =event.data.nom
    this.f_province =event.data.province
    this.f_riviere =event.data.riviere
    this.filtreTableau()

    console.log(event.data)

  }
  Fermer(){
    this.graphbool=false;
    this.f_bassin = 'all'
    this.f_nom ='all'
    this.f_province ='all'
    this.f_riviere ='all'
    this.filtreTableau()


  }

  filtreTableau(){
    this.source = this.source1;
    this.bassins=[];
    this.noms=[];
    this.rivieres=[];
    this.provinces=[];
    if (this.f_nom != undefined && this.f_nom != 'all'){
      this.source =this.source.filter(u => 
        u.nom == this.f_nom )
    }
    if (this.f_province != undefined && this.f_province != 'all'){
      this.source=this.source.filter(u => 
        u.province == this.f_province )
    }
    if (this.f_bassin != undefined && this.f_bassin != 'all'){
      this.source=this.source.filter(u => 
        u.bassin_verssant == this.f_bassin )
    }
    if (this.f_riviere != undefined && this.f_riviere != 'all'){
      this.source=this.source.filter(u => 
        u.riviere == this.f_riviere )
    }
    this.source.forEach(e => {
      this.bassins.push(e.bassin_verssant)
      this.noms.push(e.nom)
      this.rivieres.push(e.riviere)
      this.provinces.push(e.province)
      
    });
    this.removeDuplicates()

    console.log("a")
    console.log(this.source)


    // console.log(this.source2)
    
  }

  removeDuplicates(){
    this.noms = this.noms.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.provinces = this.provinces.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.rivieres = this.rivieres.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.bassins = this.bassins.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })

    this.noms = this.noms.sort()
    this.provinces = this.provinces.sort()
    this.rivieres =  this.rivieres.sort()
    this.bassins = this.bassins.sort()

  }


  ngOnInit(){
    

  }

  settings: any;

  source: any;



}