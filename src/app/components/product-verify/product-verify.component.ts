import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { Trade } from 'src/app/models/trade';
import { TradeA } from 'src/app/models/tradeA';
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
      this.productService.verifyProduct(this.product).subscribe((response) => {
        this.toastrService.success('Succes Verify');
        this.orderService.getOrders().subscribe((response) => {
          this.orders = response.data
            .sort((o) => o.orderPrice)
            .filter(
              (data) =>
                data.orderProductName.toLowerCase() ==
                  this.product.name.toLowerCase() &&
                data.orderPrice <= this.product.price
            );
          this.orders.forEach((order) => {
            console.log(order);
            this.walletService
              .getWalletById(order.userId)
              .subscribe((response) => {
                this.customerWallet = response.data;
                this.walletService
                  .getWalletById(this.product.supplierId)
                  .subscribe((response) => {
                    this.supplierWallet = response.data;
                    console.log('customer Wallet: ', this.customerWallet);
                    console.log('Supplier Wallet: ', this.supplierWallet);
                    var tradeA = {
                      productId: this.product.id,
                      orderId: order.orderId,
                    };
                    console.log(tradeA);
                    this.tradeService.addPro(tradeA).subscribe((response) => {
                      this.toastrService.success('Trade is succesfuly');
                    });
                  });
              });
          });
        });
      });
    });
  }

  delete(productId: number) {
    this.productService.getProductsById(productId).subscribe((response) => {
      this.product = response.data;
      this.productService.delete(this.product).subscribe((response) => {
        this.toastrService.success('Deleted product ');
      });
    });
  }
  checkOrder() {
    return this.orders;
  }
}
