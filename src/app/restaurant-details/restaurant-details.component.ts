import { Component, Input } from "@angular/core";

@Component({
  selector: "app-restaurant-details",
  templateUrl: "./restaurant-details.component.html",
  styleUrl: "./restaurant-details.component.scss",
})
export class RestaurantDetailsComponent {
  @Input() rating: number = 4.3;
  @Input() reviews: number = 913;
  @Input() costForTwo: string = "₹200 for two";
  @Input() name: string = "Hotel Sai Nath & Sai Restaurant";
  @Input() tags: string[] = [
    "North Indian",
    "North Indian",
    "North Indian",
    "North Indian",
  ];
}
