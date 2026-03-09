import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateTrackerDataService {
    apiUrl: string = 'api/statetracker';

    constructor(private http: HttpClient) { }

    getStateTracker(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}