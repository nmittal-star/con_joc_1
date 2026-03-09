import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeaturesDataService {
    apiUrl: string = 'api/features';

    constructor(private http: HttpClient) { }

    getFeatures(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}