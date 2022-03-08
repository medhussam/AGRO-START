import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CapteureService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
  getCapteures(dateDebut,dateFin) {
    return this.http.get<any>(`${environment.apiUrl}/dashboardcapteurs/${dateDebut}/${dateFin}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  getExternalData(idcap,dateDebut,dateFin) {
    return this.http.get<any>(`${environment.apiUrl}/external_data/${idcap}/${dateDebut}/${dateFin}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  getExternalDataUvi(dateDebut,dateFin) {
    return this.http.get<any>(`${environment.apiUrl}/external_data2/${dateDebut}/${dateFin}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  getDataCapteures(mesure,dateDebut,dateFin) {
    return this.http.get<any>(`${environment.apiUrl}/mesure_data/${mesure}/${dateDebut}/${dateFin}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
}
