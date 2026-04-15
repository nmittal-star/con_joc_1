import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contacts.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactsDataService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'api/contacts';

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }
}
