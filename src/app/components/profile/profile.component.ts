import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { UserDto } from 'src/app/models/userDto';
import { CustomerService } from 'src/app/services/customer.service';
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
  userId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
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

   getUser(){
     this.userService.getByEmail(this.localStorageService.get("email")!).subscribe(response=>{
       this.user = response.data;
     })
   }

  // getCustomerByUserId(userId: number) {
  //   this.customerService.getCustomerById(userId).subscribe((response) => {
  //     this.customer = response.data;
  //   });
  // }
}
