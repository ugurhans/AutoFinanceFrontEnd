import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  apiUrl = "https://localhost:44376/api/";

  constructor(private httpClient: HttpClient) { }
  
  getSuppliers(): Observable<ListResponseModel<Wallet>> {
    let newPath = this.apiUrl + "wallets/getall";
    return this.httpClient.get<ListResponseModel<Wallet>>(newPath);
  }
}
