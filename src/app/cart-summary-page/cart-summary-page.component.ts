import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ICart, IPriceSummary } from '../interface/seller-details';

@Component({
  selector: 'app-cart-summary-page',
  templateUrl: './cart-summary-page.component.html',
  styleUrls: ['./cart-summary-page.component.scss']
})
export class CartSummaryPageComponent implements OnInit {
  cartData: any[] | undefined;
  isCartEmpty: string | undefined = 'blank';
  PriceSummary: IPriceSummary = {
    price: 0,
    taxamount: 0,
    discount: 0,
    deliverycharges: 0,
    total: 0,
    count: 0
  }
  constructor(private router: Router, private productapi: ProductService) {

  }
  ngOnInit(): void {
    this.getCurrentCart();
  }
  abc(): void {
    alert('Hello World');
  }
  getCurrentCart() {
    //debugger;
    this.productapi.currentCart().subscribe((result) => {
     // debugger;
     if(result.length > 0){
      console.log('cart result: ', result);
      this.cartData = result;
      this.isCartEmpty = 'data';
      let price = 0;
      let i = 0;
      //debugger;
      result.forEach((item) => {
        //debugger;
        price = price + (Number(item.productPrice) * Number(item.prodQuantity));
        i+=1;
      })
      debugger;
      console.log(price);
      this.PriceSummary.count = i;
      this.PriceSummary.price = price;
      this.PriceSummary.discount=price/10;
      this.PriceSummary.taxamount = price/16;
      this.PriceSummary.deliverycharges = 100;
      //this.PriceSummary.total = Number( this.PriceSummary.price) + Number(this.PriceSummary.discount)  + Number(this.PriceSummary.deliverychanrges)  - Number( this.PriceSummary.taxamount);
      this.PriceSummary.total = (this.PriceSummary.price + 100  + price/16)  - price/10;
      console.log('price summ: ',this.PriceSummary);
     }else{
      debugger;
      this.isCartEmpty='blank';
     }
    });
  }
  checkOut(){
    this.router.navigate(['checkout']);
  }
}
