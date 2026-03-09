import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountGroupsDataService {
    apiUrl: string = 'api/accountgroups';

    constructor(private http: HttpClient) { }

    getAccountGroups(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}