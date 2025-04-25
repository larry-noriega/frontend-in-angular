import { CurrenciesResponse } from "./CurrenciesResponse.model";
import { DocumentTypeResponse } from "./DocumentTypeResponse.model";

export interface cachedCatalog {
  DocumentsType: DocumentTypeResponse;

  Currencies: CurrenciesResponse;
}