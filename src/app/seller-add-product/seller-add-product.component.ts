import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../interface/seller-details';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  frmSellerAddProduct!: FormGroup;
  addProductMessage: string|undefined;
  constructor(private productapi: ProductService, private fb: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    //debugger;
    //this.sellerapi.reloadSeller();
      
    this.frmSellerAddProduct = this.fb.group({
      productName: new FormControl(''),
      productUnit: new FormControl(''),
      productPrice: new FormControl(''),
      productCategory: new FormControl(''),
      productSubCategory: new FormControl(''),
      productColor: new FormControl(''),
      productDesc: new FormControl(''),
      productImageUrl: new FormControl('')
    })
  }
  addProduct(data: IProductDetails){
    debugger;
    console.log('Product values are: '+ JSON.stringify(this.frmSellerAddProduct.value));
    this.productapi.addProduct(data).subscribe((result) => {
      debugger;
      console.log(' Product details added')
      if(result){
        this.addProductMessage = 'Product successfully added';
      }
      setTimeout(() => this.addProductMessage=undefined,4000);
    });
    debugger;
  }
  cancelForm(){
    this.frmSellerAddProduct.reset();
  }
}
