import { Component, ChangeDetectionStrategy, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../shared/constants/date-formats';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { TransactionModalComponent } from '../../shared/transaction-modal/transaction-modal.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@Component({
  selector: 'app-financial',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIcon,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialComponent {
  selectedDate = '';
  selectedCategory = '';

  displayedColumns: string[] = ['date', 'category', 'title', 'amount', 'actions'];
  dataSource = [
    { date: '2025-05-01', category: 'Receita', title: 'Pagamento cliente', amount: 500 },
    { date: '2025-05-03', category: 'Despesa', title: 'Compra de material', amount: -200 },
  ];

  constructor(
    private dialog: MatDialog,
  ) { }

  openTransactionModal(type: 'income' | 'expense', mode: 'edit' | 'create', element?: any) {
    const dialogRef = this.dialog.open(TransactionModalComponent, {
      data: { type, mode, element },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  openConfirm() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
      title: 'Confirmar Exclusão',
      message: 'Tem certeza de que deseja excluir este item?'
      },
    });
  
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('Confirmed');
      } else {
        console.log('Cancelled');
      }
    });
  }
}
