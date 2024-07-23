import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  public notifications$ = this.notificationSubject.asObservable();

  showNotification(message: string): void {
    this.notificationSubject.next(message);
  }
}
