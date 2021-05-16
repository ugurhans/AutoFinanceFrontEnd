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
  ) { }

  ngOnInit(): void {
    this.createOrderAddForm();
  }

  createOrderAddForm() {
    this.orderAddForm = this.formBuilder.group({
      orderProductName: ['', Validators.required],
      orderAmount: ['', Validators.required],
    });
  }

  addOrder() {
    if (this.orderAddForm.valid) {
      let orderModel = Object.assign({}, this.orderAddForm.value);
      orderModel.userId = parseInt(localStorage.getItem('id')!);
      console.log(orderModel);
      this.orderService.add(orderModel).subscribe(
        (response) => {
          this.orderService.getOrdersByUserIdOrder(orderModel.userId).subscribe(response=>{
            orderModel = response.data
          })
          this.productService.getProductsVerified().subscribe((response) => {
            this.products = response.data
              .sort()
              .filter(
                (data) =>
                  data.name.toLowerCase() ==
                  orderModel.orderProductName.toLowerCase()
              );
            console.log(this.products, 'ürün geldi');

            this.products.sort().forEach((productFirst) => {

              var tradeAmountExist;
              if (orderModel.orderAmount >= productFirst.stockAmount) {
                tradeAmountExist = productFirst.stockAmount;
                console.log(tradeAmountExist);
              } else {
                tradeAmountExist = orderModel.orderAmount;
              }
              let trade: Trade = {
                id: 0,
                customerId: orderModel.userId,
                productName: productFirst.name,
                supplierId: productFirst.supplierId,
                tradeAmount: tradeAmountExist,
                sellDate: new Date(),
                tradePrice: tradeAmountExist * productFirst.price,
              };
              this.tradeService.add(trade).subscribe((response) => {
                console.log('add trade e geld,', trade);
                this.walletService
                  .getWalletById(trade.customerId)
                  .subscribe((response) => {
                    this.customerWallet = response.data;
                    console.log('customer wallete geldi', this.customerWallet);
                    this.walletService
                      .getWalletById(trade.supplierId)
                      .subscribe((response) => {
                        this.supplierWallet = response.data;
                        console.log(
                          'supplier wallete geldi',
                          this.supplierWallet
                        );
                        // let tradeCost = orderFirst.orderAmount * this.product.price;
                        if (this.customerWallet.balance > trade.tradePrice) {
                          this.customerWallet.balance =
                            this.customerWallet.balance - trade.tradePrice;
                          this.supplierWallet.balance =
                            this.supplierWallet.balance + trade.tradePrice;
                          this.walletService
                            .update(this.supplierWallet)
                            .subscribe((response) => {
                              console.log('supplier WALLET güncellendi');
                              this.walletService
                                .update(this.customerWallet)
                                .subscribe((response) => {
                                  console.log('customer WALLET güncellendi');
                                  if (
                                    orderModel.orderAmount <
                                    productFirst.stockAmount
                                  ) {
                                    productFirst.stockAmount -=
                                      orderModel.orderAmount;
                                    this.productService
                                      .update(productFirst)
                                      .subscribe((response) => {
                                        this.orderService
                                          .delete(orderModel)
                                          .subscribe((response) => {
                                            console.log(
                                              'Order silindi ilk ifteyim'
                                            );
                                          });
                                      });
                                  } else if (
                                    orderModel.orderAmount >
                                    productFirst.stockAmount
                                  ) {
                                    orderModel.orderAmount -=
                                      productFirst.stockAmount;
                                    this.orderService
                                      .update(orderModel)
                                      .subscribe((response) => {
                                        console.log(
                                          'ikinci ifte order güncellendi ürünü silicem'
                                        );
                                        this.productService
                                          .delete(productFirst)
                                          .subscribe((response) => {
                                            console.log(
                                              'ikinci ifteyim ürünü de sildim'
                                            );
                                          });
                                      });
                                  } else {
                                    this.orderService
                                      .delete(orderModel)
                                      .subscribe((response) => {
                                        this.productService
                                          .delete(productFirst)
                                          .subscribe((response) => {
                                            console.log(
                                              'ürünü de order ı da sildim.'
                                            );
                                          });
                                      });
                                  }
                                });
                            });
                        } else {
                          this.tradeService
                            .delete(trade)
                            .subscribe((response) => { });
                        }
                      });
                  });
              });
            });
          });
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Error'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
