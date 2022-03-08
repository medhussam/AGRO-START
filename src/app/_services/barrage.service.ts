import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BarrageService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
   

  getChartBarragesByNameAndDate(nom,debut,fin) {
    return this.http.get<any[]>(`${environment.apiUrl}/barragedatadate/${nom}/${debut}/${fin}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getCamembet() {
    return this.http.get<any>(`${environment.apiUrl}/camembert`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }


  getCamembertbyID(id_exploitation) {
    return this.http.get<any>(`${environment.apiUrl}/mesureparexp/${id_exploitation}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  
  
  getChartBarragesByName(nom) {
    return this.http.get<any[]>(`${environment.apiUrl}/barragedata/${nom}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getBarrages(id_exploitation) {
    return this.http.get<any>(`${environment.apiUrl}/barrages/${id_exploitation}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

}
