import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClustersDataService {
    apiUrl: string = 'api/clusters';

    constructor(private http: HttpClient) { }

    getClusters(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}