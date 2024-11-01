import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  async login(email: string, password: string) {
    this.loaderService.showLoader(); // Start loader

    try {
      const response = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (response.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        alert('User is not verified');
      }

      localStorage.setItem('token', 'true');
    } catch (error) {
      alert('Something went wrong');
    } finally {
      this.loaderService.hideLoader(); // Stop loader
    }
  }

  // Register method remains the same
  async register(email: string, password: string) {
    this.loaderService.showLoader(); // Stop loader
    try {
      const response = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendRegisterationLink(response.user);
      alert('Email sent to registered login');
      this.router.navigate(['dashboard']);
    } catch (error: any) {
      alert(error.message);
      this.router.navigate(['/auth']);
    } finally {
      this.loaderService.hideLoader();
    }
  }

  // Logout method remains the same
  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  //send email verification for registeration
  sendRegisterationLink(user: any) {
    try {
      user.sendEmailVerification();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async forgotPassword(email: string) {
    try {
      const isUserRegistered = await this.fireAuth.fetchSignInMethodsForEmail(
        email
      );
      if (isUserRegistered.length === 0) {
        alert('User is not registered');
        return;
      }
      await this.fireAuth.sendPasswordResetEmail(email);
      alert('Password reset mail has been sent');
    } catch (error: any) {
      alert(error.message);
    }
  }
}
