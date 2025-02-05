import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNotificationComponent } from './cart-notification.component';

describe('CartNotificationComponent', () => {
  let component: CartNotificationComponent;
  let fixture: ComponentFixture<CartNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
