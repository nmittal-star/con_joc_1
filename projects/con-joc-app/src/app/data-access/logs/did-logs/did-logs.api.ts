import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DIDLogsDataService {
    apiUrl: string = 'api/didlogs';

    constructor(private http: HttpClient) { }

    getDIDLogs(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}