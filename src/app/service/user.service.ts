import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ISelletLogin, IUserSignUp } from '../interface/seller-details';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'https://ecomm-pearl-phi.vercel.app';
  invalidUserAuth = new EventEmitter<boolean>(false); 
  constructor(private _http: HttpClient, private router: Router) { }
  userSignUp(user: IUserSignUp){
    debugger;
    console.log(user);
    this._http.post(`${this.API_URL}/users`, user, {observe: 'response'})
    .subscribe((result) => {
      console.log('After user registration, result is: ',result);
      localStorage.setItem('user',JSON.stringify(result.body));
      this.router.navigate(['/']);
    });
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
  userLogin(data: ISelletLogin){
    debugger
    return this._http.get<IUserSignUp>(`${this.API_URL}/users?userEmailId=${data.username}&userPassword=${data.password}`, {observe: 'response'});
  }
}
