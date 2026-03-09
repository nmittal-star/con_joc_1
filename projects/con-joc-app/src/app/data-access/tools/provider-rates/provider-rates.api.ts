import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProviderRatesDataService {
    apiUrl: string = 'api/providerrates';

    constructor(private http: HttpClient) { }

    getProviderRates(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}