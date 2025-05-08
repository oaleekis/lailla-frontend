import { Component, Inject, ChangeDetectionStrategy, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MY_DATE_FORMATS } from '../constants/date-formats';
import { CategoriesService } from '../../services/categories.service';
import { MatIcon } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import moment from 'moment';
registerLocaleData(localePt);
import { CategoriesModalComponent } from '../categories-modal/categories-modal.component';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-transaction-modal',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatIcon
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TransactionModalComponent {
  amount: string = '';
  title: string = '';
  categories: any[] = [];
  selectedCategory: string = '';
  date: any;

  constructor(
    private dialogRef: MatDialogRef<TransactionModalComponent>,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: { type: 'income' | 'expense', mode: 'edit' | 'create', element: any }
  ) { }

  ngOnInit() {
    this.fetchCategories();

    if (this.data.mode === 'edit') {
      this.amount = this.data.element?.amount;
      this.title = this.data.element?.title;
      this.selectedCategory = this.data.element?.category;
      const dateValue = this.data.element?.date;
      this.date = moment.isMoment(dateValue) ? dateValue : moment(dateValue, 'DD/MM/YYYY');
    }
  }

  fetchCategories(page: number = 1, pageSize: number = 50) {
    this.categoriesService.getAll(Number(page), Number(pageSize)).subscribe((data) => {
      this.categories = data.items.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          createdAt: new Date(item.createdAt).toLocaleDateString('pt-BR')
        };
      });

      if (!this.selectedCategory && this.categories.length > 0) {
        this.selectedCategory = this.categories[0].id;
      }
    });
  }

  save(form: any) {
    this.markAllFieldsAsTouched(form);
    if (this.isFormInvalid()) {
      return;
    }
    this.dialogRef.close({
      id: this.data.element?.id,
      type: this.data.type.toLocaleUpperCase(),
      amount: this.amount.toString(),
      title: this.title,
      categoryId: this.selectedCategory,
      date: this.date.format('YYYY-MM-DD')
    });
  }

  markAllFieldsAsTouched(form: any): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched(); 
    });
  }

  isFormInvalid(): boolean {    
    return !this.date || !this.selectedCategory || !this.amount || this.title.length < 3;
  }

  isInvalidAmount(value: any): boolean {
    const num = parseFloat(value);
    return isNaN(num) || num <= 0;
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  openNewCategoryDialog(mode = 'create') {
      const dialogRef = this.dialog.open(CategoriesModalComponent, {
        data: { name: '', mode },
        width: '800px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.categoriesService.add(result).subscribe(() => {
              this.snackBarService.openSnackBar('Categoria criada com sucesso!', 'fechar');
              this.fetchCategories();
            });
        }
      });
  }
}
