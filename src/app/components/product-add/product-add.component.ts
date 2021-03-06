import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { __assign } from 'tslib';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productAddForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      categoryId: ["", Validators.required],
      price: ["", Validators.required],
      stockAmount: ["", Validators.required],
      description: ["", Validators.required],
      toVerify: [false, Validators.required],
      supplierId:[parseInt(localStorage.getItem("id")!),Validators.required]
    })
  }
  addProduct() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value)
      productModel.userId = parseInt(localStorage.getItem("id")!);
      console.log(productModel)
      this.productService.add(productModel).subscribe(response => {
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
