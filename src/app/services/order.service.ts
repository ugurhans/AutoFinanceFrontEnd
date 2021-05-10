import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl="https://localhost:44376/api/";

  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<ListResponseModel<Order>>{
    let newPath = this.apiUrl + "orders/getall";
    return  this.httpClient.get<ListResponseModel<Order>>(newPath);
  }
}
