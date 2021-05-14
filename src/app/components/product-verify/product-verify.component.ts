import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { Trade } from 'src/app/models/trade';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TradeService } from 'src/app/services/trade.service';

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
 
  constructor(
    private tradeService: TradeService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private orderService: OrderService
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
      this.getOrders();
      this.tradeThis(this.orders,this.product);
    });
    
  }

  getOrders(){
    this.orderService.getOrders().subscribe(response=>{
      this.orders = response.data.filter(data=>data.orderProductName.toLowerCase()==this.product.name.toLowerCase())
      console.log(this.orders);
    })
  }

  tradeThis(order:Order[],product:Product){
    order.forEach(orderFirst => {
      let trade:Trade ={
        id :0,
        customerId:orderFirst.userId,
        productId:product.id,
        supplierId:product.supplierId,
        tradeAmount:orderFirst.orderAmount,
        sellDate: new Date(),
        orderId:orderFirst.id
      }
      this.tradeService.add(trade).subscribe(response=>{
        this.toastrService.success("Trade is Success");
      },error=>{
        this.toastrService.error("Trade is Failed");
      })
    });
   
  }

}
