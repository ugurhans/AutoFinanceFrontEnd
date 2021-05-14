import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimDto } from 'src/app/models/operationClaimDto';
import { User } from 'src/app/models/user';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  user!: User;
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(response => {
        this.localStorageService.set('token', response.data.token);
        this.toastrService.info(response.message)
        this.router.navigate(['/homepage'])
        this.getUser(loginModel.email);
      })
    }
  }



  getUser(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.user = response.data;
    
      this.localStorageService.set('email', this.user.email);
      this.localStorageService.set('name', this.user.name + " " + this.user.lastName);
      this.localStorageService.set('id',this.user.id.toString())

    });
  }
}


