import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NpanxxUploadDataService {
    apiUrl: string = 'api/npanxxupload';

    constructor(private http: HttpClient) { }

    getNpanxxUpload(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}