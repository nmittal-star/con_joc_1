import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CronManagerDataService {
    apiUrl: string = 'api/cronmanager';

    constructor(private http: HttpClient) { }

    getCronManager(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}