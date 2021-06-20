import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Trade } from 'src/app/models/trade';
import { TradeDto } from 'src/app/models/tradeDto';
import { TradeService } from 'src/app/services/trade.service';


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  tradesDto: TradeDto[] = [];
  trades: Trade[] = [];
  constructor(private tradeService: TradeService) { }
  
  ngOnInit(): void {
    this.getTradesDto();
  }

  down() {
      var element= document.getElementById('table')!;

      html2canvas(element).then((canvas)=>{
        console.log(canvas);
        var imgdata = canvas.toDataURL('image/png')
        var imageHeight =canvas.height *208/canvas.width;
        var doc = new jspdf.jsPDF();
        doc.addImage(imgdata,0,0,208,imageHeight);
        doc.save('image.pdf');
      })
  }


  getTrades() {
    this.tradeService.getTrades().subscribe(response => {
      this.trades = response.data;
    })
  }

  getTradesDto() {
    this.tradeService.getTradesDto().subscribe(response => {
      this.tradesDto = response.data;
    })
  }
}

