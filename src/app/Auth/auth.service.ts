import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  isAuthenticated: boolean=false;

  constructor(private http: HttpClient) {}

  register(user: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  set IsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  get IsAuthenticated() {
    return this.isAuthenticated;
  }
}
