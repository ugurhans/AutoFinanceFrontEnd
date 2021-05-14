import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimDto } from 'src/app/models/operationClaimDto';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaims';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userUpdateForm!: FormGroup;
  user!: User;
  usersClaims:OperationClaimDto[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.getUsersClaims();
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
}
