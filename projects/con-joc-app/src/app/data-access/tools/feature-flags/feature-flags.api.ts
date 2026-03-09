import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeatureFlagsDataService {
    apiUrl: string = 'api/featureflags';

    constructor(private http: HttpClient) { }

    getFeatureFlags(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}