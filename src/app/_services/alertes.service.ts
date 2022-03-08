import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlertesService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
  getAlertes() {
    return this.http.get<any>(`${environment.apiUrl}/alerts`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getAlertesCount() {
    return this.http.get<any>(`${environment.apiUrl}/count`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getAlertesLevelCount() {
    return this.http.get<any>(`${environment.apiUrl}/levels`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getAlertesTypesCount() {
    return this.http.get<any>(`${environment.apiUrl}/types`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }



  
  alertSeen(id_alert){
    console.log(this.getToken())
    return this.http.post<any>(`${environment.apiUrl}/alertseen`,{ "id_alert" : id_alert }, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  allAlertSeen(){

    const headers = { 'x-access-token': this.getToken(), 'accept': "*/*" };
    const body = { title: 'Angular POST Request Example' };
    return this.http.post<any>(`${environment.apiUrl}/allalertseen`, body, { headers });



  }
//   getCapteur_Table() {
//     return this.http.get<any>(`${environment1.apiUrl}/capteurs_exploitations`, {
//       headers: {
//         "x-access-token": this.getToken(),
//         "accept": "*/*"
//       },
//     })
//   }

  
}
