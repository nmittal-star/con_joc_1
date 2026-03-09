import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SystemStatusLogsDataService {
    apiUrl: string = 'api/systemstatuslogs';

    constructor(private http: HttpClient) { }

    getSystemStatusLogs(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}