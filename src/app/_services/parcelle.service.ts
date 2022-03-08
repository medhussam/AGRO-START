import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ParcelleService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
  getParcelles() {
    return this.http.get(`${environment.apiUrl}/parcelles`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getParcelles_exp(id_exploitation) {
    return this.http.get<any>(`${environment.apiUrl}/parcelles_exp/${id_exploitation}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  

  getparcelle_data(id_parcelle) {
    return this.http.get<any>(`${environment.apiUrl}/parcelle_data/${id_parcelle}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  dessinerParcelle(geoParcelle) {
    return this.http.post<any>(`${environment.apiUrl}/addpar`,{geoParcelle}, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  






  getCapteurs_Parcelle_data(id_parcelle ,debut ,fin ) {
    return this.http.get<any[]>(`${environment.apiUrl}/capteurs_parcelle/${id_parcelle}/soil_humidity/${debut}/${fin}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }


  getParcelle_indexes(exploitation ,debut ,fin ) {
    return this.http.get<any[]>(`${environment.apiUrl}/parcelles_indexes/${exploitation}/${debut}/${fin}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }


  getParcellesImagery() {
    return this.http.get<any>(`${environment.apiUrl}/parcellesImagery`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }




}