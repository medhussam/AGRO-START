import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
// import { MainMesure } from '../pages/dashboard/dashboard.component';
@Injectable({
  providedIn: 'root'
})
export class MesureService {
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient) { }
  getMesures() {
    return this.http.get<any>(`${environment.apiUrl}/mesures_2`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }


  getCurrentData(id_exploitation) {
    return this.http.get<any>(`${environment.apiUrl}/current_data/${id_exploitation}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  
  getPrevision(id_exploitation) {
    return this.http.get<any>(`${environment.apiUrl}/forecast/${id_exploitation}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getChart_data(id_exploitation,mesure) {
    let type = 'web'
    return this.http.get<any>(`${environment.apiUrl}/Chart_data/${type}/${id_exploitation}/${mesure}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  getChart_data1(id_exploitation,mesure) {
    let type = 'web'
    return this.http.get<any>(`${environment.apiUrl}/Chart_data1/${type}/${id_exploitation}/${mesure}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  
  getChart_data2(id_exploitation,mesure) {
    let type = 'web'
    return this.http.get<any>(`${environment.apiUrl}/Chart_data2/${type}/${id_exploitation}/${mesure}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  
  getChart_data3(id_exploitation,mesure) {
    let type = 'web'
    return this.http.get<any>(`${environment.apiUrl}/Chart_data3/${type}/${id_exploitation}/${mesure}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  
  getChart_data4(id_exploitation,mesure) {
    let type = 'web'
    return this.http.get<any>(`${environment.apiUrl}/Chart_data4/${type}/${id_exploitation}/${mesure}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  
  getChart_data5(id_exploitation,mesure) {
    let type = 'web'
    return this.http.get<any>(`${environment.apiUrl}/Chart_data5/${type}/${id_exploitation}/${mesure}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }
  
  getChart_data6(id_exploitation,mesure) {
    let type = 'web'
    return this.http.get<any>(`${environment.apiUrl}/Chart_data6/${type}/${id_exploitation}/${mesure}`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }


}
