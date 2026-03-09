import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExtensionDataService {
    apiUrl: string = 'api/extensionsearch';

    constructor(private http: HttpClient) { }

    getExtension(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}