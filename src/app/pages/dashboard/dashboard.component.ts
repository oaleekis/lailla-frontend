import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TransactionModalComponent } from '../../shared/transaction-modal/transaction-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FinancialService } from '../../services/financial.service';
import { DashboardService } from '../../services/dashboard.service';
import { BrlPipe } from '../../shared/pipes/brl.pipe';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    BrlPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  totalReceitas: number = 0;
  totalDespesas: number = 0;
  totalMes: number = 0;


  constructor(
    private dialog: MatDialog,
    private financialService: FinancialService,
    private dashboardService: DashboardService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dashboardService.getTotalBalanceLastMonth().subscribe((data) => {
      this.totalMes = data;
    });
    this.dashboardService.getTotalExpensesLastMonth().subscribe((data) => {
      this.totalDespesas = data;
    });
    this.dashboardService.getTotalIncomesLastMonth().subscribe((data) => {
      this.totalReceitas = data;
    });
  }

  openTransactionModal(type: 'income' | 'expense', mode = 'create') {
    const dialogRef = this.dialog.open(TransactionModalComponent, {
      data: { type, mode },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.financialService.add(result).subscribe(() => {
            this.snackBarService.openSnackBar('Transação criada com sucesso!', 'success');
            this.fetchData();
          });
      }
    });
  }
}
