import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  createPayment(paymentData: any){
    return this.http.post(`${this.apiUrl}/createPayment`, paymentData, { headers: this.headers });
  }

  getTransactions() {
    return this.http.get(`${this.apiUrl}/getTransactions`, { headers: this.headers });
  }
}
