import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimDto } from 'src/app/models/operationClaimDto';
import { User } from 'src/app/models/user';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usersClaims:OperationClaimDto[]=[];
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
   
    private localStorageService:LocalStorageService
  ) { }
  user!: User;
  ngOnInit(): void {
    this.getUsersClaims();
  }

  isAdmin() {
  for (let i = 0; i < this.usersClaims.length; i++) {
    if(this.usersClaims[i].operationClaimName=="admin")
    return true
  }
   return false;
  }

  isCustomer() {
    for (let i = 0; i < this.usersClaims.length; i++) {
      if(this.usersClaims[i].operationClaimName=="customer")
      return true
    }
     return false;
    }

    isSupplier() {
      for (let i = 0; i < this.usersClaims.length; i++) {
        if(this.usersClaims[i].operationClaimName=="supplier")
        return true
      }
       return false;
      }

  getUsersClaims(){
    let userId =  parseInt(this.localStorageService.get("id")!);
    this.userService.getUserClaimsById(userId).subscribe(response=>{
      this.usersClaims = response.data;
      console.log(this.usersClaims)
    })
  }

  checkAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  getUserStorage(){
    let name = localStorage.getItem("name");
    return name;
  }
  getUser() {
    this.userService
      .getByEmail(this.localStorageService.get('email')!)
      .subscribe((response) => {
        this.user = response.data;
      });
  }
 

  signOut() {
    this.localStorageService.clean();
    timer(25).subscribe((p) => {
      window.location.href = '/homepage';
    });
  }

}
