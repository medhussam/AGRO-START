import { Component, Input, OnChanges, OnInit} from '@angular/core';


@Component({
    selector: 'ngx-data-grid',
    styleUrls: ['./data-grid.component.scss'],
    template: `
       <nb-card class="headings-card">
          <nb-card-header>
            
          <b>  Informations sur le capteur séléctionné</b>
          </nb-card-header>
          <nb-card-body>
            <div class=" header">
              <div>
                <p>ID Capteur</p>
              </div>
    
              <div  class="detail">
                {{id_capteur}}
              </div>
            </div>
            <div class="header">
              <div>
            <p>Date d'installation</p>
              </div>
    
              <div  class="detail">
                {{convert(date_installation) }}
              </div>
            </div>
            <div class="header">
              <div>
                <p>Date de la derniére mesure</p>
              </div>
              
              <div class="detail">
                {{convert(derniere_mesure_time)}} 
              </div>
            </div>
            <div class="header">
              <div>
                <p>Exploitation/Parcelle</p>
              </div>
    
              <div class="detail">
                {{matricule_exploitation+' / '+ matricule_parcelle}} 
              </div>
            </div>
            <div class="header">
              <div>
                <p>Moyenne (24h) journalière</p>
              </div>
    
              <div class="detail">
                {{moyenne_24h| number : '1.2-2'}} {{mesure}}
              </div>
            </div>
            <div class="header">
              <div>
                <p>Maximum (24h) journalier</p>
              </div>
    
              <div class="detail">
                {{maximum_24h}} {{mesure}}
              </div>
            </div>
            <div class="header">
                <div>
                  <p>Minimum journalier (24h)</p>
                </div>
      
                <div class="detail">
                  {{minimum_24h}} {{mesure}}
                </div>
              </div>
               <div *ngIf="mesure == 'C°'" class="header">
              <div>
                <p>Amplitude thermique</p>
              </div>
    
              <div class="detail">
                {{maximum_24h - minimum_24h | number : '1.2-2'}} C°
              </div>
            </div>
          </nb-card-body>
        </nb-card>
  `,
  })

export class DataGridComponent implements OnInit, OnChanges {
    @Input() dataGrid;
    @Input() eventPages;
    @Input() eventExploitation;
    @Input() eventCapteur;
    
    id_capteur;
    date_installation;
    derniere_mesure_time;
    matricule_exploitation;
    matricule_parcelle;
    moyenne_24h;
    maximum_24h;
    minimum_24h;
    mesure;
    
    constructor() {}
    ngOnChanges(): void {
        this.dataGrid.forEach(element => {
            
            if( element.mesure == this.eventPages && element.id_capteur == this.eventCapteur ){
                
                this.id_capteur = element.id_capteur;
                this.date_installation = element.date_installation;
                this.derniere_mesure_time = element.derniere_mesure.time;
                this.matricule_exploitation = element.matricule_exploitation;
                this.matricule_parcelle = element.id_parcelle;
                this.moyenne_24h = element.moyenne_24h;
                this.maximum_24h = element.maximum_24h;
                this.minimum_24h = element.minimum_24h;
                switch (element.mesure) {
                  case 'temperature':
                    this.mesure = 'C°';
                    break;
                  case 'humidity':
                      this.mesure = '%';
                      break;
                      case 'light':
                        this.mesure = 'LUX';
                        break;
                        case 'soil_conductivity':
                          this.mesure = 'µS/cm';
                          break;
                          case 'soil_humidity':
                            this.mesure = '%';
                            break;
                            case 'soil_temperature':
                              this.mesure = 'C°';
                              break;
                              case 'wind_speed':
                                this.mesure = 'm/s';
                                break;
                                case 'rain':
                                  this.mesure = 'mm';
                                  break;
                                  case 'atmosphericPressure':
                                    this.mesure = 'kPa';
                                    break;
                                    case 'vapourPressure':
                                      this.mesure = 'kPa';
                                      break;
                                      case 'solar':
                                        this.mesure = 'W/m²';
                                        break;
                                        case 'strikes':
                                          this.mesure = '';
                                          break;
                                          case 'windDirection':
                                            this.mesure = '°';
                                            break;
                } 
                              
            }
        });
    }
    ngOnInit(): void {
 
    }
    convert(str) {
     
   
      var date = new Date(str),
        year =  date.getFullYear(),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        min = ("0" + date.getMinutes()).slice(-2);
   
      switch (mnth) {
        case "01": {
          return ["jan", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "02": {
          return ["Feb", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "03": {
          return ["mar", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "04": {
          return ["apr", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "05": {
          return ["may", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "06": {
          return ["jun", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "07": {
          return ["jul", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "08": {
          return ["aug", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "09": {
          return ["sep", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "10": {
          return ["oct", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "11": {
          return ["nov", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
        case "12": {
          return ["dec", day,(hour + "h:" +min),"/"+year].join(" ");
          break;
        }
      }}
}
