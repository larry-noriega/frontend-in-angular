import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentResponse } from '../../../Models/PaymentResponse.model';
import { FormValidationService } from '../../services/form-validation.service';
import { PaymentService } from '../../services/payment.service';
import { CatalogService } from '../../services/catalog.service';
import { CurrenciesResponse, Currency } from '../../../Models/CurrenciesResponse.model';
import { DocumentType, DocumentTypeResponse } from '../../../Models/DocumentTypeResponse.model';

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
  currenciesTypes: Currency[] = [];
  documentsTypes: DocumentType[] = [];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private catalogService: CatalogService,
    private validationService: FormValidationService
  ) {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required, this.validationService.customNameValidator()]],
      email: ['', [Validators.required, this.validationService.customEmailValidator()]],
      type_document: ['', Validators.required],
      number_document: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      currency: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCurrencyCatalog();
    this.loadDocumentsTypeCatalog();

    this.paymentForm.get('type_document')?.valueChanges.subscribe(value => {
      this.validationService.updateNumberDocumentValidators(this.paymentForm.get('number_document'), value);
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.paymentService.createPayment(this.paymentForm.value).subscribe({
        next: (response: PaymentResponse) => {
          this.paymentUrl = response.url_payment;

          this.paymentForm.reset();
        },
        error: (error: any) => {
          console.error('Error creating payment:', error);
          alert('Error al crear el link de pago');
        }
      });
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  loadCurrencyCatalog(): void {
    this.catalogService.getCurrenciesCatalog().subscribe({
      next: (response: CurrenciesResponse) => {
        this.currenciesTypes = response.data;
      },
      error: (error: any) => {
        console.error('Error getting catalogs:', error);
        alert('Error al obtener catálogo de monedas.');
      }
    });
  }

  loadDocumentsTypeCatalog(): void {
    this.catalogService.getDocumentTypesCatalog().subscribe({
      next: (response: DocumentTypeResponse) => {
        this.documentsTypes = response.data;
      },
      error: (error: any) => {
        console.error('Error getting catalogs:', error);
        alert('Error al obtener catálogo de tipos de documento.');
      }
    });
  }

  toUpperCase(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}