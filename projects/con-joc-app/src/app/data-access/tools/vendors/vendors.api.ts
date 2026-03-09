import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VendorsDataService {
    apiUrl: string = 'api/vendors';

    constructor(private http: HttpClient) { }

    getVendors(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}