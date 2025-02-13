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
  upiId: string = "sarthakpati.pati-1@okicici";
  amount: string = "500";
  transactionNote: string = "Payment for Order";
  orderId: string = "ORDER98765";
  totalQty: any = 0;
  isOpen = false;
  orderStatus: boolean = false;
  orderDetails: any;
  orderStatusInterval: any;
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
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  payWithUPI() {
    this.closeModal();
    const upiUrl = `upi://pay?pa=${this.upiId}&pn=Merchant+Name&tr=${this.orderId}&tn=${this.transactionNote}&am=${this.amount}&cu=INR`;
    //  const upiUrl = `upi://pay?pa=${this.upiId}&pn=Merchant+Name&tr=${this.orderId}&tn=${this.transactionNote}&am=${this.amount}&cu=INR&url=https://yourwebsite.com/payment-status`;
    window.location.href = upiUrl;
    // setTimeout(() => {
    //   // Redirect to a success/failure page after returning from UPI app
    //   this.createOrder();
    // }, 5000);
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
      this.totalQty += eachItem?.quantity || 0;
    });
    console.log("totalPrice", this.totalPrice, this.totalQty);
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

  onGobackClick() {
    this.router.navigate(["home/restaurant_Detail", this.resId]);
  }
  onOrder() {
    let fd = {
      customer_id: this.userId,
      menu_total_price: this.totalPrice,
      menu_total_quantity: this.totalQty,
      order_id: "",
      order_status: "",
      res_id: "",
      paymentStatus: "",
      created_time: new Date().toISOString(),
    };
    console.log("fd", fd);
    const docRef = this.firestore
      .collection("customerOrders")
      .doc(this.userId?.toString())
      .set(fd)
      .then(() => {
        console.log("order Successfully Saved");
      })
      .catch((error) => {
        console.error("Firestore update error:", error);
      });
  }

  async createOrder(): Promise<void> {
    this.openModal();
    const d = new Date();
    const orderId = d.getTime();
    const batch = this.firestore.firestore.batch();
    this.getOrderStatus(orderId);

    // Set an interval to call it every 5 seconds
    this.orderStatusInterval = setInterval(() => {
      this.getOrderStatus(orderId);
    }, 5000);
    return;
    const orderRef = this.firestore
      .collection("customerOrders")
      .doc(orderId.toString()).ref;
    // const totalPrice = items.reduce(
    //   (sum, item) => sum + item.price * item.quantity,
    //   0
    // );

    batch.set(orderRef, {
      customer_id: this.userId,
      menu_total_price: this.totalPrice,
      menu_total_quantity: this.totalQty,
      order_id: orderId.toString(),
      order_status: "Pending",
      res_id: this.resId,
      paymentStatus: "",
      created_time: new Date().toISOString(),
    });

    this.cartItems.forEach((item: any) => {
      const itemRef = this.firestore.collection("orderMenuItems").doc().ref;
      batch.set(itemRef, {
        ...item,
        orderId: orderId.toString(),
        resId: this.resId,
      });
    });

    await batch.commit();
  }

  getOrderStatus(orderId: any) {
    orderId = "1739345735236";
    this.cartService.getOrderDetailsDocumentById(orderId.toString()).subscribe(
      (snapshot: any) => {
        this.orderDetails = snapshot.data();
        console.log("orderDetails", this.orderDetails);
        if (this.orderDetails?.order_status !== "Pending") {
          this.stopPolling();
          this.orderStatus = true;
        }
      },
      (error) => {
        console.error("Error fetching order status:", error);
      }
    );
  }

  stopPolling(): void {
    if (this.orderStatusInterval) {
      clearInterval(this.orderStatusInterval);
      this.orderStatusInterval = null;
      console.log("Polling stopped"); // Debugging
    }
  }

  incrementQuantity(item: any) {
    if (item.quantity < 10) { // Maximum quantity limit
      item.quantity++;
      // Use item_price if price is not available
      const unitPrice = item.price || item.item_price || item.item_discounted_price;
      item.addedQtyPrice = unitPrice * item.quantity;
      this.updateCart();
    }
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      // Use item_price if price is not available
      const unitPrice = item.price || item.item_price || item.item_discounted_price;
      item.addedQtyPrice = unitPrice * item.quantity;
      this.updateCart();
    } else {
      // Remove item if quantity becomes 0
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      this.updateCart();
    }
  }

  updateCart() {
    // Reset totals before recalculating
    this.totalPrice = 0;
    this.totalQty = 0;

    // Recalculate totals
    this.cartItems.forEach((item: any) => {
      const unitPrice = item.price || item.item_price || item.item_discounted_price;
      this.totalPrice += unitPrice * item.quantity;
      this.totalQty += item.quantity || 0;
    });

    // Update cart in service
    this.cartService.updateCartItems(this.userId, this.cartItems)
      .then(() => {
        console.log('Cart updated successfully');
      })
      .catch((error: Error) => {
        console.error('Error updating cart:', error);
      });
  }

  callRestaurant() {
    // Use the restaurant's phone number from resDetails
    const phoneNumber = this.resDetails?.phone_number || '';
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      console.error('Restaurant phone number not available');
    }
  }
}
