import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-financial',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIcon
  ],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss'
})
export class FinancialComponent {
  selectedDate = '';
  selectedCategory = '';

  displayedColumns: string[] = ['date', 'category', 'title', 'amount', 'actions'];
  dataSource = [
    { date: '2025-05-01', category: 'Receita', title: 'Pagamento cliente', amount: 500 },
    { date: '2025-05-03', category: 'Despesa', title: 'Compra de material', amount: -200 },
  ];
}
