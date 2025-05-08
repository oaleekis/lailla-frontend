import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/snack-bar.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackBarService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { name, email, password, confirmPassword } = this.form.value;
      if (password !== confirmPassword) {
          this.form.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      }

      this.authService.register(name, email, password).subscribe(
        {
          next: () => {
            this.snackBar.openSnackBar('Conta criada com sucesso, faça login para continuar!', 'fechar');
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            if (error.status === 409) {
              this.form.get('email')?.setErrors({ emailExists: true });
            } else {
              this.form.get('email')?.setErrors({ invalid: true });
            }
          }
        });
    
    }
  }
}
