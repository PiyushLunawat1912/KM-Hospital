// src/app/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.29.104:3000/api/auth';  // Your backend API

  private loggedInSubject = new BehaviorSubject<boolean>(false);  // Observable to track login state

  constructor(private http: HttpClient) {}

  // Observable for login status
  getLoginStatus() {
    return this.loggedInSubject.asObservable();
  }

  // Signup user
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Login user and set login status to true
  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      // If login is successful, set the login status to true
      tap(() => this.loggedInSubject.next(true))
    );
  }

  // Logout user and set login status to false
  logout() {
    this.loggedInSubject.next(false);  // Set login status to false
  }
}
