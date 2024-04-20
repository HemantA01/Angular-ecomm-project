import { Component } from '@angular/core';
import { SellerdetailsService } from './service/sellerdetails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private seller: SellerdetailsService) {      
  }
  title = 'ecomm-project';
  
}
