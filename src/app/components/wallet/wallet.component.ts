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
 
  dataLoad:boolean=false;
  localUserId!:number;
  usersWallet!:Wallet;
  usersWalletDto:WalletDto[]=[];

  usersWaitingWallet:WalletDto[]=[];

  constructor(

    private walletService: WalletService,
    private toastrService: ToastrService

  ) {}



  ngOnInit(): void {

  this.getUser();
  this.getUsersWalletDto();
  }

  getUsersWalletDto(){
    this.walletService.getWalletsDto().subscribe(response=>{
      this.usersWalletDto= response.data;
      console.log(this.usersWalletDto)
      this.dataLoad=true;
    })
  }

  verifyWallet(walletDto:WalletDto) {
    let walletModel:Wallet = {
      id:walletDto.walletId,
      balance:walletDto.balance,
      toVerify:false,
      userId:walletDto.userId,
      balanceEur:walletDto.balanceEur,
      balanceFr:walletDto.balanceFr,
      balanceUs:walletDto.balanceUs
    }
    this.walletService.verifyWallet(walletModel).subscribe(response=>{
      this.toastrService.success("Wallet Verified")
    })
  }

  getUser(){
    this.localUserId=parseInt(localStorage.getItem("id")!)
  }
}
