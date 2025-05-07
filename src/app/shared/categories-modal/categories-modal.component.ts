import { Component, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categories-modal',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './categories-modal.component.html',
  styleUrl: './categories-modal.component.scss'
})

export class CategoriesModalComponent {
  name: string = '';

  constructor(
    private dialogRef: MatDialogRef<CategoriesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) { }

  save() {
    this.dialogRef.close({
      name: this.name,
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
