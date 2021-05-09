import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://localhost:44376/api/";
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallproductsdto";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  add(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'products/addproduct', product);
  }

  getProductsById(supplierId: number): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallproductsdto";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsUnVerified(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallproductdtounverified";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getProductsVerified(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallproductdtoverified";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  verifyProduct(product:Product){
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'products/verifyproduct',product)
  }
}
