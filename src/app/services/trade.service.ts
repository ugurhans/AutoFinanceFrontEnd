import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Trade } from '../models/trade';
import { TradeDto } from '../models/tradeDto';

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
}
