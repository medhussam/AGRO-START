import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BarragesallService {


    getToken() {
        var h = localStorage.getItem('x-access-token');
        var j = JSON.parse(h);
        return j.accessToken
    }

    constructor(private http: HttpClient) { }

    getBarragesall() {
        return this.http.get<any>(`${environment.apiUrl}/barrages_all`, {
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
}
