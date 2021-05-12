import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Wallet } from 'src/app/models/wallet';
import { WalletDto } from 'src/app/models/walletDto';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  wallets: Wallet[] = [];
  wallet!: Wallet;
  walletDto: WalletDto[] = [];
  constructor(
    private walletService: WalletService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWalletsDto();
  }
  getWallets() {
    this.walletService.getWallets().subscribe((response) => {
      this.wallets = response.data;
    });
  }

  getWalletsDto() {
    this.walletService.getWalletsDto().subscribe((response) => {
      this.walletDto = response.data;
    });
  }

  verifyWallet() {
    let userId = parseInt(localStorage.getItem("id")!);
     this.getWalletByUserId(userId)
    this.walletService.verifyWallet(this.wallet).subscribe((response) => {
      this.toastrService.success('Wallet Verified');
    });
  }

  getWalletByUserId(userId:number){
    this.walletService.getWalletById(userId).subscribe(response=>{
      this.wallet = response.data;
    })

    
  }
}
