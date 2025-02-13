import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private router: Router
  ) {}

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addItem() {
    this.cartCount.next(this.cartCount.value + 1);
  }

  getCartDetailsDocumentById(documentId: string) {
    return this.firestore.collection("userCart").doc(documentId).get();
  }
  getOrderDetailsDocumentById(documentId: string) {
    return this.firestore.collection("customerOrders").doc(documentId).get();
  }

  async updateCartItems(userId: string, items: any[]): Promise<void> {
    try {
      await this.firestore.collection("userCart").doc(userId).set({
        menuItems: items,
        userId: userId,
        updatedAt: new Date().toISOString()
      });
      // Update cart count
      this.cartCount.next(items.reduce((total, item) => total + (item.quantity || 0), 0));
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }
}
