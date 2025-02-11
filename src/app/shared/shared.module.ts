import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { BreadCrumbComponent } from "./bread-crumb/bread-crumb.component";
import { CartNotificationComponent } from "./cart-notification/cart-notification.component";
import { QuantitySelectorComponent } from "./quantity-selector/quantity-selector.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    BreadCrumbComponent,
    CartNotificationComponent,
    QuantitySelectorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    BreadCrumbComponent,
    CartNotificationComponent,
    QuantitySelectorComponent,
  ],
})
export class SharedModule {}
