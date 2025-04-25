import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { NgIf, NgFor, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Transaction, TransactionResponse } from '../../../Models/TransactionResponse.model';

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
  transactions: Transaction[] = [];
  loading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private paymentService: PaymentService) {}

  getPaymentMethodName(method: any['paymentMethod']): string {
    return method?.name || this.DEFAULT_PAYMENT_METHOD;
  }

  getFormattedDate(date: Date | null): Date {
    return date ? new Date(date) : this.DEFAULT_DATE;
  }

  getNumericValue(value: number | null): string {
    return value?.toString() || this.DEFAULT_NUMBER;
  }

  ngOnInit() {
    this.loadTransactions(this.currentPage);
  }

  loadTransactions(page: number) {
    this.loading = true;
    this.error = null;
    
    this.paymentService.getTransactions(page).subscribe({
      next: (result: TransactionResponse) => { 
        this.transactions = result.data;
        this.totalPages = result?.meta?.last_page;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las transacciones';
        this.loading = false;
        console.error('Error fetching transactions:', error);
      }
    });
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTransactions(this.currentPage);
    }
  }
}