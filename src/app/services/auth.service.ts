import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/index.reducers';
import { Observable } from 'rxjs';
import {
  hideNotification,
  showNotification,
} from '../store/global/global.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isShowNotification$ = new Observable<boolean>();
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<AppState>
  ) {
    this.isShowNotification$ = this.store.select(
      (state) => state.global.isShowNotification
    );
  }

  showNotification(notificationText: string, notificationIcon: string) {
    this.store.dispatch(
      showNotification({ notificationText, notificationIcon })
    );

    setTimeout(() => {
      this.store.dispatch(hideNotification());
    }, 2000);
  }

  async login(email: string, password: string) {
    this.loaderService.showLoader();

    try {
      const response = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (response.user?.emailVerified == true) {
        localStorage.setItem('userId', response.user.uid);
        this.router.navigate(['dashboard']);
      } else {
        this.showNotification('User is not verified', 'error');
      }
    } catch (error: any) {
      this.showNotification('User is not found', 'error');
    } finally {
      this.loaderService.hideLoader();
    }
  }

  // Register method remains the same
  async register(email: string, password: string) {
    this.loaderService.showLoader();
    try {
      const response = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendRegisterationLink(response.user);
      this.showNotification('Email sent to registered login', 'success');
    } catch (error: any) {
      this.showNotification('Cannot register something went wrong', 'error');
      console.log(error.message);
    } finally {
      this.loaderService.hideLoader();
    }
  }

  // Logout method remains the same
  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.showNotification('User logged out', 'success');
        this.router.navigate(['/']);
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
        this.showNotification('User is not registered', 'error');

        // alert('User is not registered');
        return;
      }
      await this.fireAuth.sendPasswordResetEmail(email);
      this.showNotification('Password reset mail has been sent', 'success');

      // alert('Password reset mail has been sent');
    } catch (error: any) {
      alert(error.message);
    }
  }

  async signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('userId', JSON.stringify(res.user?.uid));
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
