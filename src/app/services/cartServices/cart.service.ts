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
}
