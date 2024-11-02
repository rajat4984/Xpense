import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private isShowNotification: boolean = false;

  constructor() {}

  setData(data: boolean): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<boolean> {
    return this.dataSubject.asObservable();
  }

  showNotification() {
    this.isShowNotification = true;
    setTimeout(() => {
      this.isShowNotification = false;
    }, 3000);
  }
}
