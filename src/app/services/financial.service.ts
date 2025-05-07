import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialService extends HttpService<any> {

  constructor(http: HttpClient) {
    super(http, 'financial');
  }
}
