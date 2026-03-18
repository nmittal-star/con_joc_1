import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root',
})

export class StatecallDataService{
    apiUrl:string ='api/statecall';
    apiUrl1:string='api/statecallholidays'
    constructor(private http:HttpClient){}

    getStateCall(): Observable<any> {
        return this.http.get(this.apiUrl)
    }

    getStateCallHolidays(): Observable<any> {
        return this.http.get(this.apiUrl1)
    }
}