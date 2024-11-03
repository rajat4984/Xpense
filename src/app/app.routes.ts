import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard, loginGaurd } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full',
    canActivate: [loginGaurd],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
