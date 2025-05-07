import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'financial',
        loadComponent: () =>
          import('./pages/financial/financial.component').then(m => m.FinancialComponent)
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  }
];
