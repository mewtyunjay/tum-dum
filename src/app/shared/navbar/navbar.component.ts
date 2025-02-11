import { Component, NgZone, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"], // Fixed 'styleUrl' to 'styleUrls'
})
export class NavbarComponent implements OnInit {
  public registerForm!: FormGroup;
  otpCode: string = "";
  otpSent: boolean = false;
  loginForm: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private firestore: AngularFirestore
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
    });
    this.loginForm = this.formBuilder.group({
      loginPhone: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // Send OTP
  async sendOtp(reg: any) {
    // if (this.registerForm.invalid) {
    //   alert("Please enter a valid phone number.");
    //   return;
    // }
    if (reg == true) {
      if (this.registerForm.invalid) {
        alert("Please enter a valid phone number.");
        return;
      }
      this.authService.initializeRecaptcha("recaptcha-container");

      try {
        console.log("ph", +91 + this.registerForm.value["phone"]);

        await this.authService.sendOtp(
          "+91" + this.registerForm.value["phone"].toString()
        );

        this.otpSent = true;
        alert("OTP sent successfully!");
      } catch (error) {
        alert("Failed to send OTP. Try again.");
      }
    } else {
      if (this.loginForm.invalid) {
        alert("Please enter a valid phone number.");
        return;
      }
      this.authService.initializeRecaptcha("recaptcha-container");

      try {
        console.log("Logph", +91 + this.loginForm.value["loginPhone"]);

        await this.authService.sendOtp(
          "+91" + this.loginForm.value["loginPhone"].toString()
        );

        // this.otpSent = true;
        alert("OTP sent successfully!");
      } catch (error) {
        alert("Failed to send OTP. Try again.");
      }
    }
  }

  // Verify OTP
  async verifyOtp() {
    if (!this.otpCode) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const user = await this.authService.verifyOtp(this.otpCode);
      alert("Phone verified successfully! 🎉");
      console.log("User:", user);

      // Optionally, navigate to another page or save user data here
      // this.router.navigate(['/some-other-page']);
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    }
  }

  // // Sign up
  // signUp() {
  //   if (this.registerForm.invalid) {
  //     alert("Please fill in all fields correctly.");
  //     return;
  //   }

  //   let fd = {
  //     firstName: this.registerForm.value["firstName"],
  //     lastName: this.registerForm.value["lastName"],
  //     phone: this.registerForm.value["phone"],
  //   };

  //   console.log("Form Data:", fd);
  //   // You can save this data to the Firestore or proceed further with the user signup logic
  //   // Example: this.firestore.collection('users').add(fd);
  // }

  signUp() {
    if (this.registerForm.invalid) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // if (!this.otpSent || !this.otpCode) {
    //   alert("Please verify your phone number with the OTP.");
    //   return;
    // }

    // Step 1: Verify OTP
    this.authService
      .verifyOtp(this.otpCode)
      .then((user: any) => {
        // Step 2: If OTP is verified, save user data to Firestore
        const userData = {
          firstName: this.registerForm.value["firstName"],
          lastName: this.registerForm.value["lastName"],
          phone: this.registerForm.value["phone"],
          uid: user.uid, // Store Firebase UID from the verification
          createdAt: new Date(),
        };
        console.log("userData", userData);
        // return;
        // Step 3: Save user to Firestore (or your preferred database)
        this.firestore
          .collection("registeredUser")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            alert("User signed up successfully!");

            // Step 4: Optionally, navigate to the home page or dashboard after successful signup
            this.router.navigate(["/home"]); // Example route
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            alert("Failed to save user data. Please try again.");
          });
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        alert("Invalid OTP. Please try again.");
      });
  }
}
