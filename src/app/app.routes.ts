import { Routes } from '@angular/router';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create-payment', pathMatch: 'full' },
  { path: 'create-payment', component: CreatePaymentComponent },
  { path: 'transactions', component: TransactionsComponent }
];
