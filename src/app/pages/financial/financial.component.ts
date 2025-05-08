import { Component, LOCALE_ID } from '@angular/core';
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
import { FinancialService } from '../../services/financial.service';
import { CategoriesService } from '../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { TransactionModalComponent } from '../../shared/transaction-modal/transaction-modal.component';
import { BrlPipe } from '../../shared/pipes/brl.pipe';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {MatPaginatorModule} from '@angular/material/paginator';
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
    BrlPipe,
    MatPaginatorModule
  ],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss'
})
export class FinancialComponent {
  selectedDate = '';
  selectedCategory = '';
  categories: any[] = []; 

  displayedColumns: string[] = ['type', 'date', 'title', 'category', 'amount', 'actions'];
  dataSource: any[] = [];

  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private dialog: MatDialog,
    private financialService: FinancialService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(){
    this.fetchFinancial();
    this.fetchCategories();
  }
  
  fetchFinancial(page: number = 1, pageSize: number = 5) {
    this.financialService.getAll(Number(page), Number(pageSize)).subscribe((data) => {
      this.totalItems = data.totalItems;
      this.dataSource = data.items.map((item: any) => {
        return {
          date: new Date(item.date).toLocaleDateString('pt-BR'),
          categoryName: item.categoryName,
          title: item.title,
          amount: Number(item.amount),
          id: item.id,
          type: item.type,
          createdAt: new Date(item.createdAt).toLocaleDateString('pt-BR')
        };
      });
    });
  }
  

  fetchCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data.items.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          createdAt: new Date(item.createdAt).toLocaleDateString('pt-BR')
        };
      });
    });
  }

  openTransactionModal(type: 'income' | 'expense', mode: 'edit' | 'create', element?: any) {
    const dialogRef = this.dialog.open(TransactionModalComponent, {
      data: { type, mode, element },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'edit') {
          this.financialService.update(result.id, result).subscribe(() => {
            this.fetchFinancial();
          });
          
        } else if (mode === 'create') {
          this.financialService.add(result).subscribe(() => {
            this.fetchFinancial();
          });
        }

      }
    });
  }

  openConfirm(element: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: 'Tem certeza de que deseja excluir este item?',
        element: element
      },
    });

    dialogRef.afterClosed().subscribe(confirmed => {      
      if (confirmed.confirm === true) {
        this.financialService.delete(confirmed.element.id).subscribe(() => {
          this.fetchFinancial();
        });
      }
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchFinancial(this.pageIndex + 1, this.pageSize);
  }
}
