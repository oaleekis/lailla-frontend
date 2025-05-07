import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TransactionModalComponent } from '../../shared/transaction-modal/transaction-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  totalReceitas = 10000;
  totalDespesas = 4500;
  totalMes = this.totalReceitas - this.totalDespesas;


  constructor(
    private dialog: MatDialog,
  ) { }

  openTransactionModal(type: string) {
    const dialogRef = this.dialog.open(TransactionModalComponent, {
      data: { type: type },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);

      }
    });
  }
}
