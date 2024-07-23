import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { id: 1, email: 'admin@gmail.com', password: 'admin123', role: 'Admin' },
    {
      id: 2,
      email: 'manager@gmail.com',
      password: 'manager123',
      role: 'Manager',
    },
    { id: 3, email: 'user@gmail.com', password: 'user123', role: 'User' },
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<User | null> {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUserSubject.next(user);
      return of(user);
    } else {
      return of(null);
    }
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
