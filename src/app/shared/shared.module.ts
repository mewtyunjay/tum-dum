import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { BreadCrumbComponent } from "./bread-crumb/bread-crumb.component";
import { CartNotificationComponent } from "./cart-notification/cart-notification.component";
import { QuantitySelectorComponent } from "./quantity-selector/quantity-selector.component";

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadCrumbComponent,
    CartNotificationComponent,
    QuantitySelectorComponent,
  ],
  imports: [CommonModule],
  exports: [
    FooterComponent,
    NavbarComponent,
    BreadCrumbComponent,
    CartNotificationComponent,
    QuantitySelectorComponent,
  ],
})
export class SharedModule {}
