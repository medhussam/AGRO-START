import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UserService } from './user.service';
// import { Observable, throwError } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeuilsService {
  postId: any;
  errorHandler : any;
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  

  constructor(private http: HttpClient, user: UserService) { }
  getSeuils() {

    return this.http.get<any>(`${environment.apiUrl}/seuils`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  archSeuil(id_capteur,parametre){ 

    // return this.http.patch<any>(`${environment.apiUrl}/archseuil/${id_capteur}/${parametre}`, {
    //   headers: {
    //     "x-access-token": this.getToken(),
    //     "accept": "*/*"
    //   },
    // })
    // console.log(this.getToken())
    // console.log("Voila 1 ^")
    try {
    return this.http.patch(`${environment.apiUrl}/archseuil/${id_capteur}/${parametre}/`,{},
    {
      headers: {
        "x-access-token": this.getToken().toString(),
        "accept": "*/*"
      }
    })
  }
  catch(error){
    console.log(error);
  }
    // .pipe(retry(1),catchError(this.errorHandler))

  }

//   createSeuil(parametre,id_capteur,warning_max,warning_min,critique_max,critique_min){

//     // ,{ "parametre": parametre,"id_capteur": id_capteur,"warning_max":warning_max,"warning_min":warning_min,"critique_max":critique_max,"critique_min":critique_min }
//  try {
//   //  console.log(this.getToken())
//   //  console.log("Voila 2 ^")
//   return this.http.post(`${environment.apiUrl}/postseuil/${id_capteur}/${parametre}/${warning_min}/${warning_max}/${critique_min}/${critique_max}`,
//    {
//     headers: {
//       "x-access-token": this.getToken().toString(),
//       "accept": "*/*"
//     },
//   })
//  } catch (error) {
//    console.log(error);
//  }
//   }




createSeuil(id_capteur,parametre,warning_min,warning_max,critique_min,critique_max,culture,id_parcelle) {
  
 var res = this.http.post(`${environment.apiUrl}/postseuil/${id_capteur}/${parametre}/${warning_min}/${warning_max}/${critique_min}/${critique_max}}/${culture}/${id_parcelle}/`,{}, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
    return res
  }

}
interface newSeuil {
  id_capteur :string,
  parametre :string,
  warning_min :number,
  warning_max :number,
  critique_min :number,
  critique_max :number,
  id_parcelle : string,
  culture :string,

}