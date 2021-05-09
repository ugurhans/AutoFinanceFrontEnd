import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallets :Wallet[] =[];
  wallet!:Wallet;
  constructor(
    private walletService:WalletService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.getWallets();
  }
  getWallets(){
    this.walletService.getWallets().subscribe(response=>{
      this.wallets = response.data
    })
  }

  verifyWallet(wallet:Wallet){
    this.walletService.verifyWallet(wallet).subscribe(response=>{
      this.toastrService.success("Wallet Verified")
    })
  }
}
