import { Observable } from 'rxjs';

export interface Camera {
  id_capteur: string;
  source: string;
  dateinstall: string;
  parrameter: string;
  location_install: string;
}

export abstract class SecurityCamerasData {
  abstract getCamerasData(): Observable<Camera[]>;
}
