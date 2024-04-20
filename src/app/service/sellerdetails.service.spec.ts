import { TestBed } from '@angular/core/testing';

import { SellerdetailsService } from './sellerdetails.service';

describe('SellerdetailsService', () => {
  let service: SellerdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
