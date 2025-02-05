import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cartServices/cart.service";

@Component({
  selector: "app-cart-notification",
  templateUrl: "./cart-notification.component.html",
  styleUrl: "./cart-notification.component.scss",
})
export class CartNotificationComponent implements OnInit {
  showNotification = false; // Controls visibility
  itemCount = 0; // Dynamic item count
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      if (count > 0) {
        this.itemCount = count;
        this.showNotification = true;
        setTimeout(() => (this.showNotification = false), 3000); // Hide after 3 sec
      }
    });
  }
}

// addToCart() {
//   this.itemCount += 1; // Increment item count
//   this.showNotification = true;

//   setTimeout(() => {
//     this.showNotification = false;
//   }, 3000); // Hide after 3 seconds
// }
