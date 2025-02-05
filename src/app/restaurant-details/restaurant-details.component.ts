import { Component, Input, NgZone, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "../services/cartServices/cart.service";
import { AppService } from "../services/app.service";

@Component({
  selector: "app-restaurant-details",
  templateUrl: "./restaurant-details.component.html",
  styleUrl: "./restaurant-details.component.scss",
})
export class RestaurantDetailsComponent implements OnInit {
  // @Input() rating: number = 4.3;
  // @Input() reviews: number = 913;
  // @Input() costForTwo: string = "₹200 for two";
  // @Input() name: string = "Hotel Sai Nath & Sai Restaurant";
  // @Input() tags: string[] = [
  //   "North Indian",
  //   "North Indian",
  //   "North Indian",
  //   "North Indian",
  // ];
  menuData: any;
  resId: any;
  path: any;
  resDetails: any;
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
  showNotification = false;
  itemCount = 0;
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: any) => {
      this.resId = param.get("id") || 0;
      this.path = this.activeRoute.snapshot.paramMap.get("path");
      this.getRestaurantDetails();
      console.log("this.resId ", this.resId);
    });
    this.cartService.cartCount$.subscribe((count) => {
      this.itemCount = count;
      this.showNotification = true;

      setTimeout(() => {
        this.showNotification = false;
      }, 3000); // Hide after 3 seconds
    });
    this.getAllMenu();
  }
  addToCart() {
    this.cartService.addItem(); // Calls the service globally
  }

  getAllMenu() {
    if (this.resId) {
      this.appService.getRestaurantMenuDetails(this.resId).subscribe(
        (data: any) => {
          this.menuData = data;

          console.log("getMenuData", data);
        },
        (error: any) => {
          console.error("Error fetching items:", error);
        }
      );
    } else {
      console.error("Something Went Wrong");
    }
  }
  getRestaurantDetails() {
    this.appService
      .getRestaurantDetailsDocumentById(this.resId)
      .subscribe((snapshot: any) => {
        this.resDetails = snapshot.data();
        console.log("resDetails", this.resDetails);
      });
  }

  updateCart(quantity: number) {
    this.cartService.addItem();
    console.log("Cart updated, Quantity:", quantity);
  }
}
