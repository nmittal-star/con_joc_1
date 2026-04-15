import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Trunk } from './trunks.interface';

@Injectable({
  providedIn: 'root',
})
export class TrunksDataService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'api/trunks';

  getTrunks(): Observable<Trunk[]> {
    return this.http.get<Trunk[]>(this.apiUrl);
  }
}
