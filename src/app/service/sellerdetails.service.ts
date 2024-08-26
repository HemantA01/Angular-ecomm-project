import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ISelletLogin, SellerDetails } from '../interface/seller-details';
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
import { JsonPipe } from '@angular/common';
import { ResourceLoader } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class SellerdetailsService {
  API_URL = 'https://ecomm-pearl-phi.vercel.app';
  isSellerLoggedIn = new BehaviorSubject<boolean>(true);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private _http: HttpClient, private router: Router) { }
  sellerSignup(data: SellerDetails){
    //debugger;
    //console.log('enter into seller signup function inside service ');
    return this._http
    .post(`${this.API_URL}/seller`,data,{observe: 'response'})
    .subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      //console.log('result: ',result);
    });
  }
  reloadSeller(){
    debugger;
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  sellerLogin(data: ISelletLogin){
    console.log('seller login data: ',data);
    return this._http.get(`${this.API_URL}/seller?username=${data.username}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result:any) => {
      console.log(result);
      if(result && result.body && result.body.length){
        console.log('Logged in successfully');
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }else{
        console.log('Login failed');
        this.isLoginError.emit(true);
      }
    })
  }
}
