import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegisterationComponent } from '../registeration/registeration.component';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    RegisterationComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authSwitch: string = 'login';
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService,private authService : AuthService) {}

  ngOnInit(): void {
    // Subscribe to the loader service's loading state
    this.loaderService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  toggleSwitch(switchText: string) {
    this.authSwitch = switchText;
  }

  handleGoogleSignIn(){
    this.authService.signInWithGoogle();
  }
}
