import { Component, OnInit } from '@angular/core';
import { Trade } from 'src/app/models/trade';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
trades:Trade[]=[];
  constructor(private tradeService:TradeService) { }

  ngOnInit(): void {
    this.getTrades();
  }

  getTrades(){
    this.tradeService.getTrades().subscribe(response=>{
      this.trades = response.data;
    })
  }

}
