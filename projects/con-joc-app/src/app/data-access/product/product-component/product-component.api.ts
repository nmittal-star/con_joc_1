import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductComponentDataService {
    apiUrl: string = 'api/productcomponent';

    constructor(private http: HttpClient) { }

    getProductComponent(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}