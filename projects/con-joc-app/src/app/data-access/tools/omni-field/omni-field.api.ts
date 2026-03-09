import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OmniFieldDataService {
    apiUrl: string = 'api/omnifield';

    constructor(private http: HttpClient) { }

    getOmniField(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}