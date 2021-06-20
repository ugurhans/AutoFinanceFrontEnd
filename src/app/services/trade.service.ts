import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';
import { Trade } from '../models/trade';
import { TradeA } from '../models/tradeA';
import { TradeDto } from '../models/tradeDto';
import { TradeProDto } from '../models/tradeProDto';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  

  apiUrl = "https://localhost:44376/api/";

  constructor(private httpClient: HttpClient) { }
  
  getTrades(): Observable<ListResponseModel<Trade>> {
    let newPath = this.apiUrl + "trades/getall";
    return this.httpClient.get<ListResponseModel<Trade>>(newPath);
  }

  getTradesDto(): Observable<ListResponseModel<TradeDto>> {
    let newPath = this.apiUrl + "trades/getallDetails";
    return this.httpClient.get<ListResponseModel<TradeDto>>(newPath);
  }

  add(trade: Trade): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'trades/addtrade', trade);
  }

  addPro(tradeA:TradeA):Observable<ResponseModel> {
   return this.httpClient.post<ResponseModel>(this.apiUrl+'trades/addTradePro',tradeA);
  }

  delete(trade: Trade): Observable<ResponseModel> { 
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'trades/deletetrade', trade);
  }
}
// this.apiUrl+'trades/addtradePro?order='+orderFirst+'&product='+product+'&customerWallet='+customerWallet+'&supplierWallet='+supplierWallet