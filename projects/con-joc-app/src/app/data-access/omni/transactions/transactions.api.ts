import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransactionsDataService {
    apiUrl: string = 'api/transactions';

    constructor(private http: HttpClient) { }

    getTransactions(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}