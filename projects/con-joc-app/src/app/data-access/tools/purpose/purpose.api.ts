import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PurposeDataService {
    apiUrl: string = 'api/purpose';

    constructor(private http: HttpClient) { }

    getPurpose(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}