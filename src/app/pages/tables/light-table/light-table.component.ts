import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SmartTableData } from 'app/@core/data/smart-table';
import { ExploitationService } from 'app/_services/exploitation.service';
import { ExportService } from 'app/_services/export.service';
import { MesureService } from 'app/_services/mesure.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-light-table',
  templateUrl: './light-table.component.html',
  styleUrls: ['./light-table.component.scss']
})
export class LightTableComponent implements OnInit {
  mesures: any;
  temperature: any[] = [];
  valueTime: any[] = [];
  exploitetion: { value: string; title: string; }[] = [];
  variable0: { value: string; title: string; }[];



  excel_: any[] = [];



  export() {
    this.exportService.exportExcel(this.excel_, 'Light');
  }

  constructor(private exportService: ExportService,
    private service: SmartTableData,
    private mesureServes: MesureService,
    private http: HttpClient,
    private exploitationService: ExploitationService,
   
    ) {
     const data = this.service.getData()

      this.mesureServes.getMesures().subscribe((item) => {
     
      item.map(e => {
      
              this.mesures = e;
         
   });
       
 
     });
  

      
   this.mesureServes.getMesures().subscribe((item) => { 
       this.mesures = item;
    item.map(e => {
     if(e.mesure == "light"){
       
         e.data.map(a => {
           
           a.value.map(b => {   this.valueTime.push(
             {id_exploitation: e.id_exploitation,mesure :  '<i class="fas fa-sun"></i>',
             id_capteur : a.id_capteur,
             value : b.value+' ' ,
             time : b.time.substring(11,19),
             date : b.time.substring(0,10)
            }); 
          
          
            this.excel_.push(
              {
              id_capteur : a.id_capteur,
              id_exploitation: e.id_exploitation,
              value : b.value ,
              time : b.time.substring(11,19),
              date : b.time.substring(0,10)
             });
          });
    
             this.temperature.push(a);
           
        });
       
           
         
     
    }
   });
 
   this.source.load(this.valueTime);
   this.settings = Object.assign({}, this.settings);
   });


 this.variable0 = [];
  
   
  this.settings = {
     actions: false, 
     pager: {perPage:30},
    
     columns: {
       mesure: {
         title: '',
         type: 'html',
         filter: false,
       },
       id_capteur: {
         title: 'Identifiant du capteur',
         type: 'number',
         
       },
       id_exploitation: {
         title: "Identifiant de l'exploitation",
         type: 'string',
         filter: {
           type: 'list',
             config: {
               selectText: 'Select id_exploitation',
                 list:this.variable0 ,
               }
             },
       },
     
      
       value: {
         title: 'Valeur',
         type: 'string',
         filter: false,
       },
       date: {
        title: "Date d'enregistrement",
        type: 'string',
        filter: false,
      }, time: {
        title: "Heure d'enregistrement",
        type: 'string',
        filter: false,
      },
     },
   };
  
  } 
  

ngOnInit(): void {
   

  this.exploitationService.getExploitations().subscribe(item => {
    item.features.map(e => {
       this.variable0.push({value :e.properties.id_exploitation,title :e.properties.matricule});
    });
  })
 

 
}
   



  settings :any;


  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'username',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false);
  }

  source: LocalDataSource = new LocalDataSource();

 
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
 

}