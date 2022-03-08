import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  verifyLogin(login){

    try { 
      return this.http.get<any>(`${environment.apiUrl}/checklogin/${login}/`, {
        headers: {
          "accept": "*/*"
        },
      })
    }
    catch(error){
      console.log(error);
    }
  }

  verifyMail(mail){
    
    try { 
      return this.http.get<any>(`${environment.apiUrl}/checkmail/${mail}/`, {
        headers: {
          "accept": "*/*"
        },
      })
    }
    catch(error){
      console.log(error);
    }
  }

  addRole(login,password){
    
    try { 
      return this.http.post<any>(`${environment.apiUrl}/addrole/${login}/${password}/`, {
        headers: {
          "accept": "*/*"
        },
      })
    }
    catch(error){
      console.log(error);
    }
  }

  addPP(login,password,nom,prenom,cin,gsm,mail){
    
    try { 
      return this.http.post<any>(`${environment.apiUrl}/adduser/${login}/${password}/${nom}/${prenom}/${cin}/${gsm}/${mail}/`, {
        headers: {
          "accept": "*/*"
        },
      })
    }
    catch(error){
      console.log(error);
    }
  }
  addPM(denomination,cap_soc,forme_juridique,ice,num_rc,adresse,id_fiscal,fixe){
    try {
      return this.http.post<any>(`${environment.apiUrl}/addorganisme/${denomination}/${cap_soc}/${forme_juridique}/${ice}/${num_rc}/${adresse}/${id_fiscal}/${fixe}/`, {
        headers: {
          "accept": "*/*"
        },
      })
    }    
    catch(error){
      console.log(error);
    }
  

  }

  addUserOrg(id_user_users,id_organisme,type_user){
    try {
      return this.http.post<any>(`${environment.apiUrl}/add_user_organisme/${id_user_users}/${id_organisme}/${type_user}/`, {
        headers: {
          "accept": "*/*"
        },
      })
    }    
    catch(error){
      console.log(error);
    }

}



}
 