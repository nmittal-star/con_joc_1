import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SinchOrderDataService {
    apiUrl: string = 'api/sinchorder';

    constructor(private http: HttpClient) { }

    getSinchOrder(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}