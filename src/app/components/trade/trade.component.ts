import { Component, OnInit } from '@angular/core';
import { Trade } from 'src/app/models/trade';
import { TradeDto } from 'src/app/models/tradeDto';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  tradesDto:TradeDto []=[];
trades:Trade[]=[];
  constructor(private tradeService:TradeService) { }

  ngOnInit(): void {
    this.getTradesDto();
  }

  getTrades(){
    this.tradeService.getTrades().subscribe(response=>{
      this.trades = response.data;
    })
  }

  getTradesDto(){
    this.tradeService.getTradesDto().subscribe(response=>{
      this.tradesDto = response.data;
    })
  }
}
