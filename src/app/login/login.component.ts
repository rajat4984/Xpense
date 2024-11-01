import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService) {}

  login(): void {
    if (this.email !== '' && this.password !== '')
      this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  handleForgotPassword(): void {
    if (this.email === '') {
      alert("Email can't be empty");
      return;
    }

    this.authService.forgotPassword(this.email);
  }
}
