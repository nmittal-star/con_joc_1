import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CronManagerDataService {
    apiUrl: string = 'api/cronmanager';

    constructor(private http: HttpClient) { }

    getCronManager(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    updateCronManager(id:number,data:any):Observable<any>{
        return this.http.patch(`${this.apiUrl}/${id}`,data)
    }

    createCronManager(data:any):Observable<any>{
        return this.http.post(this.apiUrl,data)
    }
    
    deleteCronManager(id:number,):Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}