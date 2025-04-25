import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TransactionResponse } from '../../Models/TransactionResponse.model';
import { PaymentRequest } from '../../Models/PaymentRequest.model';
import { PaymentResponse } from '../../Models/PaymentResponse.model';
import { PaymentServices } from './Payment.services';
import { CurrenciesResponse } from '../../Models/CurrenciesResponse.model';

@Injectable({
  providedIn: 'root'
})

export class PaymentService extends PaymentServices {
  private apiUrl = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
    super();
  }

  createPayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/payment`, paymentData, { headers: this.headers });
  }

  getTransactions(page: number): Observable<TransactionResponse> {
    return this.http.get<TransactionResponse>(`${this.apiUrl}/transactions?page=${page}`, { headers: this.headers });
  }

  getCurrenciesCatalog(): Observable<CurrenciesResponse> {
    return this.http.get<CurrenciesResponse>(`${this.apiUrl}/currencies`, { headers: this.headers });
  }
}