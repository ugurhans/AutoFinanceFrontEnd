import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ProductDto } from '../models/productDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://localhost:44376/api/";
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallproducts";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsById(productId: number): Observable<SingleResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getproductbyid?productId="+productId;
    return this.httpClient.get<SingleResponseModel<Product>>(newPath);
  }

  getProductsDto(): Observable<ListResponseModel<ProductDto>> {
    let newPath = this.apiUrl + "products/getallproductsdto";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
  }

  getProductsUnVerified(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallproductsunverified";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsDtoUnVerified(): Observable<ListResponseModel<ProductDto>> {
    let newPath = this.apiUrl + "products/getallproductdtounverified";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
  }


  getProductsVerified(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallproductsverified";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsDtoVerified(): Observable<ListResponseModel<ProductDto>> {
    let newPath = this.apiUrl + "products/getallproductdtoverified";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath);
  }


  add(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'products/addproduct', product);
  }


  delete(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'products/deleteproduct', product);
  }


  update(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'products/updateproduct', product);
  }


  verifyProduct(product:Product){
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'products/verifyproduct',product)
  }
}
