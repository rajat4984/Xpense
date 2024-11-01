import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegisterationComponent } from '../registeration/registeration.component';
import { LoaderService } from '../services/loader.service';

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

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    console.log('Ngonint');
    // Subscribe to the loader service's loading state
    this.loaderService.isLoading$.subscribe((loading) => {
      console.log('isLoading in ngonint', loading);
      this.isLoading = loading;
    });
  }

  toggleSwitch(switchText: string) {
    if (switchText === 'login') this.authSwitch = 'login';
    else this.authSwitch = 'signup';
  }
}
