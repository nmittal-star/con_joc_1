import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeatureSettingsDataService {
    apiUrl: string = 'api/featuresettings';

    constructor(private http: HttpClient) { }

    getFeatures(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}