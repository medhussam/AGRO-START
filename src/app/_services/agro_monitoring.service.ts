import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AgroMonitoringService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
   


  getCarto_data(debut ,fin ,measurement,exploitation  ) {
    return this.http.get<any[]>(`${environment.apiUrl}/carto_data/${debut}/${fin}/${measurement}/${exploitation}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  
  getCarto_current_data(exploitation ,date ) {
    return this.http.get<any[]>(`${environment.apiUrl}/carto_current_data/${exploitation}/${date}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

}
