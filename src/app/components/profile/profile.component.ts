import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
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
  customer: Customer = {
    id: 0,
    userId: 0,
  };
  userId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.userId],
      firstName: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.id = this.user.id;
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

  getUser() {
    this.userService
      .getByEmail(this.localStorageService.get('email')!)
      .subscribe((response) => {
        this.user = response.data;
        this.userId = response.data.id;
        this.getCustomerByUserId(this.userId);
      });
  }

  getCustomerByUserId(userId: number) {
    this.customerService.getCustomerById(userId).subscribe((response) => {
      this.customer = response.data;
    });
  }
}
