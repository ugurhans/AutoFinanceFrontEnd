import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { Trade } from 'src/app/models/trade';
import { Wallet } from 'src/app/models/wallet';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TradeService } from 'src/app/services/trade.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
})
export class OrderAddComponent implements OnInit {
  customerWallet!: Wallet;
  supplierWallet!: Wallet;
  products: Product[] = [];
  orderAddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private productService: ProductService,
    private tradeService: TradeService,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.createOrderAddForm();
  }

  createOrderAddForm() {
    this.orderAddForm = this.formBuilder.group({
      orderProductName: ['', Validators.required],
      orderAmount: ['', Validators.required],
      orderPrice: ['', Validators.required],
    });
  }

  addOrder() {
    let orderModel = Object.assign({}, this.orderAddForm.value);
    orderModel.userId = parseInt(localStorage.getItem('id')!);
    console.log(orderModel);
    this.orderService.add(orderModel).subscribe((response) => {
      this.toastrService.success('Order Added!');
      this.orderService
        .getOrdersByUserIdOrder(orderModel.userId, orderModel.orderProductName)
        .subscribe((response) => {
          orderModel = response.data;
          console.log(orderModel);
          this.productService.getProductsVerified().subscribe((response) => {
            this.products = response.data
            .sort((p) =>p.price) 
            .filter(
              (data) =>
                data.name.toLowerCase() ==
                  orderModel.orderProductName.toLowerCase() && orderModel.orderPrice >= data.price
            );
            console.log(this.products)
            this.products.forEach((product) => {
              console.log(product)
              var tradeA = {
                productId: product.id,
                orderId: orderModel.orderId,
              };
              this.tradeService.addPro(tradeA).subscribe(response=>{
                this.toastrService.success("Trade is Success")
              });
            });
          });
        });
    });
  }
}