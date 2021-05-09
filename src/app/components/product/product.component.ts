import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/product-verify') {
      this.getUnVerifiedProduct();
    } else {
      this.getVerifiedProduct();
    }
  }

  get() {
    let userName = localStorage.getItem('name');
    return userName;
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
    });
  }

  getUnVerifiedProduct() {
    this.productService.getProductsUnVerified().subscribe((response) => {
      this.products = response.data;
    });
  }
  getVerifiedProduct() {
    this.productService.getProductsVerified().subscribe((response) => {
      this.products = response.data;
    });
  }
  verifyProduct(product: Product) {
    this.productService.verifyProduct(product).subscribe((response) => {
      this.toastrService.success("Product Verified");
    });
  }
}
