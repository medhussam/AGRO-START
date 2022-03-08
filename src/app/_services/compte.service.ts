import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  postId: any;
  errorHandler : any;
  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }
  constructor(private http: HttpClient, user: UserService) { }

  getCompte() {
    return this.http.get<any>(`${environment.apiUrl}/infos`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  // getClient() {
  //   return this.http.get<any>(`${environment.apiUrl}/clients`, {
  //     headers: {
  //       "x-access-token": this.getToken(),
  //       "accept": "*/*"
  //     },
  //   })
  // }

  getPP() {
    return this.http.get<any>(`${environment.apiUrl}/user`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getPM() {
    return this.http.get<any>(`${environment.apiUrl}/organisme`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  getuserorg() {
    return this.http.get<any>(`${environment.apiUrl}/checkuserorg`, {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      },
    })
  }

  updatePP(nom,prenom,cin,gsm,email){ 

        try {
    return this.http.patch(`${environment.apiUrl}/modify_user/${nom}/${prenom}/${cin}/${gsm}/${email}/`,{},
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
  }

  updatePM(denomination,cap_soc,forme_juridique,ice,num_rc,adresse,id_fiscale,fixe ){ 

    try {
return this.http.patch(`${environment.apiUrl}/modify_organisme/${denomination}/${cap_soc}/${forme_juridique}/${ice}/${num_rc}/${adresse}/${id_fiscale}/${fixe}/`,{},
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
}

  updatePass(password){ 

     try {
      return this.http.patch(`${environment.apiUrl}/modify_password/${password}`,{},
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
}

}


