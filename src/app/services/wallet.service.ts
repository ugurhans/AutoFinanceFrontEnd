import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Wallet } from '../models/wallet';
import { WalletDto } from '../models/walletDto';

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

  getWalletsDto(): Observable<ListResponseModel<WalletDto>> {
    let newPath = this.apiUrl + "wallets/getalldetails";
    return this.httpClient.get<ListResponseModel<WalletDto>>(newPath);
  }

  verifyWallet(wallet:Wallet):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'wallets/verifywallet',wallet)
  }

  getWalletDtoById(userId: number): Observable<SingleResponseModel<Wallet>> {
    let newPath = this.apiUrl + "wallets/getalldetailsbyUserId?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<Wallet>>(newPath);
  }

  add(wallet: Wallet): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'wallets/addwallet', wallet);
  }

  update(wallet: Wallet): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'wallets/updatewallet', wallet);
  }


  getWalletById(userId: number): Observable<SingleResponseModel<Wallet>> {
    let newPath = this.apiUrl + "wallets/getallByUserId?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<Wallet>>(newPath);
  }

}
