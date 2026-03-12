import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsersDataService {
    apiUrl: string = 'api/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get(this.apiUrl);
    }


    updateUser(id: number, data: any) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }
}