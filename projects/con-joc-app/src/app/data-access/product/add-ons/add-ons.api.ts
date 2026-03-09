import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AddonsDataService {
    apiUrl: string = 'api/addons';

    constructor(private http: HttpClient) { }

    getAddons(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}