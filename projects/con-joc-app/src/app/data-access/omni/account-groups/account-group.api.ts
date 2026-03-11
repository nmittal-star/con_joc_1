import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountGroupsDataService {
    apiUrl: string = 'api/accountgroups';
    apiUrl1:string='api/settings';
    apiUrl2:string='api/impersonation'

    constructor(private http: HttpClient) { }

    getAccountGroups(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getSettings(): Observable<any> {
        return this.http.get(this.apiUrl1);
    }

    getImpersonations(): Observable<any> {
        return this.http.get(this.apiUrl2);
    }
}