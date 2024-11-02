import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { AppState } from '../store/index.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  hideNotification,
  showNotification,
} from '../store/global/global.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LoaderComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() isLoading!: boolean;
  email: string = '';
  password: string = '';
  isShowNotification$ = new Observable<boolean>();

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.isShowNotification$ = this.store.select(
      (state) => state.global.isShowNotification
    );
  }

  login(): void {
    if (this.email !== '' && this.password !== '')
      this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  handleForgotPassword(): void {
    if (this.email === '') {
      this.showNotification("Email can't be empty", 'error');
      return;
    }

    this.authService.forgotPassword(this.email);
  }

  showNotification(notificationText: string, notificationIcon: string) {
    this.store.dispatch(
      showNotification({ notificationText, notificationIcon })
    );

    setTimeout(() => {
      this.store.dispatch(hideNotification());
    }, 2000);
  }
}
