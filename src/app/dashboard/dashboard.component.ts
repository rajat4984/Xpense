import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BankCardComponent } from '../bank-card/bank-card.component';
import { RecentTransactionsComponent } from '../recent-transactions/recent-transactions.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    BankCardComponent,
    RecentTransactionsComponent,
    ExpensesComponent,
    SidebarComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
