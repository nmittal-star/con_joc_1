import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BlacklistDataService {
    apiUrl: string = 'api/blacklist';

    constructor(private http: HttpClient) { }

    getBlacklist(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}