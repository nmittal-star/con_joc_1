import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReleaseLogsDataService {
    apiUrl: string = 'api/releaselogs';

    constructor(private http: HttpClient) { }

    getReleaseLogs(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}