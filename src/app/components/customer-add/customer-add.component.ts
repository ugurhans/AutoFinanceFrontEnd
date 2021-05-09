import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  user!: User;
  customer!: Customer;
  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private toastrService: ToastrService,
    
  ) { }
 
  ngOnInit(): void {
    this.getUser();
  }

  getCustomer(userId: number) {
    this.getUser();
    this.customerService.getCustomerById(userId).subscribe(response => {
      this.customer = response.data;
    })
  }

  addCustomer(customer: Customer) {
    this.customerService.addCustomer(customer);
  }

  getUser() {
    let mail = localStorage.getItem("email");
    this.userService.getByEmail(mail!).subscribe(response => {
      this.user = response.data;
      this.toastrService.success(this.user.name);
    });
  }

  


}
