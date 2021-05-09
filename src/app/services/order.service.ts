import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl="https://localhost:44376/api/";

  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + "products/getallproductsdto";
    return  this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}
