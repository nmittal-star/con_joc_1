import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActiveDefenseDataService {
    apiUrl: string = 'api/activedefense';

    constructor(private http: HttpClient) { }

    getActiveDefense(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}