import { Component, NgZone, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-register-page",

  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.scss",
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;
  date: any;
  d: any;
  constructor(
    // private apiService: ApiService,
    // private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private firestore: AngularFirestore
  ) {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.d = new Date();
    this.date = this.d.toISOString();
  }

  signUp() {
    // let fd = {
    //   authType: "Email",
    //   email: this.registerForm.value["email"],
    //   address: this.registerForm.value["address"],
    //   phone: this.registerForm.value["phone"],
    //   // uId: userCredential?.user.uid.toString(),
    //   signUpTime: this.date,
    // };
    // console.log("rgisterForm", fd);

    // return;
    this.afAuth
      .createUserWithEmailAndPassword(
        this.registerForm.value["email"],
        this.registerForm.value["password"]
      )
      .then((userCredential: any) => {
        // After successful registration, update user profile with fullName
        let fd = {
          authType: "Email",
          email: this.registerForm.value["email"],
          address: this.registerForm.value["address"],
          phone: this.registerForm.value["phone"],
          uId: userCredential?.user.uid.toString(),
          signUpTime: this.date,
        };
        this.firestore
          .collection("registeredUser")
          .doc(userCredential?.user.uid.toString())
          .set(fd)
          .then(() => {
            console.log("Data saved successfully!");
            this.registerForm.reset();
          })
          .catch((error) => {
            console.error("Error saving data: ", error);
            // this.toastr.error('Something Went Wrong! Try Again');
          });
      })
      .then(() => {
        // Do something on successful registration
        console.log(
          "User registered with fullName:",
          this.registerForm.value["email"]
        );
      })
      .catch((error) => {
        // Handle registration error
        console.error("Registration error:", error);
      });
  }
}
