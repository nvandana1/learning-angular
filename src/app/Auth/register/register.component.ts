import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup<any>=this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private fb:FormBuilder,private auth:AuthService, private route:Router,private toaster :ToasterService) { }

  ngOnInit(): void {
  }
  register() {
      //if success then go to login page
      if(this.registerForm.valid && this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value) {   
        this.auth.register({ email: this.registerForm.get('email')?.value, password: this.registerForm.get('password')?.value}).subscribe({next:(res) => {
          this.toaster.showSuccess('Registration successful', 'You can now login');
          setTimeout(() => {
            this.route.navigate(['/login']);
          }, 1000);
        }
        ,error:(err) => {
          this.toaster.showError('Error',err.error.message);
        }});
      }
      else if(this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
        this.toaster.showError('Error','Passwords do not match');

      }
      else {
        this.toaster.showError('Error','Please fill in all required fields');
    }
    }
    
    

}
