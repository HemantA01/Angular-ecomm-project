import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { IOrderDetails, IPriceSummary } from '../interface/seller-details';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  frmCheckout!: FormGroup;
  cartData: any[] | undefined;
  PriceSummary: IPriceSummary = {
    price: 0,
    taxamount: 0,
    discount: 0,
    deliverycharges: 0,
    total: 0,
    count: 0
  }
  constructor(private fb: FormBuilder, private productapi: ProductService) {

  }
  ngOnInit(): void{
    this.getCartPriceSummary();
    this.frmCheckout = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      address: new FormControl(''),
      address2: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(''),
      paymentmode: new FormControl('Credit Card')
    })
  }
  
  getCartPriceSummary(){
    this.productapi.currentCart().subscribe((result) => {
      debugger;
      console.log('cart result: ', result);
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        price = price + (Number(item.productPrice) * Number(item.prodQuantity));
        
      })
      debugger;
      console.log(price);
      this.PriceSummary.price = price;
      this.PriceSummary.discount=price/10;
      this.PriceSummary.taxamount = price/16;
      this.PriceSummary.deliverycharges = 100;
      //this.PriceSummary.total = Number( this.PriceSummary.price) + Number(this.PriceSummary.discount)  + Number(this.PriceSummary.deliverychanrges)  - Number( this.PriceSummary.taxamount);
      //this.PriceSummary.total = (this.PriceSummary.price + 100  + price/16)  - price/10;
      this.PriceSummary.total = (this.PriceSummary.price + this.PriceSummary.deliverycharges + this.PriceSummary.taxamount) - this.PriceSummary.discount;
      console.log('order amount summ: ',this.PriceSummary);
    });
  }

  orderNow(data:{firstName: string, lastName: string, email: string, contact: string, address: string, address2: string, country: string, state: string, pincode: number, paymentmode: string}){
    console.log('checkout data: ',data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    debugger;
    console.log('userid: ',userId);
    if(this.PriceSummary.total){
      let orderData: IOrderDetails = {
        ...data,
        totalPrice: this.PriceSummary.total,
        userId
      }
      debugger;
      this.productapi.orderNow(orderData).subscribe((result) => {
        debugger;
        if(result){
          alert('Order placed successfully');
        }else{
          alert('error');
        }
      })
    }
  }
}
