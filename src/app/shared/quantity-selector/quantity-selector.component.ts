import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-quantity-selector",
  templateUrl: "./quantity-selector.component.html",
  styleUrl: "./quantity-selector.component.scss",
})
export class QuantitySelectorComponent {
  @Input() max: number = 10;
  @Output() quantityChange = new EventEmitter<number>();

  quantity: number = 0;

  addToCart() {
    this.quantity = 1; // Set to 1 when first clicked
    this.quantityChange.emit(this.quantity);
  }

  increment() {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    } else {
      this.quantity = 0; // Remove item if decremented to 0
      this.quantityChange.emit(this.quantity);
    }
  }
}
