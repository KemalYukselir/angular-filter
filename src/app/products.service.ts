import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable()
export class ProductsService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  public getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>("/api/products");
  }
}
