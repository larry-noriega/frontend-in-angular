import { Observable } from 'rxjs';
import { TransactionResponse } from '../../Models/TransactionResponse.model';
import { PaymentRequest } from '../../Models/PaymentRequest.model';
import { PaymentResponse } from '../../Models/PaymentResponse.model';

export abstract class PaymentServices {
  abstract getTransactions(page: number): Observable<TransactionResponse>;
  
  abstract createPayment(paymentData: PaymentRequest): Observable <PaymentResponse>;
}
