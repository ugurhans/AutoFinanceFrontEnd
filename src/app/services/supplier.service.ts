import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  apiUrl = "https://localhost:44376/api/";

  constructor(private httpClient: HttpClient) { }
  
  getSuppliers(): Observable<ListResponseModel<Supplier>> {
    let newPath = this.apiUrl + "suppliers/getall";
    return this.httpClient.get<ListResponseModel<Supplier>>(newPath);
  }
}
