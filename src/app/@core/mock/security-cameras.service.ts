import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Camera, SecurityCamerasData } from '../data/security-cameras';

@Injectable()
export class SecurityCamerasService extends SecurityCamerasData {

  private cameras: Camera[] = [
    {
      id_capteur: ' EM500-LGT_001',
      source: 'assets/images/EM500-LGT_001.jpg',
      dateinstall: '15/12/2020',
      parrameter: 'Luminosité',
      location_install: 'Atelier Agroconcept'
    },
    {
      id_capteur: ' EM500-SMT_001',
      source: 'assets/images/EM500-SMT_001.jpg',
      dateinstall: '16/12/2020',
      parrameter: 'Température & Humidité du sol',
      location_install: 'Atelier Agroconcept'
    },
    // {
    //   id_capteur: ' EM500-SMT_003',
    //   source: 'assets/images/EM500-SMT_003(2).jpg',
    //   dateinstall: '17/12/2020',
    //   parrameter: 'Température & Humidité du sol',
    //   location_install: 'Jardin Agroconcept'
    // },
    {
      id_capteur: ' EM500-SMT_003',
      source: 'assets/images/EM500-SMT_003.jpg',
      dateinstall: '17/12/2020',
      parrameter: 'Température & Humidité du sol',
      location_install: 'Jardin Agroconcept'
    },
    {
      id_capteur: ' UC11-T1_003',
      source: 'assets/images/UC11-T1_003.jpg',
      dateinstall: '16/12/2020',
      parrameter: 'Température & Humidité',
      location_install: 'Jardin Agroconcept'
    },
 
  ];

  getCamerasData(): Observable<Camera[]> {
    return observableOf(this.cameras);
  }
}
