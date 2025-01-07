import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model'
import { Login } from '../models/login.model';
import { catchError, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ADMIN';
  }

  isUser(): boolean {
    return localStorage.getItem('userRole') === 'USER';
  }

  public apiUrl = environment.backendUrl; 


  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user);
  }


  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, login).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          localStorage.setItem('username', response.username);
          localStorage.setItem('mobileNumber', response.mobileNumber);
          localStorage.setItem('userRole', response.userRole);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('loginDTO', JSON.stringify(response));
        }
      })
    );
  }

  getUserByUserId(userId: number): Observable<any> {
    return this.http.get(this.apiUrl + "/api/user/" + userId, { headers: this.getAuthHeaders() });
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('mobileNumber');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('loginDTO');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}