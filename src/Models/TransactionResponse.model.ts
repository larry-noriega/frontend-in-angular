import { Pagination } from "./Pagination.model"

export interface TransactionResponse extends Pagination {
  data: Transaction[]  
}

export interface Transaction {
  id: number
  customerId: number
  paymentMethodId?: number
  amount: number
  currency: string
  fee: number | null
  total: number | null
  status: string
  metadata: string
  created_at: Date
  customer: Customer
  paymentMethod?: PaymentMethod
}

export interface Customer {
  id: number
  typeDocument: string
  numberDocument: string
  name: string
  email: string
  preferences: string
}

export interface PaymentMethod {
  id: number
  name: string
  config: string
}