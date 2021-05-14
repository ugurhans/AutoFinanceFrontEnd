import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  orderAddForm!: FormGroup;

  constructor(  private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createOrderAddForm();
  }

  createOrderAddForm() {
    this.orderAddForm = this.formBuilder.group({
      orderProductName: ["", Validators.required],
      orderAmount: ["", Validators.required],
     
    })
  }

  addOrder() {
    if (this.orderAddForm.valid) {
      let orderModel = Object.assign({}, this.orderAddForm.value)
      orderModel.userId=parseInt(localStorage.getItem("id")!);
      console.log(orderModel)
      this.orderService.add(orderModel).subscribe(response => {
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
