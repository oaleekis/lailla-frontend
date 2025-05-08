import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpService<any> {
  
  constructor(http: HttpClient) {
    super(http, 'financial');
  }

  getTotalBalanceLastMonth() {
    return this.get<number>('total');
  }
  
  getTotalIncomesLastMonth() {
    return this.get<number>('incomes');
  }
  
  getTotalExpensesLastMonth() {
    return this.get<number>('expenses');
  }
}
