import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { BreadCrumbComponent } from "./bread-crumb/bread-crumb.component";

@NgModule({
  declarations: [FooterComponent, NavbarComponent, BreadCrumbComponent],
  imports: [CommonModule],
  exports: [FooterComponent, NavbarComponent, BreadCrumbComponent],
})
export class SharedModule {}
