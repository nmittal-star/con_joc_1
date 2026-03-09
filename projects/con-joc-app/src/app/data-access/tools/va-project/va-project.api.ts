import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VAProjectDataService {
    apiUrl: string = 'api/vaproject';

    constructor(private http: HttpClient) { }

    getVAProject(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}