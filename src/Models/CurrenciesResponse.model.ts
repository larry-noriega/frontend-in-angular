import { Pagination } from "./Pagination.model"

export interface CurrenciesResponse extends Pagination {
  data: Currency[]  
}

export interface Currency {
  id: number
  name: string
  value: string
}