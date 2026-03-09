import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MetabaseReportsDataService {
    apiUrl: string = 'api/metabasereports';

    constructor(private http: HttpClient) { }

    getMetabaseReports(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}