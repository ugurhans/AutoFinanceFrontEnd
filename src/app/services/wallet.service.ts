import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  apiUrl = "https://localhost:44376/api/";

  constructor(private httpClient: HttpClient) { }
  
  getWallets(): Observable<ListResponseModel<Wallet>> {
    let newPath = this.apiUrl + "wallets/getall";
    return this.httpClient.get<ListResponseModel<Wallet>>(newPath);
  }

  verifyWallet(wallet:Wallet):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'wallets/verifywallet',wallet)
  }
}
