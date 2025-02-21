// src/app/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://km-backend-y9hq.onrender.com/api/auth';  // Your backend API

  private loggedInSubject = new BehaviorSubject<boolean>(this.getStoredLoginStatus());

  constructor(private http: HttpClient) {}

  // Get login status as observable
  getLoginStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // Check login status from localStorage
  private getStoredLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Login user and persist login status
  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap(() => this.loggedInSubject.next(true)),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error.error.message);
        return throwError(() => new Error(error.error.message || 'Login error'));
      })
    );
  }

  // Logout user and clear login state
  logout(): void {
    localStorage.removeItem('isLoggedIn'); // ✅ Remove login state
    localStorage.removeItem('user'); // ✅ Remove user data
    this.loggedInSubject.next(false); // ✅ Emit logout state
  }
    // Signup user
    signup(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/signup`, userData);
    }
}




