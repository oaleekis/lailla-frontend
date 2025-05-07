import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  totalReceitas = 10000;
  totalDespesas = 4500;
  totalMes = this.totalReceitas - this.totalDespesas;


  addFinancial(type: string) {
    console.log(`Adicionando ${type}`);
  }
  
}
