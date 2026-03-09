import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountsDataService {
    apiUrl: string = 'api/accounts';

    constructor(private http: HttpClient) { }

    getAccounts(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}