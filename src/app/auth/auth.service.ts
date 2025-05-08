import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthResponseDto {
  accessToken: string;
  expiresIn: number;
  user: { id: string };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((res) => {
        this.setToken(res.accessToken);
        this.setUserId(res.user.id);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  register(name: string, email: string, password: string, userId?: string): Observable<AuthResponseDto> {
    const payload = { name, email, password, userId };
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/users`, payload).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  logout(): void {
    this.clearToken();
    this.clearUserId();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  private setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  private clearUserId(): void {
    localStorage.removeItem('userId');
  }

}