import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl="https://localhost:44376/api/";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath  = this.apiUrl + "customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  addCustomer(customer:Customer):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl + 'customers/addcustomer',customer);
    }

    getCustomerById(userId:number):Observable<SingleResponseModel<Customer>>{
      let newPath  = this.apiUrl + "customers/getallbyuserid?userId="+userId;
      return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
    }
  }



