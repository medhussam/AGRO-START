import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
  getProduits(id_marche) {
    return this.http.get<any[]>(`${environment.apiUrl}/prixprodmarocains/${id_marche}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  

  getmarches() {
    return this.http.get<any>(`${environment.apiUrl}/marches`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }


}
