import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { IOrderDetails } from '../interface/seller-details';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orderData: IOrderDetails[] | undefined;
  constructor(private productapi: ProductService) {
    
  }
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(){
    this.productapi.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }
  cancelOrder(orderId: number | undefined){
    orderId && this.productapi.cancelOrder(orderId).subscribe((result) => {
      if(result){
        this.getOrders();
      }
    })
  }
}
