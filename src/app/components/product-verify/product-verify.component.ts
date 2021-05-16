import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { Trade } from 'src/app/models/trade';
import { Wallet } from 'src/app/models/wallet';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TradeService } from 'src/app/services/trade.service';
import { WalletService } from 'src/app/services/wallet.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-product-verify',
  templateUrl: './product-verify.component.html',
  styleUrls: ['./product-verify.component.css'],
})
export class ProductVerifyComponent implements OnInit {
  product!: Product;
  products: Product[] = [];
  productDto: ProductDto[] = [];
  orders: Order[] = [];
  customerWallet!: Wallet;
  supplierWallet!: Wallet;

  constructor(
    private tradeService: TradeService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.getAllUnVerifiedProductDto();
  }

  getAllUnVerifiedProductDto() {
    this.productService.getProductsDtoUnVerified().subscribe((response) => {
      this.productDto = response.data;
    });
  }

  getAllUnVerifiedProduct() {
    this.productService.getProductsUnVerified().subscribe((response) => {
      this.products = response.data;
    });
  }

  verifyProduct(productId: number) {
    this.productService.getProductsById(productId).subscribe((response) => {
      this.product = response.data;
      console.log(this.product);
      this.productService.verifyProduct(this.product).subscribe((response) => {
        console.log('doğrulandı');
        this.orderService.getOrders().subscribe((response) => {
          this.orders = response.data
            .sort()
            .filter(
              (data) =>
                data.orderProductName.toLowerCase() ==
                this.product.name.toLowerCase()
            );
          console.log('Orders Get', this.orders);
          this.orders.forEach((orderFirst) => {
            var tradeAmountExist;
            if (orderFirst.orderAmount >= this.product.stockAmount) {
              tradeAmountExist = this.product.stockAmount;
              console.log(tradeAmountExist);
            } else {
              tradeAmountExist = orderFirst.orderAmount;
            }
            let trade: Trade = {
              id: 0,
              customerId: orderFirst.userId,
              productName: this.product.name,
              supplierId: this.product.supplierId,
              tradeAmount: tradeAmountExist,
              sellDate: new Date(),
              tradePrice: tradeAmountExist * this.product.price,
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
                                  orderFirst.orderAmount <
                                  this.product.stockAmount
                                ) {
                                  this.product.stockAmount -=
                                    orderFirst.orderAmount;
                                  this.productService
                                    .update(this.product)
                                    .subscribe((response) => {
                                      this.orderService
                                        .delete(orderFirst)
                                        .subscribe((response) => {
                                          console.log(
                                            'Order silindi ilk ifteyim',
                                            orderFirst
                                          );
                                        });
                                    });
                                } else if (
                                  orderFirst.orderAmount >
                                  this.product.stockAmount
                                ) {
                                  orderFirst.orderAmount -=
                                    this.product.stockAmount;
                                  this.orderService
                                    .update(orderFirst)
                                    .subscribe((response) => {
                                      console.log(
                                        'ikinci ifte order güncellendi ürünü silicem'
                                      );
                                      this.productService
                                        .delete(this.product)
                                        .subscribe((response) => {
                                          console.log(
                                            'ikinci ifteyim ürünü de sildim',
                                            this.product
                                          );
                                        });
                                    });
                                } else {
                                  this.orderService
                                    .delete(orderFirst)
                                    .subscribe((response) => {
                                      this.productService
                                        .delete(this.product)
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
                          .subscribe((response) => {});
                      }
                    });
                });
            });
          });
        });
      });
    });
  }
}
