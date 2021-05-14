import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { Trade } from 'src/app/models/trade';
import { Wallet } from 'src/app/models/wallet';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TradeService } from 'src/app/services/trade.service';
import { WalletService } from 'src/app/services/wallet.service';

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

  verifyProduct(productId: number) {
    this.productService.getProductsById(productId).subscribe((response) => {
      this.product = response.data;
      this.productService.verifyProduct(this.product).subscribe((response) => {
        this.toastrService.success('Product Verified');
      });
      this.orderService.getOrders().subscribe((response) => {
        this.orders = response.data.filter(
          (data) =>
            data.orderProductName.toLowerCase() == this.product.name.toLowerCase()
        );
      });
      this.tradeThis(this.orders, this.product);
    });
  }

  getWalletCustomer(userId: number) {
    this.walletService.getWalletById(userId).subscribe((response) => {
      this.customerWallet = response.data;
    });
  }

  getWalletSupplier(userId: number) {
    this.walletService.getWalletById(userId).subscribe((response) => {
      this.supplierWallet = response.data;
    });
  }

  tradeThis(order: Order[], product: Product) {
    order.forEach((orderFirst) => {
      let trade: Trade = {
        id: 0,
        customerId: orderFirst.userId,
        productName: product.name,
        supplierId: product.supplierId,
        tradeAmount: orderFirst.orderAmount - product.stockAmount,
        sellDate: new Date(),
        tradePrice:(orderFirst.orderAmount-product.stockAmount)*product.price
      };
      this.tradeService.add(trade).subscribe(
        (response) => {
          this.walletService
            .getWalletById(orderFirst.userId)
            .subscribe((response) => {
              this.customerWallet = response.data;
            });
          this.walletService
            .getWalletById(product.supplierId)
            .subscribe((response) => {
              this.supplierWallet = response.data;
            });
          let tradeCost = orderFirst.orderAmount * product.price;
          this.customerWallet.balance = this.customerWallet.balance - tradeCost;
          this.supplierWallet.balance = this.supplierWallet.balance + tradeCost;

          this.walletService
            .update(this.customerWallet)
            .subscribe((response) => {
              this.toastrService.success('Updated Customer');
            });

          this.walletService
            .update(this.supplierWallet)
            .subscribe((response) => {
              this.toastrService.success('Updated Supplier');
            });
          if (orderFirst.orderAmount < product.stockAmount) {
            console.log('ürün adedi büyük');
            this.orderService.delete(orderFirst).subscribe(response=>{

            });
            product.stockAmount -= orderFirst.orderAmount;
            this.productService.update(product).subscribe(response=>{

            });
            this.toastrService.success('OrderDeleted');
            this.toastrService.success('Product Updated');
          } else if (orderFirst.orderAmount > product.stockAmount) {
            console.log('sipariş adedi büyük');
            this.productService.delete(product).subscribe(response=>{

            });
            orderFirst.orderAmount -= product.stockAmount;
            this.orderService.update(orderFirst).subscribe(response=>{

            });
            this.toastrService.success('Product Deleted');
            this.toastrService.success('Order Updated');
          } else {
            console.log('eşit');
            this.productService.delete(product).subscribe(response=>{

            });
            this.orderService.delete(orderFirst).subscribe(response=>{

            });
            this.toastrService.success('Deleted two');
          }
          this.toastrService.success('Trade is Success');
        },
        (error) => {
          this.toastrService.error('Trade is Failed');
        }
      );
    });
  }
}
