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
  ) { }

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

  //  verifyProduct(productId: number) {
  //   this.productService.getProductsById(productId).subscribe((response) => {
  //     this.product = response.data;
  //     this.productService.verifyProduct(this.product).subscribe((response) => {
  //       this.toastrService.success('Product Verified');
  //     });
  //     this.orderService.getOrders().subscribe((response) => {
  //       this.orders = response.data.filter(
  //         (data) =>
  //           data.orderProductName.toLowerCase() ==
  //           this.product.name.toLowerCase()
  //       );
  //     });
  //     this.orders.forEach((orderFirst) => {
  //       let trade: Trade = {
  //         id: 0,
  //         customerId: orderFirst.userId,
  //         productName: this.product.name,
  //         supplierId: this.product.supplierId,
  //         tradeAmount: Math.abs(orderFirst.orderAmount - this.product.stockAmount),
  //         sellDate: new Date(),
  //         tradePrice:
  //           Math.abs((orderFirst.orderAmount - this.product.stockAmount) *
  //             this.product.price,
  //           )
  //       };
  //        this.tradeService.add(trade).subscribe(
  //         (response) => {
  //           this.walletService
  //             .getWalletById(orderFirst.userId)
  //             .subscribe((response) => {
  //               this.customerWallet = response.data;
  //             });
  //           this.walletService
  //             .getWalletById(this.product.supplierId)
  //             .subscribe((response) => {
  //               this.supplierWallet = response.data;
  //             });
  //           let tradeCost = orderFirst.orderAmount * this.product.price;
  //           this.customerWallet.balance =
  //             this.customerWallet.balance - tradeCost;
  //           this.supplierWallet.balance =
  //             this.supplierWallet.balance + tradeCost;

  //           this.walletService
  //             .update(this.customerWallet)
  //             .subscribe((response) => {
  //               this.toastrService.success('Updated Customer');
  //             });

  //           this.walletService
  //             .update(this.supplierWallet)
  //             .subscribe((response) => {
  //               this.toastrService.success('Updated Supplier');
  //             });
  //           if (orderFirst.orderAmount < this.product.stockAmount) {
  //             console.log('ürün adedi büyük');
  //             this.orderService.delete(orderFirst).subscribe((response) => { });
  //             this.product.stockAmount -= orderFirst.orderAmount;
  //             this.productService
  //               .update(this.product)
  //               .subscribe((response) => { });
  //             this.toastrService.success('OrderDeleted');
  //             this.toastrService.success('Product Updated');
  //           } else if (orderFirst.orderAmount > this.product.stockAmount) {
  //             console.log('sipariş adedi büyük');
  //             this.productService
  //               .delete(this.product)
  //               .subscribe((response) => { });
  //             orderFirst.orderAmount -= this.product.stockAmount;
  //             this.orderService.update(orderFirst).subscribe((response) => { });
  //             this.toastrService.success('Product Deleted');
  //             this.toastrService.success('Order Updated');
  //           } else {
  //             console.log('eşit');
  //             this.productService
  //               .delete(this.product)
  //               .subscribe((response) => { });
  //             this.orderService.delete(orderFirst).subscribe((response) => { });
  //             this.toastrService.success('Deleted two');
  //           }
  //           this.toastrService.success('Trade is Success');
  //         },
  //         (error) => {
  //           this.toastrService.error('Trade is Failed');
  //         }
  //       );
  //     });
  //   });}



  // verifyProduct(productId: number) {

  //   this.productService.getProductsById(productId).subscribe(response0 => {
  //     this.product = response0.data;
  //     this.productService.verifyProduct(this.product).subscribe(response1 => {
  //       console.log(this.product)
  //       this.orderService.getOrders().subscribe(response2 => {
  //         this.orders.forEach((orderFirst) => {
  //           let trade: Trade = {
  //             id: 0,
  //             customerId: orderFirst.userId,
  //             productName: this.product.name,
  //             supplierId: this.product.supplierId,
  //             tradeAmount: Math.abs(orderFirst.orderAmount - this.product.stockAmount),
  //             sellDate: new Date(),
  //             tradePrice:
  //               Math.abs((orderFirst.orderAmount - this.product.stockAmount) *
  //                 this.product.price,
  //               )
  //           }
  //           this.tradeService.add(trade).subscribe(response13 => {
  //             this.walletService.getWalletById(this.product.supplierId).subscribe(response3 => {
  //               this.supplierWallet = response3.data
  //               this.walletService.getWalletById(orderFirst.userId).subscribe(response4 => {
  //                 this.customerWallet =response4.data
  //                 let tradeCost = orderFirst.orderAmount * this.product.price;
  //                 this.customerWallet.balance =
  //                   this.customerWallet.balance - tradeCost;
  //                 this.supplierWallet.balance =
  //                   this.supplierWallet.balance + tradeCost;
  //                 this.walletService.update(this.customerWallet).subscribe(response5 => {
  //                   this.walletService.update(this.supplierWallet).subscribe(response6 => {
  //                     if (orderFirst.orderAmount < this.product.stockAmount) {
  //                       this.orderService.delete(orderFirst).subscribe((response7 => {
  //                         this.product.stockAmount -= orderFirst.orderAmount;
  //                         this.productService
  //                           .update(this.product)
  //                           .subscribe((response8) => {

  //                             response1;
  //                             this.orders = response2.data
  //                             response13;
  //                             this.supplierWallet = response3.data;
  //                             this.customerWallet = response4.data;
  //                             response5;
  //                             response6;
  //                             response7;
  //                             response8;
  //                           });
  //                       })
  //                       )
  //                     }
  //                     else if (orderFirst.orderAmount > this.product.stockAmount) {
  //                       this.productService
  //                         .delete(this.product)
  //                         .subscribe((response9) => {
  //                           orderFirst.orderAmount -= this.product.stockAmount;
  //                           this.orderService.update(orderFirst).subscribe((response10) => {
  //                             this.product = response0.data;
  //                             response1;
  //                             this.orders = response2.data
  //                             response13;
  //                             this.supplierWallet = response3.data;
  //                             this.customerWallet = response4.data;
  //                             response5;
  //                             response6;
  //                             response9;
  //                             response10;
  //                           });
  //                         });
  //                     }
  //                     else {
  //                       this.productService
  //                         .delete(this.product)
  //                         .subscribe((response11) => {
  //                           this.orderService.delete(orderFirst).subscribe((response12) => {
  //                             this.product = response0.data;
  //                             response1;
  //                             this.orders = response2.data
  //                             response13;
  //                             this.supplierWallet = response3.data;
  //                             this.customerWallet = response4.data;
  //                             response5;
  //                             response6;
  //                             response11;
  //                             response12;
  //                             this.toastrService.success('Deleted two');
  //                           });
  //                         });
  //                     }
  //                   })
  //                 })
  //               })
  //             })
  //           })

  //         })
  //       })
  //     })
  //   }
  //   )
  // }
  // verifyProduct(productId: number) {
  //   let trade!: Trade;
  //   let orderFirst!: Order;
  //   forkJoin(
  //     this.productService.getProductsById(productId),
  //     this.productService.verifyProduct(this.product),
  //     this.orderService.getOrders(),
  //     this.tradeService.add(trade),
  //     this.walletService.getWalletById(this.product.supplierId),
  //     this.walletService.getWalletById(orderFirst.userId),
  //     this.walletService.update(this.customerWallet),
  //     this.walletService.update(this.supplierWallet),
  //     this.orderService.delete(orderFirst),
  //     this.orderService.update(orderFirst),
  //     this.productService.add(this.product),
  //     this.productService.update(this.product)
  //   ).subscribe(
  //     ([
  //       productResponse,
  //       verifyProductResponse,
  //       orderResponse,
  //       walletResponseSupplier,
  //       walletResponseCusomer,
  //       updateCustomerWalletResponse,
  //       updateSupplierWalletResponse,
  //       tradeResponse,
  //       deleteOrderResponse,
  //       updateOrderResponse,
  //       deleteProductResponse,
  //       updateProductResponse,
  //     ]) => {
  //       this.product = productResponse.data;
  //       console.log(this.product)
  //       verifyProductResponse
  //       this.orders = orderResponse.data.filter(
  //         (data: { orderProductName: string; }) =>
  //           data.orderProductName.toLowerCase() ==
  //           this.product.name.toLowerCase()
  //       );
  //       this.orders.forEach((orderFirst) => {
  //         trade = {
  //           id: 0,
  //           customerId: orderFirst.userId,
  //           productName: this.product.name,
  //           supplierId: this.product.supplierId,
  //           tradeAmount: Math.abs(orderFirst.orderAmount - this.product.stockAmount),
  //           sellDate: new Date(),
  //           tradePrice:
  //             Math.abs((orderFirst.orderAmount - this.product.stockAmount) *
  //               this.product.price,
  //             )
  //         };
  //       })
  //       this.supplierWallet = walletResponseSupplier.data;
  //       this.customerWallet = walletResponseCusomer.data;
  //       let tradeCost = orderFirst.orderAmount * this.product.price;
  //       this.customerWallet.balance =
  //         this.customerWallet.balance - tradeCost;
  //       this.supplierWallet.balance =
  //         this.supplierWallet.balance + tradeCost;
  //       updateCustomerWalletResponse;
  //       updateSupplierWalletResponse;
  //       this.toastrService.success("Wallet Update Success");
  //       tradeResponse;
  //       this.toastrService.success("Trade Success");
  //       if (orderFirst.orderAmount < this.product.stockAmount) {
  //         deleteOrderResponse;
  //         this.product.stockAmount -= orderFirst.orderAmount;
  //         updateProductResponse;
  //         this.toastrService.success('OrderDeleted');
  //         this.toastrService.success('Product Updated');
  //       } else if (orderFirst.orderAmount > this.product.stockAmount) {
  //         console.log('sipariş adedi büyük');
  //         deleteProductResponse;
  //         orderFirst.orderAmount -= this.product.stockAmount;
  //         updateOrderResponse;
  //         this.toastrService.success('Product Deleted');
  //         this.toastrService.success('Order Updated');
  //       } else {
  //         console.log('eşit');
  //         deleteProductResponse;
  //         deleteOrderResponse;
  //         this.toastrService.success('Deleted two');
  //       }
  //     }
  //   )
  // }


  verifyProduct(productId: number) {
    this.productService.getProductsById(productId).subscribe(response => {
      this.product = response.data;
      console.log(this.product);
      this.productService.update(this.product).subscribe(response => {
        console.log("doğrulandı")
        this.orderService.getOrders().subscribe(response => {
          this.orders = response.data.filter(data => data.orderProductName.toLowerCase() == this.product.name.toLowerCase());
          console.log("Orders Get", this.orders);
          this.orders.forEach((orderFirst) => {
            let trade: Trade = {
              id: 0,
              customerId: orderFirst.userId,
              productName: this.product.name,
              supplierId: this.product.supplierId,
              tradeAmount: Math.abs(orderFirst.orderAmount - this.product.stockAmount),
              sellDate: new Date(),
              tradePrice:
                Math.abs((orderFirst.orderAmount - this.product.stockAmount) *
                  this.product.price,
                )
            }
            this.tradeService.add(trade).subscribe(response => {
              console.log("add trade e geld,", trade);
              this.walletService.getWalletById(trade.customerId).subscribe(response => {
                this.customerWallet = response.data;
                console.log("customer wallete geldi", this.customerWallet);
                this.walletService.getWalletById(trade.supplierId).subscribe(response => {
                  this.supplierWallet = response.data;
                  console.log("supplier wallete geldi", this.supplierWallet);
                  let tradeCost = orderFirst.orderAmount * this.product.price;
                  this.customerWallet.balance =
                    this.customerWallet.balance - tradeCost;
                  this.supplierWallet.balance =
                    this.supplierWallet.balance + tradeCost;
                  this.walletService.update(this.supplierWallet).subscribe(response => {
                    console.log("supplier WALLET güncellendi")
                    this.walletService.update(this.customerWallet).subscribe(response => {
                      console.log("customer WALLET güncellendi")
                      if (orderFirst.orderAmount < this.product.stockAmount) {
                        this.product.stockAmount -= orderFirst.orderAmount;
                        this.productService.update(this.product).subscribe(response => {
                          this.orderService.delete(orderFirst).subscribe(response => {
                            console.log("Order silindi ilk ifteyim")
                          })
                        })
                      } else if (orderFirst.orderAmount > this.product.stockAmount) {
                        orderFirst.orderAmount -= this.product.stockAmount;
                        this.orderService.update(orderFirst).subscribe(response => {
                          console.log("ikinci ifte order güncellendi ürünü silicem")
                          this.productService.delete(this.product).subscribe(response => {
                            console.log("ikinci ifteyim ürünü de sildim");
                          })
                        })
                      } else {
                        this.orderService.delete(orderFirst).subscribe(response => {
                          this.productService.delete(this.product).subscribe(response => {
                            console.log("ürünü de order ı da sildim.")
                          })
                        })
                      }
                    })
                  })
                })
              })
            });
          })
        })
      })
    })
  }
}