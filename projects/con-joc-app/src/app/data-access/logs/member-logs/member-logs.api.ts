import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MemberLogsDataService {
    apiUrl: string = 'api/memberlogs';

    constructor(private http: HttpClient) { }

    getMemberLogs(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}