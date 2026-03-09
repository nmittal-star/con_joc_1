import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DNOToolsDataService {
    apiUrl: string = 'api/dnotools';

    constructor(private http: HttpClient) { }

    getDNOTools(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}