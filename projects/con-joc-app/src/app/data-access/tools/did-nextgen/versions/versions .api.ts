import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VersionsDataService {
    apiUrl: string = 'api/versions';

    constructor(private http: HttpClient) { }

    getVersions(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}