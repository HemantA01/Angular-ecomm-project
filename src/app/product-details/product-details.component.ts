import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ICart, IProductDetails } from '../interface/seller-details';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | IProductDetails; //Array is not inserted as single product is returned
  productQty: number = 1;
  removeCart: boolean = false;
  cartData: IProductDetails | undefined;
  constructor(private activeRoute: ActivatedRoute, private productapi: ProductService) {

  }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      var query = params.get('productId');
      console.log('In product details, value is: ' + query);
      this.getProductDetailsById(Number(query));
    })

    let cartData = localStorage.getItem('localCart');
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: IProductDetails) => productId == item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user)[0].id;
      this.productapi.getCartList(userId);
      this.productapi.cartData.subscribe((result) => {
        let item = result.filter((item: IProductDetails) => productId?.toString() === item.productId?.toString()); //set '?' if productId is undefined 
        if (item.length) {    //current cart item
          this.cartData = item[0];
          this.removeCart = true;
        }
      })
    }
  }
  getProductDetailsById(productId: number) {
    console.log('Inside this mentod, product id is: ' + productId);
    productId && this.productapi.getProductbyId(productId).subscribe((result) => {
      console.log('In product details, result is: ', result);
      this.productData = result;
    })
  }
  handleQty(val: string) {
    if (this.productQty < 20 && val == 'add') {
      this.productQty += 1;
    } else if (this.productQty > 1 && val == 'min') {
      this.productQty -= 1;
    }
  }
  AddToCart() {
    debugger;
    if (this.productData) {
      this.productData.prodQuantity = this.productQty;
      if (!localStorage.getItem('user')) {
        //console.log('Product data: '+ JSON.stringify(this.productData));
        this.productapi.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.log('user logged in while add to cart');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        console.log('Logged in user id: ', userId);
        let cartData: ICart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        console.log('cartdata: ', cartData);
        this.productapi.AddToCart(cartData).subscribe((result) => {
          if (result) {
            this.productapi.getCartList(userId);
            this.removeCart = true;
          }
        })
      }

    }
  }
  removeToCart(prodId: number) {
    debugger;
    //console.log('In remove cart, prod Id is: ',prodId);
    if (!localStorage.getItem('user')) {
      this.productapi.removeItemFromCart(prodId);
      //console.log('remove cart end');
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      console.log(this.cartData);
      this.cartData && this.productapi.removeToCart(this.cartData?.id)
        .subscribe((result) => {
          if (result) {
            this.productapi.getCartList(userId);
          }
        })
    }
    this.removeCart = false;
  }
}
