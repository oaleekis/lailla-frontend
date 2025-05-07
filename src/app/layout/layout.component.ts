import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

export type MenuItem = {
  label: string;
  icon: string;
  route: string;
}


@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  menuItems = signal<MenuItem[]>([
    { label: 'Dashboard', icon: 'speed', route: '/dashboard' },
    { label: 'Financeiro', icon: 'request_quote', route: '/financial' },
    { label: 'Categorias', icon: 'category', route: '/categories' },
  ]);

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

}


