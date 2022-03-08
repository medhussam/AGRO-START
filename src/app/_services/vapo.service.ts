import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VapoService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
  
  getVapo(idParcelle) {
    return this.http.get<any>(`${environment.apiUrl}/evapotranspiration/${idParcelle}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  getVapoWeekly(idParcelle) {
    return this.http.get<any>(`${environment.apiUrl}/evapotranspiration_weekly/${idParcelle}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  evapotranspiration_period(idParcelle) {
    return this.http.get<any>(`${environment.apiUrl}/evapotranspiration_period/${idParcelle}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }


  parceletcImagery(idParcelle) {
    return this.http.get<any>(`${environment.apiUrl}/parceletcImagery/${idParcelle}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  
  getStatistics(idParcelle) {
    return this.http.get<any>(`${environment.apiUrl}/parceletcstats/${idParcelle}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  
}
