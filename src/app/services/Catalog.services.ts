import { Observable } from 'rxjs';
import { CurrenciesResponse } from '../../Models/CurrenciesResponse.model';
import { DocumentTypeResponse } from '../../Models/DocumentTypeResponse.model';


export abstract class CatalogServices {
  abstract getCurrenciesCatalog(): Observable<CurrenciesResponse>;
  
  abstract getDocumentTypesCatalog(): Observable<DocumentTypeResponse>;
}
