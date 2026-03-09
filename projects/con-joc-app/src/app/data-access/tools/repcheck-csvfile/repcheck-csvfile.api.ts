import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RepCheckCsvFileDataService {
    apiUrl: string = 'api/repcheckcsvfile';

    constructor(private http: HttpClient) { }

    getRepCheckCsvFile(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}