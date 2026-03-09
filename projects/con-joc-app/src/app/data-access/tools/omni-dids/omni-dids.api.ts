import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OmniDIDDataService {
    apiUrl: string = 'api/omnidids';

    constructor(private http: HttpClient) { }

    getOmniDID(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}