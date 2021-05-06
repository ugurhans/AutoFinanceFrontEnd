import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallets :Wallet[] =[];
  constructor(private walletService:WalletService) { }

  ngOnInit(): void {
    this.getWallets();
  }
  getWallets(){
    this.walletService.getSuppliers().subscribe(response=>{
      this.wallets = response.data
    })
  }
}
