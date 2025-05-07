import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export class HttpService<T> {
  constructor(
    protected http: HttpClient,
    protected endpoint: string
  ) {}

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${this.endpoint}/${id}`).pipe(
      tap(response => {}),
      catchError(error => this.handleError(error))
    );
  }

  getAll(page: number = 1, pageSize: number = 10): Observable<{ items: any[], totalItems: number }> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<{ items: any[], totalItems: number }>(
      `${environment.apiUrl}/${this.endpoint}`,
      { params }
    ).pipe(
      tap(response => {}),
      catchError(error => this.handleError(error))
    );
  }

  add(data: any): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/${this.endpoint}`, data).pipe(
      tap(response => {}),
      catchError(error => this.handleError(error))
    );
  }

  update(id: string, data: any): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${this.endpoint}/${id}`, data).pipe(
      tap(response => {}),
      catchError(error => this.handleError(error))
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/${this.endpoint}/${id}`).pipe(
      tap(response => {}),
      catchError(error => this.handleError(error))
    );
  }

  protected handleError(error: any) {
    if (error.status === 401) {
      console.error('Erro de autenticação.');
    } else if (error.status === 400) {
      console.error('Erro na requisição. Verifique os dados.');
    }
    return throwError(() => error);
  }
}
