import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.css'
})
export class CreatePaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paymentUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type_document: ['dni', Validators.required],
      number_document: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      currency: ['PEN', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.paymentForm.valid) {
      this.paymentService.createPayment(this.paymentForm.value).subscribe(
        (response:any) => {
          this.paymentUrl = response.url_payment;
        },
        (error:any) => {
          console.error('Error creating payment:', error);
          alert('Error al crear el link de pago');
        }
      );
    }
  }
}
