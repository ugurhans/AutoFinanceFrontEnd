import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  suppliers : Supplier[]= [];
  constructor(private supplierService:SupplierService) { }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe(response=>{
      this.suppliers = response.data;
    })
  }

}
