import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Auth/auth.service';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginModule } from "./Auth/login/login.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './Auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    BrowserAnimationsModule,
],
  providers: [AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
