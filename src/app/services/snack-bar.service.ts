import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Fechar', duration: number = 2000) {
    this._snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['custom-snackbar'],
    });
  }
}
