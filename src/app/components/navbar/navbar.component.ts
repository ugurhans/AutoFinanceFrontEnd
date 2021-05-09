import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserDto } from 'src/app/models/userDto';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userClaims: OperationClaim[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private customerService: CustomerService,
    private localStorageService:LocalStorageService
  ) { }
  user!: User;
  userDto!: UserDto;
  ngOnInit(): void {
    this.getUser();
  }

  isAdmin() {
    for (let i = 0; i < this.userClaims.length; i++) {
      if (this.userClaims[i].name == 'admin') {
        return true;
      }
    }
    return false;
  }

  checkAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    this.userService
      .getByEmail(this.localStorageService.get('email')!)
      .subscribe((response) => {
        this.user = response.data;
        this.userService.getUserClaims(this.user);
      });
  }
  getUserClaims(user: User) {
    this.userService.getUserClaims(user).subscribe((response) => {
      this.userClaims = response.data;
    });
  }
  // getUserDetail() {
  //   let mail = localStorage.getItem("email");
  //   this.userService.getByEmail(mail!).subscribe(response => {
  //     this.user = response.data;
  //     this.toastr.success(this.user.id.toString());
  //   });
  // }

  signOut() {
    this.localStorageService.clean();
    timer(25).subscribe((p) => {
      window.location.href = '/';
    });
  }

}
