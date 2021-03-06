import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimDto } from 'src/app/models/operationClaimDto';
import { Trade } from 'src/app/models/trade';
import { TradeDto } from 'src/app/models/tradeDto';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaims';
import { Wallet } from 'src/app/models/wallet';
import { WalletDto } from 'src/app/models/walletDto';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TradeService } from 'src/app/services/trade.service';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userUpdateForm!: FormGroup;
  user!: User;
  tradesDto!:Trade[];
  usersClaims:OperationClaimDto[]=[];
  usersWallet!:WalletDto[];
  userWallet!:Wallet;
  dataLoad!:Boolean;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private walletService:WalletService,
    private tradeService:TradeService
  ) { }

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.getUsersClaims();
    this.getWallet();
    this.getTrades();
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({  
     name:["",Validators.required],
     lastName:["",Validators.required],
     email:["",Validators.required],
     password:["",Validators.required]
    })
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.id = parseInt(this.localStorageService.get("id")!);
      console.log(userModel);
      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Ba??ar??l??');
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Kullan??c?? bilgileri eksik', 'Hata');
    }
  }

  getUsersClaims(){
    let userId =  parseInt(this.localStorageService.get("id")!);
    this.userService.getUserClaimsById(userId).subscribe(response=>{
      this.usersClaims = response.data;
      console.log(this.usersClaims)
    })
  }
  getTrades(){
    let userId =  parseInt(this.localStorageService.get("id")!);
    this.tradeService.getTradesDtoById(userId).subscribe(response=>{
      this.tradesDto=response.data;
    })
  }

  getWallet(){
    let userId =  parseInt(this.localStorageService.get("id")!);
    this.walletService.getWalletById(userId).subscribe(response=>{
      this.userWallet = response.data
      console.log(this.userWallet)
    })
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

}
