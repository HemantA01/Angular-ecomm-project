import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ICart, IOrderDetails, IProductDetails } from '../interface/seller-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = 'https://ecomm-pearl-phi.vercel.app'; 
  cartData = new EventEmitter<IProductDetails[] | []>();
  constructor(private _http: HttpClient) { }
  addProduct(data: IProductDetails){
    debugger;
    console.log('entered into product added');
    return this._http.post(`${this.API_URL}/products`,data);
  }
  productList(){
    return this._http.get<IProductDetails[]>(`${this.API_URL}/products`); // adding 'IProductDetails[]' means api will return IProductDetails[] type of data
  }
  deleteProduct(id:number){
   // debugger;
    return this._http.delete(`${this.API_URL}/products/${id}`);
  }
  getProductbyId(id:number){
    //debugger;
    return this._http.get<IProductDetails>(`${this.API_URL}/products/${id}`);
  }
  updateProduct(data:IProductDetails){
    debugger;
    return this._http.put<IProductDetails>(`${this.API_URL}/products/${data.id}`,data);
  }
  popularProducts(){
    return this._http.get<IProductDetails[]>(`${this.API_URL}/products?_limit=4`);  //'_limit=3' returns 3 products
  }
  trendyProducts(){
    return this._http.get<IProductDetails[]>(`${this.API_URL}/products`);  
  }
  searchProducts(query: string){
    return this._http.get<IProductDetails[]>(`${this.API_URL}/products?q=${query}`);
  }
  localAddToCart(data: IProductDetails){
    //debugger;
    let cartData=[];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));  //'data' >=1 is stored in form of array
    }else{
      console.log('service else');
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);   //'cartData' used here is called at top of the statement
  }
  removeItemFromCart(productId: number){
    //debugger;
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items: IProductDetails[] = JSON.parse(cartData);
      items = items.filter((item: IProductDetails) => productId != item.id);
      //console.log('In removeCart Service, item detail = ',items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  AddToCart(cartData: ICart){
    return this._http.post(`${this.API_URL}/cart`,cartData);
  }
  getCartList(userId: number){
    //debugger;
    return this._http.get<IProductDetails[]>(`${this.API_URL}/cart?userId=`+userId,
    {observe: 'response'}).subscribe((result) => {
      //debugger;
      console.log(result);
      if(result && result.body){
        this.cartData.emit(result.body);  
      }
      
    });
  }
  removeToCart(cartId: number){
    return this._http.delete(`${this.API_URL}/cart/`+cartId);
  }
  currentCart(){
    //debugger;
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this._http.get<any[]>(`${this.API_URL}/cart?userId=`+userData[0].id);           
  }
  orderNow(data:IOrderDetails){
    return this._http.post(`${this.API_URL}/orders`, data);
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)
    return this._http.get<IOrderDetails[]>(`${this.API_URL}/orders?userId=`+userData[0].id);
  }
  deleteCartItems(cartId: number){
    return this._http.delete(`${this.API_URL}/cart/`+cartId, {observe: 'response'}).subscribe((result) => {
      if(result){
        this.cartData.emit([]);
      }
    });
  }
  cancelOrder(orderId: number | undefined){
    return this._http.delete(`${this.API_URL}/orders/`+orderId);
  }
}
