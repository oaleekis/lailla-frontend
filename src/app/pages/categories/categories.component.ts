import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesModalComponent } from '../../shared/categories-modal/categories-modal.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CategoriesService } from '../../services/categories.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SnackBarService } from '../../services/snack-bar.service';


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
    MatIcon,
    MatPaginatorModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent {
  selectedDate = '';
  selectedCategory = '';

  displayedColumns: string[] = ['name', 'createdAt', 'actions'];
  dataSource: any[] = [];

  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;


  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories(page: number = 1, pageSize: number = 5) {
    this.categoriesService.getAll(Number(page), Number(pageSize)).subscribe((data) => {
      this.totalItems = data.totalItems;
      this.dataSource = data.items.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          userId: item.userId,
          createdAt: new Date(item.createdAt).toLocaleDateString('pt-BR')
        };
      });
    });
  }


  openCategoryModal(mode: 'edit' | 'create', element?: any) {
    const dialogRef = this.dialog.open(CategoriesModalComponent, {
      data: { name: '', mode, element },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'edit') {
          this.categoriesService.update(result.id, result).subscribe(() => {
            this.snackBarService.openSnackBar('Categoria atualizada com sucesso!', 'fechar');
            this.fetchCategories();
          });
          
        } else if (mode === 'create') {
          this.categoriesService.add(result).subscribe(() => {
            this.snackBarService.openSnackBar('Categoria criada com sucesso!', 'fechar');
            this.fetchCategories();
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
        this.categoriesService.delete(confirmed.element.id).subscribe(() => {
          this.snackBarService.openSnackBar('Categoria excluída com sucesso!', 'fechar');
          this.fetchCategories();
        });
      }
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.fetchCategories(this.pageIndex + 1, this.pageSize);
  }
}
