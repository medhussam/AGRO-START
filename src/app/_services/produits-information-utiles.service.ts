import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ProduitsInformationUtilesService {
    getToken() {
        var h = localStorage.getItem('x-access-token');
        var j = JSON.parse(h);
        return j.accessToken
    }
    constructor(private http: HttpClient) { }
    getProduits() {
        return this.http.get<any[]>(`${environment.apiUrl}/produits`, {
            headers: {
                "x-access-token": this.getToken(),
                "accept": "*/*"
            },
        })
    }


    getProdAndTypeBymarche(productSelectionner,marcherSelectionner,typecelectionner) {
        return this.http.get<any[]>(`${environment.apiUrl}/products_prices/${productSelectionner}/${marcherSelectionner}/${typecelectionner}`, {
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

      getType() {
        return this.http.get<any>(`${environment.apiUrl}/produits_types`, {
          headers: {
            "x-access-token": this.getToken(),
            "accept": "*/*"
          },
        })
      }
}
