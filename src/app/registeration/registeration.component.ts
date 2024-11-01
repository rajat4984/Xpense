import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [FormsModule, LoaderComponent,CommonModule],
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.css',
})
export class RegisterationComponent {
  @Input() isLoading!: boolean;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  register(e: Event): void {
    e.preventDefault();
    console.log(this.email, this.password, this.confirmPassword);
    if (
      this.email !== '' &&
      this.password !== '' &&
      this.password === this.confirmPassword
    )
      this.authService.register(this.email, this.password);
  }
}
