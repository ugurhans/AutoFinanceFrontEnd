import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimDto } from 'src/app/models/operationClaimDto';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaims';
import { Wallet } from 'src/app/models/wallet';
import { WalletDto } from 'src/app/models/walletDto';

import { LocalStorageService } from 'src/app/services/local-storage.service';
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
  usersClaims:OperationClaimDto[]=[];
  usersWallet!:WalletDto[];
  userWallet!:Wallet;
  dataLoad!:Boolean;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private walletService:WalletService
  ) { }

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.getUsersClaims();
    this.getWallet();
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
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Kullanıcı bilgileri eksik', 'Hata');
    }
  }

  getUsersClaims(){
    let userId =  parseInt(this.localStorageService.get("id")!);
    this.userService.getUserClaimsById(userId).subscribe(response=>{
      this.usersClaims = response.data;
      console.log(this.usersClaims)
    })
  }

  // getWallet(){
  //   this.walletService.getVerifiedWalletDtoById(parseInt(this.localStorageService.get("id")!)).subscribe(response=>{
  //     this.usersWallet = response.data;
  //     console.log(this.usersWallet)
  //   });
  // }


  getWallet(){
    let userId =  parseInt(this.localStorageService.get("id")!);
    this.walletService.getWalletById(userId).subscribe(response=>{
      this.userWallet = response.data
      console.log(this.userWallet)
    })
  }
}
