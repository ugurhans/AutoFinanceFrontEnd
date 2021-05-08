import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Trade } from '../models/trade';

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
}