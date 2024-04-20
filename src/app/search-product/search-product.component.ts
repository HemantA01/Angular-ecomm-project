import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../interface/seller-details';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  //query: null;
  searchResult: undefined | IProductDetails[];
  constructor(private activeRoute: ActivatedRoute, private productapi: ProductService) {
  }
  ngOnInit(): void{
    //debugger;
    //let query = this.activeRoute.snapshot.paramMap.get('query');  //'query' written here should be same as that one written in app-routing.module.ts for this path.  
    this.activeRoute.paramMap.subscribe(params => {
      var query=params.get('query');
    
      console.log('In search prod, value is: '+query);
      this.searchProductByQuery(String(query));
    });
    //this.searchProductByQuery(query);
    //console.log('In searxh prod, value is: '+query);
  }
  searchProductByQuery(queryVal: string){
    debugger;
    queryVal && this.productapi.searchProducts(queryVal).subscribe((result) => {
      this.searchResult = result;
      console.log('Product search result is: ',this.searchResult);
    })
  }
}
