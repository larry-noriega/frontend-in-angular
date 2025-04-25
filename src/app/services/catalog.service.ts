import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CatalogServices } from './Catalog.services';
import { CurrenciesResponse } from '../../Models/CurrenciesResponse.model';
import { DocumentTypeResponse } from '../../Models/DocumentTypeResponse.model';
import { cachedCatalog } from '../../Models/CachedCatalog.model';

@Injectable({
  providedIn: 'root'
})

export class CatalogService extends CatalogServices {
  private apiUrl = environment.apiUrl;
  private cachedCatalog: cachedCatalog = {
    DocumentsType: {} as DocumentTypeResponse, 
    Currencies: {} as CurrenciesResponse
  };  

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
    super();
  }
  
  getCurrenciesCatalog(): Observable<CurrenciesResponse> {   
    
    const cachedData = localStorage.getItem('Currencies');

    if (cachedData) {
      return of(this.cachedCatalog.Currencies = JSON.parse(cachedData));
    }
    
    return this.http.get<CurrenciesResponse>(`${this.apiUrl}/currencies`, { headers: this.headers }).pipe(
      tap(data => { localStorage.setItem('Currencies', JSON.stringify(data)); })
    );
  }

  getDocumentTypesCatalog(): Observable<DocumentTypeResponse> {

    const cachedData = localStorage.getItem('DocumentTypes'); 
    if (cachedData) {
      return of(this.cachedCatalog.Currencies = JSON.parse(cachedData));
    }
    
    return this.http.get<DocumentTypeResponse>(`${this.apiUrl}/documentTypes`, { headers: this.headers }).pipe(
      tap(data => { localStorage.setItem('DocumentTypes', JSON.stringify(data)); })
    );
  }
}