import { Routes } from '@angular/router';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create-payment', pathMatch: 'full' },
  { path: 'create-payment', component: CreatePaymentComponent },
  { path: 'transactions', component: TransactionsComponent }
];
