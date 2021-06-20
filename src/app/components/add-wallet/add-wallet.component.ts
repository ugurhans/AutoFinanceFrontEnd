import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css'],
})
export class AddWalletComponent implements OnInit {
  walletAddForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private walletService: WalletService,
    private toastrService:ToastrService
    ) {}

  ngOnInit(): void {
    this.createWalletAddForm();
  }

  createWalletAddForm(){
    this.walletAddForm = this.formBuilder.group({
      balance:[""],
      toVerify:[false,Validators.required],
      balanceUs:[""],
      balanceEur:[""],
      balanceFr:[""],
    })
  }

  addWallet() {
    if (this.walletAddForm.valid) {
      let walletModel = Object.assign({}, this.walletAddForm.value)
      walletModel.userId = parseInt(localStorage.getItem("id")!)
      this.walletService.add(walletModel).subscribe(response => {
        this.toastrService.success(response.message);
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error");
          }
        }
      })

    } else {
     this.toastrService.error("Formunuz eksik", "Dikkat")
    }


  }
}


