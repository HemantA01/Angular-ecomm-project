import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../interface/seller-details';
import { faCoffee, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | IProductDetails[];
  productMessage: undefined | string;
  abc=faTrash;
  edit=faEdit;
  constructor(private productapi: ProductService) {  
  }
  ngOnInit(): void {
    this.getProductList();
  }
  getProductList(){
    this.productapi.productList().subscribe((result) => {
      console.log('Result: ',result);
      if(result){
        this.productList = result;
      }
      console.log('Product List: ',this.productList);
    })
  }
  deleteProduct(id: number){
    debugger;
    console.log('Id to be deleted: '+id);
    this.productapi.deleteProduct(id).subscribe((result) => {
      if(result){
        this.productMessage = 'Product is deleted';
        this.getProductList();
      }
    });
    debugger;
    setTimeout(() => {
      this.productMessage = undefined;
    },3000);
  }
}
