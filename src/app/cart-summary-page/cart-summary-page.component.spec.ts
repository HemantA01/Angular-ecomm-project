import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummaryPageComponent } from './cart-summary-page.component';

describe('CartSummaryPageComponent', () => {
  let component: CartSummaryPageComponent;
  let fixture: ComponentFixture<CartSummaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSummaryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
