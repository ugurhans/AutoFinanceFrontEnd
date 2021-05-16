import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Order } from '../models/order';
import { OrderDto } from '../models/orderDto';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getOrdersByUserIdOrder(userId:number):Observable<ListResponseModel<Order>>{
    let newPath = this.apiUrl + "orders/getbyuserid?userId="+userId;
    return  this.httpClient.get<ListResponseModel<Order>>(newPath);
  }

  getOrdersDetail():Observable<ListResponseModel<OrderDto>>{
    let newPath = this.apiUrl + "orders/getalldto";
    return  this.httpClient.get<ListResponseModel<OrderDto>>(newPath);
  }

  getOrdersDetailByUserId(userId:number):Observable<ListResponseModel<OrderDto>>{
    let newPath = this.apiUrl + "orders/getalldtobyuserid?userId="+userId;
    return  this.httpClient.get<ListResponseModel<OrderDto>>(newPath);
  }

  add(order: Order): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'orders/addorder', order);
  }

  update(order: Order): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'orders/updateorder', order);
  }

  delete(order: Order): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'orders/deleteorder', order);
  }
}
