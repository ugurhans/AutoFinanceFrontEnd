import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { timer } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';
import { Wallet } from 'src/app/models/wallet';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private walletService:WalletService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      tcNo:["",Validators.required],
      phone:["",Validators.required],
      adress:["",Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      
      let registerModel = Object.assign({}, this.registerForm.value);
      console.log(registerModel)
      this.authService.register(registerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.localStorageService.set('token', response.data.token);
          this.localStorageService.set('email', registerModel.email);
          timer(25).subscribe((p) => {
            window.location.href = '/';
          });
        },
        (responseError) => {
          if (responseError.error.Errors) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Hata'
              );
            }
          }
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Kullanıcı bilgileri eksik', 'Hata');
    }
  }
}
