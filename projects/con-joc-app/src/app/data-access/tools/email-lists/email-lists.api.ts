import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmailListsDataService {
    apiUrl: string = 'api/emaillists';

    constructor(private http: HttpClient) { }

    getEmailLists(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}