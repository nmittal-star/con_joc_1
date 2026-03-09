import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DispositionDataService {
    apiUrl: string = 'api/dispositiondelays';

    constructor(private http: HttpClient) { }

    getDispositionDelays(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}