import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../interface/seller-details';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  frmSellerUpdateProduct!: FormGroup;
  productData: undefined | IProductDetails;
  productMsg: undefined | string;
  constructor(private route: ActivatedRoute, private productapi: ProductService, private fb: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    debugger;
    let prodId  = this.route.snapshot.paramMap.get('id');
    prodId && this.getProductById(Number(prodId));  //'prodId && ' is applied to check if 'ProdId' is not null
    this.frmSellerUpdateProduct = this.fb.group({
      id: new FormControl(0),
      productName: new FormControl(''),
      productUnit: new FormControl(''),
      productPrice: new FormControl(''),
      productCategory: new FormControl(''),
      productSubcategory: new FormControl(''),
      productColor: new FormControl(''),
      productDesc: new FormControl(''),
      productImageUrl: new FormControl('')
    })
  }
  getProductById(prodId: number){
    let data = this.productapi.getProductbyId(prodId).subscribe((result) => {
      debugger;
      console.log('data is: '+ JSON.stringify(result));
      this.productData = result;
      this.frmSellerUpdateProduct.patchValue(result);
    });
    
    debugger;

  }
  updateProduct(data:IProductDetails){
    debugger;
    console.log('updated data is: '+JSON.stringify(data));
    /*if(this.productData){     //in case you get product id as undefined
      data.id = this.productData.id;
    }*/
    this.productapi.updateProduct(data).subscribe((result) => {
      debugger;
      console.log('result is: '+result);
      if(result){
        this.productMsg='Product has been updated successfully..!!';
      }
    });
    setTimeout(() => {
      this.productMsg=undefined;
      this.router.navigate(['/seller-home']); // To navigate to the product list once the product is updated.
    }, 3000);
    debugger;
  }
  cancelForm(){
    this.frmSellerUpdateProduct.reset();
  }
}
