import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BillingComponentDataService {
    apiUrl: string = 'api/billingcomponent';

    constructor(private http: HttpClient) { }

    getBillingComponent(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    updateBillingComponent(id:number,data:any):Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`,data)
    }
}