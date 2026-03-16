import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root',
})

export class DIDOrdersDataService{
    apiUrl:string ='api/didorders';
    apiUrl1:string ='api/vieworders'
    constructor(private http:HttpClient){}

    getDIDOrders(): Observable<any> {
        return this.http.get(this.apiUrl)
    }

    getViewOrders(): Observable<any> {
        return this.http.get(this.apiUrl1)
    }
}