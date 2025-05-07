import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { LoginComponent } from './Auth/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent,},
  { path: 'login', loadComponent: () => import('./Auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'home', loadChildren: () => import('./Components/home/home.module').then(m => m.HomeModule) ,canActivate:[AuthGuard]},
  { path: 'register', loadChildren: () => import('./Auth/register/register.module').then(m => m.RegisterModule) },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
