import { Component, NgZone, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../services/app.service";
import { CartService } from "../services/cartServices/cart.service";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrl: "./check-out.component.scss",
})
export class CheckOutComponent implements OnInit {
  userId: string = "FI1sl8HaEzgn3V5FA4h3RpbMxD63";
  cartItems: any[] = [];
  totalPrice: number = 0;
  resId: any;
  resDetails: any;
  checkedAgree: boolean = false;
  constructor(
    // private apiService: ApiService,
    // private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private firestore: AngularFirestore,
    private cartService: CartService,
    private appService: AppService // private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCartDetailsByUserId();
  }

  getCartDetailsByUserId() {
    let cartData: any;
    this.cartService
      .getCartDetailsDocumentById(this.userId)
      .subscribe((snapshot: any) => {
        cartData = snapshot.data();
        this.cartItems = cartData?.menuItems || [];
        this.resId = cartData?.resId;
        if (this.resId) {
          this.getResDetails();
        }
        // this.cartItemsMapper = cartData?.menuItems
        //   ? new Map(Object.entries(cartData.menuItems))
        //   : new Map();
        // if (cartData.resId == this.resId) {
        //   cartData?.menuItems?.forEach((ele: any) => {
        //     this.cartUpdate(ele, ele?.quantity, true);
        //   });
        // }
        console.log("cartDetails", this.cartItems);
        this.calTotalPrice();
      });
  }

  calTotalPrice() {
    this.cartItems.forEach((eachItem: any) => {
      this.totalPrice += eachItem?.addedQtyPrice;
    });
    console.log("totalPrice", this.totalPrice);
  }

  getResDetails() {
    this.appService
      .getRestaurantDetailsDocumentById(this.resId)
      .subscribe((snapshot: any) => {
        this.resDetails = snapshot.data();
        console.log("resDetails", this.resDetails);
      });
  }

  onChecked() {
    this.checkedAgree = !this.checkedAgree;
    console.log("checkedAgree", this.checkedAgree);
  }
}
