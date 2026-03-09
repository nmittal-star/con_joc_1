import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RedisDataService {
    apiUrl: string = 'api/redissearch';

    constructor(private http: HttpClient) { }

    getRedis(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}