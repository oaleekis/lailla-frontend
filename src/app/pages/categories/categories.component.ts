import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CategoriesModalComponent } from '../../shared/categories-modal/categories-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
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
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent {
  selectedDate = '';
  selectedCategory = '';

  displayedColumns: string[] = ['name', 'createdAt', 'actions'];
  dataSource = [
    { name: 'Alimentação', createdAt: '2025-05-01' },
    { name: 'Transporte', createdAt: '2025-05-03' },
  ];

  constructor(
    private dialog: MatDialog,
  ) { }

  openCategoryModal(mode: 'edit' | 'create', element?: any) {
    const dialogRef = this.dialog.open(CategoriesModalComponent, {
      data: { name: '', mode, element },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);

      }
    });
  }
}
