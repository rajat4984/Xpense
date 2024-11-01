import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {path:'',component:AuthComponent,pathMatch:'full'},
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterationComponent },
  { path: 'dashboard', component: DashboardComponent },
];
