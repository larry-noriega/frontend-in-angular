import { Pagination } from "./Pagination.model"

export interface DocumentTypeResponse extends Pagination {
  data: DocumentType[]  
}

export interface DocumentType {
  id: number
  name: string
  value: string
}