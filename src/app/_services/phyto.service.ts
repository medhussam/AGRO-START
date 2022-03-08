import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhytoService {

  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }

  constructor(private http: HttpClient) {}

  getPhytoData(){
    return this.http.get<any>(`${environment.apiUrl}/phyto`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
}
