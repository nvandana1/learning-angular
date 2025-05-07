import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      InputTextModule,
      FormsModule,
      ButtonModule,
      ToastModule
    ],
  providers: [
    MessageService,
    ToasterService
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<any>;

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private toaster :ToasterService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
   }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.valid) {
      this.auth.login({ email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value}).subscribe({next:(res:any) => {
        this.router.navigate(['/home']);
        this.auth.IsAuthenticated=true;
        localStorage.setItem('token',res['data'].access_token);
      }
      ,error:(err) => {
        this.toaster.showError('Error',err.error.message);
      }});
      // Call your login service here 
    }
    else {
      this.toaster.showError('Error','Please fill in all required fields');
  }
  }
}
