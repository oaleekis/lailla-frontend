import { Component, Inject, ChangeDetectionStrategy, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import moment from 'moment';
registerLocaleData(localePt);

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
  amount: number = 0;
  title: string = '';
  categories: any[] = []
  selectedCategory: string = '';
  date: any;

  constructor(
    private dialogRef: MatDialogRef<TransactionModalComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: { type: 'income' | 'expense', mode: 'edit' | 'create', element: any }
  ) { }

  ngOnInit(){
    this.fetchCategories();

    if (this.data.mode === 'edit') {
      this.amount = this.data.element?.amount;
      this.title = this.data.element?.title;
      this.selectedCategory = this.data.element?.category;
      const dateValue = this.data.element?.date;
      this.date = moment.isMoment(dateValue) ? dateValue : moment(dateValue, 'DD/MM/YYYY');
    }
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

  save() {
    this.dialogRef.close({
      id: this.data.element?.id,
      type: this.data.type.toLocaleUpperCase(),
      amount: this.amount.toString(),
      title: this.title,
      categoryId: this.selectedCategory,
      date: this.date.format('YYYY-MM-DD')
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
