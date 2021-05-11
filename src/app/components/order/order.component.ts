import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderDto } from 'src/app/models/orderDto';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  ordersDetails:OrderDto[] =[];
  orders:Order[]=[];
  constructor(
    private orderService:OrderService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getOrdersDetail();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(response=>{
      this.orders = response.data;
    })
    this.toastrService.success("Ordes Get Succesfuly")
  }

  getOrdersDetail(){
    this.orderService.getOrdersDetail().subscribe(response=>{
      this.ordersDetails = response.data;
    })
    this.toastrService.success("Ordes Get Succesfuly")
  }


}
