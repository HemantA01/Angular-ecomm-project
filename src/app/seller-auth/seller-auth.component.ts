import { Component, OnInit } from '@angular/core';
import { ISelletLogin, SellerDetails } from "../interface/seller-details";
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { SellerdetailsService } from '../service/sellerdetails.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  loginAuthError: string = '';
  lblSellerHeader = 'Enter Seller Details';
  frmSeller!: FormGroup;
  frmSellerLogin!: FormGroup;
  constructor(private sellerapi: SellerdetailsService, private fb: FormBuilder, private router: Router) {
    //super();

  }
  ngOnInit(): void {
    this.sellerapi.reloadSeller();  //need to uncomment to redirect to home page if data is in localstorage

    this.frmSeller = this.fb.group({
      userFname: new FormControl(''),
      userLname: new FormControl(''),
      userContact: new FormControl(''),
      userEmail: new FormControl(''),
      nationality: new FormControl(''),
      username: new FormControl(''),
      userpass: new FormControl(''),
      confpass: new FormControl(''),
      tempaddress: new FormControl(''),
      permanentaddress: new FormControl('')
    });
    this.frmSellerLogin = this.fb.group({
      username: new FormControl(''),
      userpass: new FormControl('')
    })
    
  }
  submitData(data: SellerDetails) {
    //debugger;
    //console.log('data: '+ JSON.stringify(data));
    this.sellerapi.sellerSignup(data);
  }
  sellerLogin(data: ISelletLogin) {
    //console.log('Login data: ' + JSON.stringify(data));
    this.loginAuthError='';
    this.sellerapi.sellerLogin(data);
    this.sellerapi.isLoginError.subscribe((iserror) => {
      if(iserror==true){
        this.loginAuthError="Username / password is not correct";
      }
    })
  }
  openLogin() {
    this.loginAuthError='';
    this.lblSellerHeader = 'Seller Login Form';
    this.showLogin = true;
    this.emptyLoginDetails();
  }
  openSignup() {
    this.loginAuthError='';
    this.lblSellerHeader = 'Enter Seller Details';
    this.showLogin = false;
    this.emptyLoginDetails();
  }
  emptyLoginDetails(){
    this.frmSellerLogin.get('username')?.setValue('');
    this.frmSellerLogin.get('userpass')?.setValue('');
  }
}
