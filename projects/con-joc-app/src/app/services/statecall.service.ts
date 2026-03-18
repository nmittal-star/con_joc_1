import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class StateCallService {
  private routingSubject = new BehaviorSubject<any>({});

  routing$ = this.routingSubject.asObservable();

  setRoutingData(data: any): void {
    if (!data) return;
    this.routingSubject.next(data);
    localStorage.setItem('selectedStateName', JSON.stringify(data));
  }

  getRoutingData(): any {
    return this.routingSubject.value;
  }

  clearRoutingData(): void {
    this.routingSubject.next({});
    localStorage.removeItem('selectedStateName');
  }
}
