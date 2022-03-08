import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MarchesService {

    getToken() {
        var h = localStorage.getItem('x-access-token');
        var j = JSON.parse(h);
        return j.accessToken
    }

    constructor(private http: HttpClient) { }

    getMarches() {
        return this.http.get<any>(`${environment.apiUrl}/marches`, {
            headers: {
                "x-access-token": this.getToken(),
                "accept": "*/*"
            },
        })
    }
    getPrix(id_produit,id_marche,type,dated,datef) {
        return this.http.get<any[]>(`${environment.apiUrl}/products_prices/${id_produit}/${id_marche}/${type}/${dated}/${datef}`, {
          headers: {
            "x-access-token": this.getToken(),
            "accept": "*/*"
          },
        })
      }
}
