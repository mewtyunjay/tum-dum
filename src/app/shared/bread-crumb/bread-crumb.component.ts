import { Component, Input } from "@angular/core";

@Component({
  selector: "app-bread-crumb",
  templateUrl: "./bread-crumb.component.html",
  styleUrl: "./bread-crumb.component.scss",
})
export class BreadCrumbComponent {
  @Input() breadcrumbs: { name: string; link: string }[] = [];
}
