import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../interface/seller-details';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | IProductDetails[];
  productName: undefined | string;
  userName: string = '';
  cartItems: number = 0;
  constructor(private route: Router, private productapi: ProductService) {
  }
  ngOnInit(): void{
    //debugger;
    this.route.events.subscribe((val: any) => {
      if(val.url){
      //  debugger;
        console.log('route value: '+val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          //console.log('in seller area now');
          this.menuType='seller';
          let sellerStore=localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.userFname + ' '+sellerData.userLname;
        } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          if(userData!=null){
            if(userData[0]!=null){
              this.userName = userData[0].userName;
              this.productapi.getCartList(userData[0].id);
            }else{
              this.userName = userData.userName;
            }
          }
          
          this.menuType = 'user';
        } else{
          //console.log('outside seller');
          this.menuType='default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productapi.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
  }
  sellerLogout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.productapi.cartData.emit([]);
  }
  searchProducts(query: KeyboardEvent){
    //debugger;
    if(query){
      const elem = query.target as HTMLInputElement;  //we can also use 'HTMLTextAreaElement'
      //console.log(elem.value);
      this.productapi.searchProducts(elem.value).subscribe((result) => {
        //console.log(result);
        if(result.length>5){
          result.length=5;  //to limit the number of result to be displayed
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch(){
    //this.searchResult=undefined;
  }
  redirectToDetails(id: number){
    this.route.navigate(['/details/'+id]);
    this.searchResult=undefined;
  }
  submitSearch(val: string){
    //debugger;
    console.log('search value is: '+val);
    this.route.navigate([`search-prod/${val}`]);
    this.searchResult=undefined;
  }
  getProductName(val: string){
    //debugger;
    console.log(this.productName);
    console.log('dsgdfsgd');
    console.log('Product value: '+val);
    this.productName = val;
  }
}
