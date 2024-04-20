import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ICart, IProductDetails, ISelletLogin, IUserSignUp } from '../interface/seller-details';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  frmUser!: FormGroup
  frmUserLogin!: FormGroup
  showLogin: boolean=true;
  submitted: boolean= false;
  authError: string='';
  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router, private productapi: ProductService) {
    
  }
  ngOnInit(): void {
    this.userservice.userAuthReload();
    this.frmUser = this.fb.group({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      userEmailId: new FormControl('', [Validators.required, Validators.email]),
      userMobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      userConfPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),      
      userAddress: new FormControl('', Validators.required),
      userSalutation: new FormControl('Mr.'),
      userGender: new FormControl('Male')
    })
    this.frmUserLogin = this.fb.group({
      //username: new FormControl('', [Validators.required, this.customEmailValidator]),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14),
                              Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')])
    })
  }
  getError(control: any): string{
    if(control.errors?.required && control.touched){
      return 'This field is required';
    }else if(control.errors?.emailError && control.touched){
      return 'Please enter valid email address..!!';
    }
    else return '';
  }
  customEmailValidator(control: AbstractControl){
    debugger;
    const pattern= /^\w+@[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
    const value = control.value;
    if(!pattern.test(value) && control.touched){
      return{
        emailError: true
      }  
    }  
    else return null;
  }
  /*get gender(){
    return this.frmUser.get('userGender');
  }*/
  signup(data: IUserSignUp){
    //debugger;
    //this.frmUser.get('userGender');
    //console.log(data);
    if(data.userPassword != data.userConfPassword){
      alert('Password and Confirm Password doesn\'t match');
      return;
    }
    //return;
    this.submitted=true;
    if(this.frmUser.invalid){
      return;
    }
    this.userservice.userSignUp(data);
  }
  changeSalutation(e: any){
    //debugger;
    //console.log(e.target.value);
    this.frmUser.get('userSalutation')?.patchValue(e.target.value);
  }
  userLogin(data: ISelletLogin){

    debugger;
    this.submitted=true;
    if(this.frmUserLogin.invalid){
      return;
    }
    console.log('User Login details: ',data);
    this.userservice.userLogin(data).subscribe((result) => {
      //debugger;
      //if((<any>result.body).length >= 1){
      if(result && (<any>result.body).length){
        //debugger;
        
        console.log('After user Login: ',result);
        localStorage.setItem('user',JSON.stringify(result.body));
        this.userservice.invalidUserAuth.emit(false);
        this.router.navigate(['/']);
      }else{
        //debugger;
        this.userservice.invalidUserAuth.emit(true);
        //alert('Details with preffered username/password does not find.')
      }
    })
    this.userservice.invalidUserAuth.subscribe((result) => {
      //debugger;
      console.log('for invalid userauth, result: ',result);
      if(result){
        this.authError='Please enter valid user credentials to login.!';
      }else{
        this.localCartToRemoteCart();
      }
    })
  }
  openSignUp(){
    this.showLogin=false;
  }
  openLogin(){
    this.showLogin=true;
  }
  localCartToRemoteCart(){
    debugger;
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if(data){
      let cartDataList:IProductDetails[] = JSON.parse(data);
      
      cartDataList.forEach((product: IProductDetails, index) => {
        let cartData: ICart = {
          ...product,
          productId: product.id,
          userId
        }

        delete cartData.id;
        setTimeout(() => {      //JSON server is not sa fast to execute, thst'd why 'setTomeout' function is used
          this.productapi.AddToCart(cartData).subscribe((result) => {
            if(result){
              console.log('Item stored in DB')
            }
          })  
          if(cartDataList.length == (index+1)){
            localStorage.removeItem('localCart');
          }
        }, 1000);
        
      });
    }
    setTimeout(() => {
      this.productapi.getCartList(userId);  
    }, 3000);
  }
}
