import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { NgIf, NgFor, CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [NgIf, NgFor, CurrencyPipe, DatePipe, NgClass],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  standalone: true
})
export class TransactionsComponent implements OnInit {
  private readonly DEFAULT_PAYMENT_METHOD = 'Método no especificado';
  private readonly DEFAULT_DATE = new Date();
  private readonly DEFAULT_NUMBER = '0.00';
  transactions: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private paymentService: PaymentService) {}

  getPaymentMethodName(method: any['payment_method']): string {
    return method?.name || this.DEFAULT_PAYMENT_METHOD;
  }

  getFormattedDate(date: string | null): Date {
    return date ? new Date(date) : this.DEFAULT_DATE;
  }

  getNumericValue(value: string | null): string {
    return value || this.DEFAULT_NUMBER;
  }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.error = null;
    
    this.paymentService.getTransactions().subscribe({
      next: (data:any) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las transacciones';
        this.loading = false;
        console.error('Error fetching transactions:', error);
      }
    });
  }
}
