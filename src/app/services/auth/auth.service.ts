import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth"; // Import compat version of AngularFireAuth
import firebase from "firebase/compat/app"; // Import compat version of Firebase
import "firebase/compat/auth"; // Import necessary auth methods
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private recaptchaVerifier!: firebase.auth.RecaptchaVerifier;
  private confirmationResult!: firebase.auth.ConfirmationResult;

  constructor(private angularFireAuth: AngularFireAuth) {}

  initializeRecaptcha(containerId: string) {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase); // Initialize Firebase if it hasn't been initialized
    } else {
      firebase.app(); // Use the default app
    }

    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      containerId, // The ID of the reCAPTCHA container
      {
        size: "invisible", // Invisible reCAPTCHA
        callback: (response: string) => {
          console.log("reCAPTCHA solved:", response);
        },
      }
    );
  }

  async sendOtp(phoneNumber: string) {
    try {
      if (!this.recaptchaVerifier) {
        throw new Error("reCAPTCHA not initialized properly.");
      }

      const recaptchaToken = await this.recaptchaVerifier.verify(); // ✅ Explicitly verify reCAPTCHA
      console.log("reCAPTCHA Token:", recaptchaToken); // 🔍 Debugging

      this.confirmationResult =
        await this.angularFireAuth.signInWithPhoneNumber(
          phoneNumber,
          this.recaptchaVerifier
        );

      return true;
    } catch (error: any) {
      console.error("Error sending OTP:", error.message, error.code);
      throw error;
    }
  }

  // Send OTP to phone number
  // async sendOtp(phoneNumber: string) {
  //   try {
  //     this.confirmationResult =
  //       await this.angularFireAuth.signInWithPhoneNumber(
  //         phoneNumber,
  //         this.recaptchaVerifier // Pass the reCAPTCHA verifier
  //       );
  //     return true;
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     throw error;
  //   }
  // }

  // Verify OTP
  async verifyOtp(otpCode: string) {
    try {
      const userCredential = await this.confirmationResult.confirm(otpCode);
      return userCredential.user;
    } catch (error) {
      console.error("Invalid OTP:", error);
      throw error;
    }
  }
}
