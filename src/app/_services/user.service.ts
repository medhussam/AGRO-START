import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';

import { User } from '../_models/user';
import { environment } from 'environments/environment';
// import { DataCaptur } from '../pages/dashboard/dashboard.component';
// import { User } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    getToken() {
        // debugger

        var h = localStorage.getItem('x-access-token');
        var j = JSON.parse(h);
        return j.accessToken

    }
    setAccessToken(accessToken: string) {
        localStorage.setItem('x-access-token', accessToken)
    }
    getUser() {
        return "1";
    }
    getAll() {
        return this.http.get(`${environment.apiUrl}/exploitations`, {

            headers: {
                // "userId": this.getUser(),
                "x-access-token": this.getToken(),
                "accept": "*/*"

            },
            // observe: 'response'
        })
        // .pipe(
        //     tap((res: HttpResponse<any>) => {
        //         this.setAccessToken(res.headers.get('x-access-token'));
        //     })
        // )

    }
    getDataC() {
        return this.http.get<any[]>('assets/data/at_1.json');
    }
}