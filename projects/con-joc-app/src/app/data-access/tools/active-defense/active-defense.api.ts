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

    createActiveDefense(data:any):Observable<any> {
        return this.http.post(this.apiUrl,data)
    }

    updateActiveDefense(id:number,data:any):Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`,data)
    }

    deleteActiveDefense(id:number):Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}