import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OAuthClientDataService {
    apiUrl: string = 'api/oauthclient';

    constructor(private http: HttpClient) { }

    getOAuthClient(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}