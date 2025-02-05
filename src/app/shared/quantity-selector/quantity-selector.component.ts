import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-quantity-selector",
  templateUrl: "./quantity-selector.component.html",
  styleUrl: "./quantity-selector.component.scss",
})
export class QuantitySelectorComponent {
  @Input() max: number = 10;
  cartItemsMapper = new Map();
  @Output() quantityChange = new EventEmitter<any>();

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

  cartUpdate(item: any, quantity: any) {
    let updatedItem = this.cartItemsMapper?.get(item.id) || item;
    updatedItem = {
      ...updatedItem,
      quantity: updatedItem.quantity
        ? updatedItem.quantity + quantity
        : quantity,
    };
    this.quantityChange.emit(this.cartItemsMapper);
  }
}
