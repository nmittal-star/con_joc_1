import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsDataService {
    apiUrl: string = 'api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}