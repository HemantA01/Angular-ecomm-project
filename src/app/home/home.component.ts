import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../interface/seller-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`); 
  popularProducts: undefined | IProductDetails[];
  trendyProducts: undefined | IProductDetails[];
  constructor(private productapi: ProductService) {  
  }
  ngOnInit(): void {
    this.dispPopularProducts();
    this.dispTrendyProducts();
  }
  dispPopularProducts(){
    this.productapi.popularProducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts = data;
    });
  }
  dispTrendyProducts(){
    this.productapi.trendyProducts().subscribe((data)=>{
      //console.log(data);
      this.trendyProducts = data;
    });
  }
}
