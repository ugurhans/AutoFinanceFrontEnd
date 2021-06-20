import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  product!:Product;
  products: Product[] = [];
  productDto:ProductDto[]=[];

  
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
   this.getVerifiedProductDto();
  }

  get() {
    let userName = localStorage.getItem('name');
    return userName;
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
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

  getAllProductsDto() {
    this.productService.getProductsDto().subscribe((response) => {
      this.productDto = response.data;
    });
  }
 
  
  getVerifiedProduct() {
    this.productService.getProductsVerified().subscribe((response) => {
      this.products = response.data;
    });
  }


  getVerifiedProductDto() {
    this.productService.getProductsDtoVerified().subscribe((response) => {
      this.productDto = response.data;
    });
  }




}
