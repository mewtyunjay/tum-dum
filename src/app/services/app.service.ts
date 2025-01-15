import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private ipApiUrl = "https://geo.ipify.org?format=json";
  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private router: Router
  ) {}

  getIpAddress(): Observable<{ ip: string }> {
    return this.http.get<{ ip: string }>(this.ipApiUrl);
  }
}
